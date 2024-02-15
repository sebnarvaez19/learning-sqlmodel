from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class HeroBase(SQLModel):
    name: str = Field(index=True)
    secret_name: str
    age: Optional[int] = Field(default=None, index=True)


class Hero(HeroBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class HeroCreate(HeroBase):
    pass


class HeroRead(HeroBase):
    id: int
