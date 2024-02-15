from typing import List

from fastapi import FastAPI
from sqlmodel import Session, select

from .database import create_db_and_tables, engine
from .models import Hero, Team


app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/heroes/", response_model=Hero)
def create_hero(hero: Hero) -> Hero:
    with Session(engine) as session:
        session.add(hero)
        session.commit()
        session.refresh(hero)
        
        return hero


@app.get("/heroes/", response_model=List[Hero])
def read_heroes():
    with Session(engine) as session:
        heroes = session.exec(select(Hero)).all()

        return heroes
