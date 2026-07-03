from sqlalchemy import Column, DateTime, ForeignKey, Integer, JSON, String
from sqlalchemy.orm import relationship

from app.core.database import Base, utc_now


class Party(Base):
    __tablename__ = "parties"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False, index=True)
    contact = Column(String(50), nullable=False)
    email = Column(String(200), nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now, nullable=False)

    samples = relationship("Sample", back_populates="party", cascade="all, delete-orphan")


class Sample(Base):
    __tablename__ = "samples"

    id = Column(Integer, primary_key=True, index=True)
    party_id = Column(Integer, ForeignKey("parties.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(200), nullable=False, index=True)
    date = Column(String(50), nullable=False)
    tests = Column(JSON, nullable=False, default=list)
    status = Column(String(50), nullable=False, default="Waiting for S1")
    created_at = Column(DateTime, default=utc_now, nullable=False)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now, nullable=False)

    party = relationship("Party", back_populates="samples")
    analysis = relationship("AnalysisRecord", back_populates="sample", cascade="all, delete-orphan", uselist=False)


class AnalysisRecord(Base):
    __tablename__ = "analysis_records"

    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("samples.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    data = Column(JSON, nullable=False, default=dict)
    created_at = Column(DateTime, default=utc_now, nullable=False)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now, nullable=False)

    sample = relationship("Sample", back_populates="analysis")
