from .sala_repository import SalaRepository
from ..base_json.return_json import ReturnJson


class SalaService:

    def __init__(self):
        self.serv = SalaRepository()
        self.json = ReturnJson()

    def insrt_sala_service(self, data: dict) -> None:
        self.serv.insert(data=data)

    def updt_sala_service(self, data: dict, id: int) -> None:
        data['id'] = id
        self.serv.update(data=data)

    def del_sala_service(self, id: int) -> None:
        data = {'id': id}
        self.serv.delete(data=data)

    def slct_sala_service(self) -> list[dict]:
        data = self.serv.select()
        return self.__data_treatment(data)

    def slct_by_id_sala_service(self, id: int) -> list[dict]:
        data = {'id': id}
        data = self.serv.select_by_id(data=data)
        return self.__data_treatment(data)

    def __data_treatment(self, data: object) -> str | None:
        normalized_data = []

        for d in data:
            normalized_data.append({
                "id": d.id,
                "nome_sala": d.nome,
                "quantidade_alunos": d.limite_alunos,
                "tipo_sala": d.tipo_sala
            })
            # print(d)
        return self.json.return_format_data(normalized_data)
        #return normalized_data

