import uuid
from typing import Optional
from sqlmodel import SQLModel, Field


class TaskBase(SQLModel):
    title: str


class Task(TaskBase, table=True):
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    completed: Optional[bool] = False


class TaskCreate(TaskBase):
    pass


class TaskRead(TaskBase):
    id: uuid.UUID
    completed: bool


class TaskUpdate(SQLModel):
    title: Optional[str] = None
    completed: Optional[bool] = None
