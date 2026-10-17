from .especialidade_repository import EspecialidadeRepository
from .especialidade_dto import EspecialidadeDTO

class EspecialidadeService:

    def __init__(self):
        self.repo = EspecialidadeRepository()

    def slct_especialidade_service(self) -> list:
        data = self.repo.select()
        return self.__data_treatment(data)

    def insrt_especialidade_service(self, data: EspecialidadeDTO) -> None:
        self.repo.insert(data)

    def updt_especialidade_service(self, data: EspecialidadeDTO, id: int) -> None:
        self.repo.update(data, id)

    def del_especialidade_service(self, id: int) -> None:
        self.repo.delete(id)

    def slct_by_id_especialidade_service(self, id: int) -> list:
        data = self.repo.select_by_id(id)
        return self.__data_treatment(data)
        
    def __data_treatment(self, data: EspecialidadeDTO) -> list:
        normalized_data = []
        for d in data:
            normalized_data.append({
                "id": d.id,
                "nome": d.nome
            })
        return normalized_data
