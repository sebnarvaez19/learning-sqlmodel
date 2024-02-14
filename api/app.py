from fastapi import FastAPI
from sqlmodel import Session

from .database import create_db_and_tables, engine
from .models import Hero, Team


app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/heroes/")
def create_hero(hero: Hero) -> Hero:
    with Session(engine) as session:
        session.add(hero)
        session.commit()
        session.refresh(hero)
        
        return hero

    
def main():
    pass
    

if __name__ == "__main__":
    main()
