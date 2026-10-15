from .sala_repository import SalaRepository
from .sala_dto import SalaDTO

class SalaService:

    def __init__(self):
        self.serv = SalaRepository()

    def insrt_sala_service(self, data: SalaDTO) -> None:
        self.serv.insert(data=data)

    def updt_sala_service(self, data: SalaDTO, id: int) -> None:
        self.serv.update(data=data, id=id)

    def del_sala_service(self, id: int) -> None:
        self.serv.delete(id=id)

    def slct_sala_service(self) -> list:
        data = self.serv.select()
        return self.__data_treatment(data)

    def slct_by_id_sala_service(self, id: int) -> None:
        data = self.serv.select_by_id(id=id)
        return self.__data_treatment(data)

    def __data_treatment(self, data: list) -> list:
        normalized_data = []
        for d in data:
            normalized_data.append({
                "id": d.id,
                "nome_sala": d.nome,
                "quantidade_alunos": d.limite_alunos,
                "tipo_sala": d.tipo_sala
            })
        return normalized_data

