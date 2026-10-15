from ..base_model.model import DefaultModel 
from ..base_model.model import initpk, str_50, timestamp
from sqlalchemy.orm import Mapped


class TipoSala(DefaultModel):

    __tablename__ = "tipo_sala"

    id: Mapped[initpk]
    nome: Mapped[str_50]
    created_at: Mapped[timestamp]
    updated_at: Mapped[timestamp]
