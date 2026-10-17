from ..base_model.model import DefaultModel, initpk, str_30, timestamp
from sqlalchemy.orm import Mapped


class Especialidade(DefaultModel):

    __tablename__ = "especialidade"

    id: Mapped[initpk]
    nome: Mapped[str_30]
    created_at: Mapped[timestamp]
    updated_at: Mapped[timestamp]
