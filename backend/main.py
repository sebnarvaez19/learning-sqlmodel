import uuid
from typing import List
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Depends
from sqlmodel import Session, select

from .database import create_db_and_tables, engine
from .models import Task, TaskCreate, TaskRead, TaskUpdate


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)


async def get_session():
    with Session(engine) as session:
        yield session


@app.post("/tasks/", response_model=TaskRead)
async def create_task(*, session: Session = Depends(get_session), task: TaskCreate):
    db_task = Task.model_validate(task)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


@app.get("/tasks/", response_model=List[TaskRead])
async def read_tasks(*, session: Session = Depends(get_session)):
    tasks = session.exec(select(Task)).all()

    return tasks


@app.patch("/tasks/{task_id}", response_model=TaskRead)
async def update_task(*, session: Session = Depends(get_session), task_id: uuid.UUID, task: TaskUpdate):
    db_task = session.get(Task, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task_data = task.model_dump(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


@app.delete("/tasks/{task_id}")
async def delete_task(*, session: Session = Depends(get_session), task_id: uuid.UUID):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    session.delete(task)
    session.commit()

    return {"ok": True}
