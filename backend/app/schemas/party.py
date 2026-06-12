from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class PartyBase(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    contact: str = Field(min_length=1, max_length=50)
    email: str = Field(min_length=3, max_length=200)


class PartyCreate(PartyBase):
    pass


class PartyRead(PartyBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
