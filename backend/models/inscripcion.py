from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from database.connection import Base
from datetime import datetime

class Inscripcion(Base):
    __tablename__ = "inscripciones"

    id = Column(Integer, primary_key=True, index=True)

    # Niño
    nombre_nino = Column(String, nullable=False)
    fecha_nacimiento = Column(String, nullable=False)
    genero = Column(String, nullable=True)
    pediatra = Column(String, nullable=True)
    alergias = Column(String, nullable=True)
    condiciones_medicas = Column(Text, nullable=True)

    # Tutor
    nombre_tutor = Column(String, nullable=False)
    relacion = Column(String, nullable=True)
    telefono = Column(String, nullable=False)
    telefono_secundario = Column(String, nullable=True)
    email = Column(String, nullable=False)
    direccion = Column(String, nullable=True)
    personas_autorizadas = Column(Text, nullable=True)

    # Servicios
    tipo_jornada = Column(String, nullable=True)
    hora_entrada = Column(String, nullable=True)
    hora_salida = Column(String, nullable=True)
    transporte = Column(Boolean, default=False)
    direccion_recogida = Column(String, nullable=True)
    notas = Column(Text, nullable=True)

    # Estado
    estado = Column(String, default="pendiente")  # pendiente | confirmado | cancelado
    creado_en = Column(DateTime, default=datetime.utcnow)
