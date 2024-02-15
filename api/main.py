from typing import List

from fastapi import FastAPI
from sqlmodel import Session, select

from .database import create_db_and_tables, engine
from .models import Hero, HeroCreate, HeroRead


app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/heroes/", response_model=HeroRead)
def create_hero(hero: HeroCreate) -> Hero:
    with Session(engine) as session:
        db_hero = Hero.model_validate(hero)
        session.add(db_hero)
        session.commit()
        session.refresh(db_hero)
        
        return db_hero


@app.get("/heroes/", response_model=List[HeroRead])
def read_heroes():
    with Session(engine) as session:
        heroes = session.exec(select(Hero)).all()

        return heroes
