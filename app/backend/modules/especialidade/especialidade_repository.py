from ..base_repository import BaseRepository as Br
from sqlalchemy import select, insert, update, delete
from .especialidade_dto import EspecialidadeDTO
from .especialidade_model import Especialidade


class EspecialidadeRepository(Br):

    def insert(self, data: EspecialidadeDTO) -> None:
        stmt = insert(Especialidade).values(nome=data.nome)
        self.execute_and_commit_db_query(stmt=stmt, returnable=False)

    def select(self) -> list:
        stmt = select(
            Especialidade.id,
            Especialidade.nome
        )
        return self.execute_db_query(stmt=stmt, returnable=True)

    def update(self, data: EspecialidadeDTO, id: int) -> None:
        stmt = update(Especialidade).where(
                Especialidade.id == id
            ).values(
                nome=data.nome
            )
        self.execute_and_commit_db_query(stmt=stmt, returnable=False)

    def delete(self, id: int) -> None:
        stmt = delete(Especialidade).where(Especialidade.id  == id)
        self.execute_and_commit_db_query(stmt=stmt, returnable=False)

    def select_by_id(self, id: int) -> list:
        stmt = select(
            Especialidade.id,
            Especialidade.nome
        ).where(
            Especialidade.id == id
        )
        return self.execute_db_query(stmt=stmt, returnable=True)