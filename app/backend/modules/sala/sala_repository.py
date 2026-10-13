from ..base_repository import BaseRepository
from sqlalchemy import table, column, select, text
from .sala_model import Sala 

class SalaRepository(BaseRepository):

    def __init__(self):
        self.sala = table(
            "sala",
            column("id"),
            column("nome"),
            column("limite_alunos"),
            column("fk_tipo_sala"),
            column("created_at"),
            column("updated_at"),
            column("tipo_sala")
        )
        # self.sala = Sala()

    def select(self) -> object:

        stmt = (
            select(self.sala.c.id, self.sala.c.nome, self.sala.c.limite_alunos, text('tipo_sala.nome as tipo_sala') ).join_from(
                self.sala, self.sala.c.tipo_sala, self.sala.c.fk_tipo_sala == self.sala.c.tipo_sala.c.id)
        )
        return self.execute_db_query(stmt=stmt)

    def insert(self, data: dict) -> None:
        stmt = """insert into sala (
                    numero_nome,
                    limite_alunos,
                    fk_tipo_sala
                ) values (
                    :numero_nome,
                    :limite_alunos,
                    :fk_tipo_sala
                );"""
        self.execute_and_commit_db_query(stmt=stmt, data=data)

    def update(self, data: dict) -> None:
        stmt = """update sala 
                    set numero_nome = :numero_nome,
                    set limite_alunos = :limite_alunos,
                    set fk_tipo_sala = :fk_tipo_sala
                where id = :id;"""
        self.execute_and_commit_db_query(stmt=stmt, data=data)

    def delete(self, data: dict) -> None:
        stmt = """delete from sala where id = :id;"""
        self.execute_and_commit_db_query(stmt=stmt, data=data)

    def select_by_id(self, data: dict) -> None:
        stmt = """select 
                    s.id,
                    s.numero_nome as nome_sala,
                    s.limite_alunos,
                    ts.nome as tipo_sala
                from sala as s
                join tipo_sala as ts on ts.id = s.fk_tipo_sala
                where id = :id;"""
        return self.execute_db_query(stmt=stmt)
