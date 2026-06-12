from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class SampleCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    tests: list[str] = Field(default_factory=list)
    date: str | None = None


class SampleRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    party_id: int
    name: str
    date: str
    tests: list[str]
    created_at: datetime
    updated_at: datetime
