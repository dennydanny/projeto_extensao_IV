from .tipo_sala_repository import TipoSalaRepository
from .tipo_sala_dto import TipoSalaDTO

class TipoSalaService:

    def __init__(self):
        self.serv = TipoSalaRepository()

    def slct_tipo_sala_service(self) -> list | None:
        data = self.serv.select()
        return self.__data_treatment(data)
    
    def insrt_tipo_sala_service(self, data: TipoSalaDTO) -> None:
        self.serv.insert(data=data)

    def updt_tipo_sala_service(self, data: TipoSalaDTO, id: int) -> None:
        self.serv.update(data=data, id=id)

    def del_tipo_sala_service(self, id: int) -> None:
        self.serv.delete(id=id)

    def slct_by_id_tipo_sala_service(self, id: int) -> list | None:
        data = self.serv.select_by_id(id=id)
        return self.__data_treatment(data)

    def __data_treatment(self, data: TipoSalaDTO) -> list:
        normalized_data = []
        for d in data:
            normalized_data.append({
                "id": d.id,
                "tipo_sala": d.nome
            })
        return normalized_data