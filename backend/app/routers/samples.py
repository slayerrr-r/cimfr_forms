from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.sample import SampleCreate, SampleRead
from app.services import repository


router = APIRouter()


@router.get("/parties/{party_id}/samples", response_model=list[SampleRead])
def read_party_samples(party_id: int, db: Session = Depends(get_db)):
    return repository.list_samples(db, party_id)


@router.post("/parties/{party_id}/samples", response_model=SampleRead, status_code=status.HTTP_201_CREATED)
def create_party_sample(party_id: int, payload: SampleCreate, db: Session = Depends(get_db)):
    return repository.create_sample(db, party_id, payload)


@router.get("/samples/{sample_id}", response_model=SampleRead)
def read_sample(sample_id: int, db: Session = Depends(get_db)):
    return repository.get_sample(db, sample_id)


@router.delete("/samples/{sample_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_sample(sample_id: int, db: Session = Depends(get_db)):
    repository.delete_sample(db, sample_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
