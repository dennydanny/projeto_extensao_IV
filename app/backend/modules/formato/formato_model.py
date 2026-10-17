from ..base_model.model import DefaultModel, initpk, str_30, timestamp
from sqlalchemy.orm import Mapped

class Formato(DefaultModel):

    __tablename__ = "formato"

    id: Mapped[initpk]
    nome: Mapped[str_30]
    created_at: Mapped[timestamp]
    updated_at: Mapped[timestamp]