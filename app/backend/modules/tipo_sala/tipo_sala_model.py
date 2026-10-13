from ..base_model.model import BaseModel 
from ..base_model.model import initpk, str_50, timestamp
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
# from ..sala.sala_model import Sala


class TipoSala(BaseModel):

    __tablename__ = "tipo_sala"

    id: Mapped[initpk]
    nome: Mapped[str_50]
    created_at: Mapped[timestamp]
    updated_at: Mapped[timestamp]
    # sala: Mapped["Sala"] = relationship(back_populates="tipo_sala")
