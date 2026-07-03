from datetime import date

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.entities import AnalysisRecord, Party, Sample
from app.schemas.analysis import AnalysisPayload
from app.schemas.party import PartyCreate
from app.schemas.sample import SampleCreate
from app.services.calculation_service import calculate_analysis


DEFAULT_PARTIES = [
    {"name": "Adani Minerals", "contact": "9876543210", "email": "adani@gmail.com"},
    {"name": "Tata Steel", "contact": "9123456780", "email": "tata@gmail.com"},
    {"name": "Coal India Ltd", "contact": "9988776655", "email": "coal@gmail.com"},
    {"name": "Vedanta Ltd", "contact": "9090909090", "email": "vedanta@gmail.com"},
    {"name": "Hindustan Zinc", "contact": "9111222333", "email": "hzl@gmail.com"},
]

DEFAULT_SAMPLES = [
    {"name": "Coal Sample A", "tests": ["Proximate Analysis", "Ultimate Analysis"]},
    {"name": "Coal Sample B", "tests": ["GCV Test", "Moisture Test"]},
]


def seed_defaults(db: Session) -> None:
    if db.query(Party).count():
        return

    parties: list[Party] = []
    for party_data in DEFAULT_PARTIES:
        party = Party(**party_data)
        db.add(party)
        parties.append(party)

    db.flush()

    for index, sample_data in enumerate(DEFAULT_SAMPLES):
        db.add(
            Sample(
                party_id=parties[index % len(parties)].id,
                name=sample_data["name"],
                date=date.today().isoformat(),
                tests=sample_data["tests"],
                status="Waiting for S1",
            )
        )

    db.commit()


def list_parties(db: Session, search: str | None = None) -> list[Party]:
    query = db.query(Party)
    if search:
        query = query.filter(Party.name.ilike(f"%{search}%"))
    return query.order_by(Party.created_at.desc()).all()


def get_party(db: Session, party_id: int) -> Party:
    party = db.get(Party, party_id)
    if not party:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Party not found")
    return party


def create_party(db: Session, payload: PartyCreate) -> Party:
    party = Party(**payload.model_dump())
    db.add(party)
    db.commit()
    db.refresh(party)
    return party


def delete_party(db: Session, party_id: int) -> None:
    party = get_party(db, party_id)
    db.delete(party)
    db.commit()


def list_samples(db: Session, party_id: int) -> list[Sample]:
    get_party(db, party_id)
    return (
        db.query(Sample)
        .filter(Sample.party_id == party_id)
        .order_by(Sample.created_at.desc())
        .all()
    )


def get_sample(db: Session, sample_id: int) -> Sample:
    sample = db.get(Sample, sample_id)
    if not sample:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sample not found")
    return sample


def create_sample(db: Session, party_id: int, payload: SampleCreate) -> Sample:
    get_party(db, party_id)
    sample = Sample(
        party_id=party_id,
        name=payload.name,
        tests=payload.tests,
        date=payload.date or date.today().isoformat(),
        status="Waiting for S1",
    )
    db.add(sample)
    db.commit()
    db.refresh(sample)
    return sample


def delete_sample(db: Session, sample_id: int) -> None:
    sample = get_sample(db, sample_id)
    db.delete(sample)
    db.commit()


from app.services.calculation_service import calculate_analysis


def get_analysis(db: Session, sample_id: int) -> dict:
    get_sample(db, sample_id)
    record = db.query(AnalysisRecord).filter(AnalysisRecord.sample_id == sample_id).first()
    if not record:
        return {}
    return calculate_analysis(record.data)


def save_analysis(db: Session, sample_id: int, payload: AnalysisPayload, role: str | None = None) -> dict:
    get_sample(db, sample_id)
    record = db.query(AnalysisRecord).filter(AnalysisRecord.sample_id == sample_id).first()
    data = payload.model_dump(mode="json")

    if record:
        record.data = data
    else:
        record = AnalysisRecord(sample_id=sample_id, data=data)
        db.add(record)

    db.commit()
    return calculate_analysis(data)
