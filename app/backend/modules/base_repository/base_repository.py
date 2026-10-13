from app.backend.core.interface import engine_mysql as eng
from abc import ABC, abstractmethod


class BaseRepository(ABC):
    @abstractmethod
    def insert(self):
        pass

    @abstractmethod
    def select(self):
        pass

    @abstractmethod
    def update(self):
        pass

    @abstractmethod
    def delete(self):
        pass

    def execute_db_query(self, stmt, returnable: bool = False) -> list[dict] | None:
        with eng.connect() as conn:
            result = conn.execute(stmt)
            if returnable:
                return result
            else:
                conn.commit()
