from pydantic import BaseModel

class SalaDTO(BaseModel):
    nome: str
    limite_alunos: int
    fk_tipo_sala: int