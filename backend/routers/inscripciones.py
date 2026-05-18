import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from models.inscripcion import Inscripcion
from pydantic import BaseModel
from typing import Optional
from routers.auth import get_admin_actual

router = APIRouter(prefix="/inscripciones", tags=["inscripciones"])
logger = logging.getLogger(__name__)

class InscripcionCreate(BaseModel):
    nombre_nino: str
    fecha_nacimiento: str
    genero: Optional[str] = None
    pediatra: Optional[str] = None
    alergias: Optional[str] = None
    condiciones_medicas: Optional[str] = None
    nombre_tutor: str
    relacion: Optional[str] = None
    telefono: str
    telefono_secundario: Optional[str] = None
    email: str
    direccion: Optional[str] = None
    personas_autorizadas: Optional[str] = None
    tipo_jornada: Optional[str] = None
    hora_entrada: Optional[str] = None
    hora_salida: Optional[str] = None
    transporte: bool = False
    direccion_recogida: Optional[str] = None
    notas: Optional[str] = None
    estado: str = "pendiente"

class EstadoUpdate(BaseModel):
    estado: str

@router.post("/")
def crear_inscripcion(data: InscripcionCreate, db: Session = Depends(get_db)):
    nueva = Inscripcion(**data.model_dump())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    try:
        from emails import enviar_confirmacion_inscripcion
        enviar_confirmacion_inscripcion(
            nombre_tutor=data.nombre_tutor,
            email=data.email,
            nombre_nino=data.nombre_nino,
            inscripcion_id=nueva.id
        )
    except Exception:
        logger.exception("Error enviando email inscripcion id=%s", nueva.id)
    return nueva

@router.get("/")
def obtener_inscripciones(db: Session = Depends(get_db), _: str = Depends(get_admin_actual)):
    return db.query(Inscripcion).order_by(Inscripcion.creado_en.desc()).all()

@router.get("/{inscripcion_id}")
def obtener_inscripcion(inscripcion_id: int, db: Session = Depends(get_db), _: str = Depends(get_admin_actual)):
    ins = db.query(Inscripcion).filter(Inscripcion.id == inscripcion_id).first()
    if not ins:
        raise HTTPException(status_code=404, detail="Inscripción no encontrada")
    return ins

@router.patch("/{inscripcion_id}")
def actualizar_estado(inscripcion_id: int, body: EstadoUpdate, db: Session = Depends(get_db), _: str = Depends(get_admin_actual)):
    ins = db.query(Inscripcion).filter(Inscripcion.id == inscripcion_id).first()
    if not ins:
        raise HTTPException(status_code=404, detail="Inscripción no encontrada")
    ins.estado = body.estado
    db.commit()
    return {"message": "Estado actualizado"}

@router.delete("/{inscripcion_id}")
def eliminar_inscripcion(inscripcion_id: int, db: Session = Depends(get_db), _: str = Depends(get_admin_actual)):
    ins = db.query(Inscripcion).filter(Inscripcion.id == inscripcion_id).first()
    if not ins:
        raise HTTPException(status_code=404, detail="Inscripción no encontrada")
    db.delete(ins)
    db.commit()
    return {"message": "Inscripción eliminada"}
