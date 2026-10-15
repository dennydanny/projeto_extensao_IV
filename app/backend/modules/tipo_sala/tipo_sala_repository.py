from ..base_repository import BaseRepository as Br
from sqlalchemy import select, insert, update, delete
from .tipo_sala_model import TipoSala
from .tipo_sala_dto import TipoSalaDTO

class TipoSalaRepository(Br):

    def insert(self, data: TipoSalaDTO) -> None:
        stmt = insert(TipoSala).values(
            nome=data.nome
        )
        self.execute_and_commit_db_query(stmt=stmt, returnable=False)

    def select(self) -> list | None:
        stmt = select(TipoSala.id, TipoSala.nome)
        return self.execute_db_query(stmt=stmt, returnable=True)

    def update(self, data: TipoSalaDTO, id: int) -> None:
        stmt = update(TipoSala).where(TipoSala.id == id).values(
            nome=data.nome
        )
        self.execute_db_query(stmt=stmt, returnable=False)

    def delete(self, id: int) -> None:
        stmt = delete(TipoSala).where(TipoSala.id == id)
        self.execute_db_query(stmt=stmt, returnable=True)

    def select_by_id(self, id: int) -> list | None:
        stmt = select(
            TipoSala.id,
            TipoSala.nome
        ).where(
            TipoSala.id == id
        )
        return self.execute_db_query(stmt=stmt, returnable=True)
