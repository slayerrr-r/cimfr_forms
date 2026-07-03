from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.analysis import AnalysisPayload
from app.services import repository


router = APIRouter()


@router.get("/samples/{sample_id}/analysis")
def read_analysis(sample_id: int, db: Session = Depends(get_db)):
    return repository.get_analysis(db, sample_id)


@router.put("/samples/{sample_id}/analysis")
def update_analysis(sample_id: int, payload: AnalysisPayload, role: str | None = None, db: Session = Depends(get_db)):
    return {"sample_id": sample_id, "analysis": repository.save_analysis(db, sample_id, payload, role)}
