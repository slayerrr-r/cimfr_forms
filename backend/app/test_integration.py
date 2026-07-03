from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.core.database import Base, get_db
from app.models.entities import Party, Sample, AnalysisRecord

from sqlalchemy.pool import StaticPool

# Create an in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite://"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override get_db dependency
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Create the schema in the testing database
Base.metadata.create_all(bind=engine)

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_integration_flow():
    # Seed default data in the testing database
    from app.services.repository import seed_defaults
    db = TestingSessionLocal()
    seed_defaults(db)
    db.close()

    # 1. Fetch parties list (seeded)
    response = client.get("/parties")
    assert response.status_code == 200
    parties = response.json()
    assert len(parties) > 0
    initial_count = len(parties)

    # 2. Create a new party
    party_payload = {
        "name": "Integration Test Party",
        "contact": "9999988888",
        "email": "integration@test.com"
    }
    response = client.post("/parties", json=party_payload)
    assert response.status_code == 201
    created_party = response.json()
    assert created_party["name"] == "Integration Test Party"
    assert created_party["email"] == "integration@test.com"
    party_id = created_party["id"]

    # 3. Check search functionality
    response = client.get("/parties?search=Integration")
    assert response.status_code == 200
    search_results = response.json()
    assert len(search_results) == 1
    assert search_results[0]["id"] == party_id

    # 4. Fetch the specific party
    response = client.get(f"/parties/{party_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "Integration Test Party"

    # 5. Create a sample for the party
    sample_payload = {
        "name": "Integration Coal Sample X",
        "tests": ["Proximate Analysis", "Ultimate Analysis", "GCV Test"]
    }
    response = client.post(f"/parties/{party_id}/samples", json=sample_payload)
    assert response.status_code == 201
    created_sample = response.json()
    assert created_sample["name"] == "Integration Coal Sample X"
    assert created_sample["tests"] == ["Proximate Analysis", "Ultimate Analysis", "GCV Test"]
    sample_id = created_sample["id"]

    # 6. Fetch samples of the party
    response = client.get(f"/parties/{party_id}/samples")
    assert response.status_code == 200
    samples = response.json()
    assert len(samples) == 1
    assert samples[0]["id"] == sample_id

    # 7. Fetch the sample details
    response = client.get(f"/samples/{sample_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "Integration Coal Sample X"

    # 8. Fetch analysis (should be empty initially)
    response = client.get(f"/samples/{sample_id}/analysis")
    assert response.status_code == 200
    assert response.json() == {}

    # 9. Save analysis data
    analysis_payload = {
        "proximate": {
            "adb": {"moisture": "1.2", "ash": "15.5", "vm": "28.3", "fc": "55.0", "gcv": "5800"},
            "dmf": {"vm": "31.2", "gcv": "7200"},
            "rh60": {"moisture": "3.5", "ash": "14.8", "vm": "27.5", "fc": "54.2", "gcv": "5750"}
        },
        "ultimate": {
            "adb": {"c": "62.4", "h": "4.1", "n": "1.0", "s": "0.4", "o": "16.6"},
            "dmf": {"c": "72.0", "h": "4.7", "n": "1.2", "s": "0.5"},
            "rh60": {"c": "60.2", "h": "3.9", "n": "0.9", "s": "0.4", "o": "19.8"}
        },
        "ashFusion": {"idt": "1100", "st": "1150", "ht": "1200", "ft": "1250"},
        "elemental": {
            "sio2": "48.5", "al2o3": "24.0", "fe2o3": "12.5", "cao": "4.5",
            "mgo": "1.8", "na2o": "0.9", "k2o": "1.4", "tio2": "1.1",
            "p2o5": "0.25", "so3": "3.0"
        },
        "otherTests": {"hgi": "60", "swellingIndex": "3", "cokeType": "F"},
        "sulphur": {
            "pyritic": {"coal": "0.08", "sulphur": "18.5"},
            "sulphate": {"coal": "0.04", "sulphur": "9.2"},
            "organic": {"coal": "0.32", "sulphur": "72.3"}
        }
    }
    response = client.put(f"/samples/{sample_id}/analysis", json=analysis_payload)
    assert response.status_code == 200
    saved = response.json()["analysis"]
    assert saved["proximate"]["adb"]["moisture"] == "1.2"
    assert saved["otherTests"]["cokeType"] == "F"

    # 10. Fetch saved analysis and verify correctness
    response = client.get(f"/samples/{sample_id}/analysis")
    assert response.status_code == 200
    fetched = response.json()
    assert fetched["proximate"]["adb"]["moisture"] == "1.2"
    assert fetched["otherTests"]["cokeType"] == "F"
    assert fetched["sulphur"]["pyritic"]["sulphur"] == "18.5"

    # 11. Delete sample and verify cascading
    response = client.delete(f"/samples/{sample_id}")
    assert response.status_code == 204

    response = client.get(f"/samples/{sample_id}")
    assert response.status_code == 404

    # 12. Delete party and verify cascading
    response = client.delete(f"/parties/{party_id}")
    assert response.status_code == 204

    response = client.get(f"/parties/{party_id}")
    assert response.status_code == 404
