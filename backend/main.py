import logging
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.connection import Base, engine
from routers import auth, inscripciones

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")

Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(
    title="Pequeños Gigantes API",
    description="API para la guardería infantil Pequeños Gigantes",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(inscripciones.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Pequeños Gigantes API funcionando ✅"}
