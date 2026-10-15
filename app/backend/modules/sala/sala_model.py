from ..base_model.model import DefaultModel, initpk, str_30, timestamp
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import  ForeignKey


class Sala(DefaultModel):

    __tablename__ = "sala"

    id: Mapped[initpk] 
    nome: Mapped[str_30]
    limite_alunos: Mapped[int] = mapped_column(nullable=False)
    fk_tipo_sala:  Mapped[int] = mapped_column(ForeignKey("tipo_sala.id"))
    created_at: Mapped[timestamp]
    updated_at: Mapped[timestamp]

