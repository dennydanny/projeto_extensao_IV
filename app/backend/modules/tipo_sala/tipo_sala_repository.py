from ..base_repository import BaseRepository as Br
from sqlalchemy import table, column

class TipoSalaRepository(Br):

    # model = table(
    #     "tipo_sala",
    #     column("id"),
    #     column("nome"),
    #     column("created_at"),
    #     column("updated_at")
    # )

    def  __init__(self):
        pass

    def insert(self, data: dict) -> None:
        stmt = "insert into tipo_sala (nome) values (:nome);"
        self.execute_and_commit_db_query(stmt=stmt, data=data)

    def select(self) -> list[dict]:
        stmt = "select id, nome from tipo_sala;"
        return self.execute_db_query(stmt=stmt)

    def update(self, data: dict) -> None:
        stmt = "update tipo_sala set nome = :nome where id = :id;"
        self.execute_and_commit_db_query(stmt=stmt, data=data)

    def delete(self, data: dict) -> None:
        stmt = "delete from tipo_sala where id = :id;"
        self.execute_and_commit_db_query(stmt=stmt, data=data)

    def select_by_id(self, data: dict) -> list[dict] | None:
        stmt = stmt = "select id, nome from tipo_sala where id = :id;"
        return self.execute_db_query(stmt=stmt, data=data)
