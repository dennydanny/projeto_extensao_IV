from ..base_model.model import (
    BaseModel,
    mapped_column,
    Mapped,
    ForeignKey,
    initpk,
    str_30,
    timestamp,
    table,
    column
)
from sqlalchemy.orm import relationship
from ..tipo_sala.tipo_sala_model import TipoSala



class Sala(BaseModel):

    __tablename__ = "sala"

    id: Mapped[initpk] 
    nome: Mapped[str_30]
    limite_alunos: Mapped[int] = mapped_column(nullable=False)
    fk_tipo_sala:  Mapped[int] = mapped_column(ForeignKey("tipo_sala.id"))
    created_at: Mapped[timestamp]
    updated_at: Mapped[timestamp]
    tipo_sala: Mapped["TipoSala"] = relationship(back_populates="sala")
