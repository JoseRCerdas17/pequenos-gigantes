from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth.security import verificar_password, crear_token, verificar_token, hashear_password
from pydantic import BaseModel
import os

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = hashear_password(os.getenv("ADMIN_PASSWORD", "password_temporal"))

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username != ADMIN_USERNAME:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    if not verificar_password(form_data.password, ADMIN_PASSWORD):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    token = crear_token({"sub": form_data.username})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/verificar")
def verificar(token: str = Depends(oauth2_scheme)):
    username = verificar_token(token)
    if not username:
        raise HTTPException(status_code=401, detail="Token invalido")
    return {"username": username}

def get_admin_actual(token: str = Depends(oauth2_scheme)):
    username = verificar_token(token)
    if not username:
        raise HTTPException(status_code=401, detail="No autorizado")
    return username