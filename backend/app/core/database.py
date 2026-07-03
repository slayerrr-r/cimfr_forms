from datetime import datetime

from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import DATABASE_URL


engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def utc_now():
    return datetime.utcnow()


def seed_database():
    from app.services.repository import seed_defaults

    db = SessionLocal()
    try:
        if engine.dialect.name == "sqlite":
            db.execute(text("ALTER TABLE samples ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'Waiting for S1'"))
        seed_defaults(db)
    except Exception:
        db.rollback()
    finally:
        db.close()
