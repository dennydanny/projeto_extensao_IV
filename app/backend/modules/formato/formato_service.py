from .formato_repository import FormatoRepository
from .formato_dto import FormatoDTO

class FormatoService:

    def __init__(self):
        self.repo = FormatoRepository()

    def slct_formato_service(self) -> list:
        data = self.repo.select()
        return self.__normalize_data(data)

    def insrt_formato_service(self, data: FormatoDTO) -> None:
        self.repo.insert(data)

    def updt_formato_service(self, data: FormatoDTO, id: int) -> None:
        self.repo.update(data, id)

    def del_formato_service(self, id: int) -> None:
        self.repo.delete(id)

    def slct_by_id_formato_service(self, id: int) -> list:
        data = self.slct_by_id_formato_service(id)
        return self.__normalize_data(data)

    def __normalize_data(self, data: FormatoDTO) -> list:
        normalized_data = []
        for d in data:
            normalized_data.append({
                "id": d.id,
                "nome_formato": d.nome
            })
        return self.json.retorna_dados_formatados(normalized_data)
