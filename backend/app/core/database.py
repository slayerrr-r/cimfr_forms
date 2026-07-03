from datetime import datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import DATABASE_URL


# Create database engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

# Session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for models
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
    """
    Seed default values into the database.
    This works for both PostgreSQL and SQLite.
    """
    from app.services.repository import seed_defaults

    db = SessionLocal()

    try:
        seed_defaults(db)
        db.commit()

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()