from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.party import PartyCreate, PartyRead
from app.services import repository


router = APIRouter()


@router.get("", response_model=list[PartyRead])
def read_parties(search: str | None = Query(default=None), db: Session = Depends(get_db)):
    return repository.list_parties(db, search=search)


@router.post("", response_model=PartyRead, status_code=status.HTTP_201_CREATED)
def create_party(payload: PartyCreate, db: Session = Depends(get_db)):
    return repository.create_party(db, payload)


@router.get("/{party_id}", response_model=PartyRead)
def read_party(party_id: int, db: Session = Depends(get_db)):
    return repository.get_party(db, party_id)


@router.delete("/{party_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_party(party_id: int, db: Session = Depends(get_db)):
    repository.delete_party(db, party_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
