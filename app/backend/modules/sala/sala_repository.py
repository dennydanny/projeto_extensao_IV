from ..base_repository import BaseRepository
from sqlalchemy import select, insert, update, delete
from .sala_model import Sala
from ..tipo_sala.tipo_sala_model import TipoSala
from .sala_dto import SalaDTO

class SalaRepository(BaseRepository):

    def select(self) -> list:
        stmt = select(
            Sala.id,
            Sala.nome,
            Sala.limite_alunos,
            TipoSala.nome.label("tipo_sala")
        ).join(
            TipoSala
        ).where(
            TipoSala.id == Sala.fk_tipo_sala
        ).order_by(
            Sala.id
        )
        return self.execute_db_query(stmt=stmt, returnable=True).all()

    def insert(self, data: SalaDTO) -> None:
        stmt = insert(Sala).values(
            nome=data.nome,
            limite_alunos=data.limite_alunos,
            fk_tipo_sala=data.fk_tipo_sala
        )
        self.execute_db_query(stmt=stmt, returnable=False)

    def update(self, data: SalaDTO, id: int) -> None:
        stmt = update(Sala).where(Sala.id == id).values(
            nome=data.nome,
            limite_alunos=data.limite_alunos,
            fk_tipo_sala=data.fk_tipo_sala
        )
        self.execute_db_query(stmt=stmt, returnable=False)

    def delete(self, id: int) -> None:
        stmt = delete(Sala).where(Sala.id == id)
        self.execute_db_query(stmt=stmt, returnable=False)

    def select_by_id(self, id: int) -> list:
        stmt = select(
            Sala.id,
            Sala.nome,
            Sala.limite_alunos,
            TipoSala.nome.label("tipo_sala")
        ).join(
            TipoSala
        ).where(
            TipoSala.id == Sala.fk_tipo_sala
        ).order_by(
            Sala.id
        ).where(Sala.id == id)
        return self.execute_db_query(stmt=stmt, returnable=True).all()