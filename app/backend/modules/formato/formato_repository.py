from ..base_repository import BaseRepository as BR
from .formato_model import Formato
from sqlalchemy import insert, select, update, delete
from .formato_dto import FormatoDTO

class FormatoRepository(BR):

    def insert(self, data: FormatoDTO) -> None:
        stmt = insert(Formato).values(
            nome=data.nome
        )
        self.execute_db_query(stmt, False)

    def select(self) -> list:
        stmt = select(
            Formato.id,
            Formato.nome.label("nome_formato")
        )
        return self.execute_db_query(stmt, True)

    def update(self, data: FormatoDTO, id: int) -> None:
        stmt = update(Formato).where(
            Formato.id == id
        ).values(
            nome=data.nome
        )
        self.execute__db_query(stmt, False)

    def delete(self, id: int) -> None:
        stmt = delete(Formato).where(Formato.id == id)
        self.execute_and_commit_db_query(stmt, False)

    def select_by_id(self, id: int) -> list:
        stmt = select(
            Formato.id,
            Formato.nome.label("nome_formato")
        ).where(
            Formato.id == id
        )
        return self.execute_db_query(stmt, True)
