from .sala_service import SalaService
from .sala_dto import SalaDTO

class SalaController:

    def __init__(self):    
        self.ctrl = SalaService()

    def insrt_sala_controller(self, data: SalaDTO) -> None:
        self.ctrl.insrt_sala_service(data=data)
    
    def updt_sala_controller(self, data: SalaDTO, id: int) -> None:
        self.ctrl.updt_sala_service(data=data, id=id)

    def del_sala_controller(self, id: int) -> None:
        self.ctrl.del_sala_service(id=id)

    def slct_sala_controller(self) -> list:
        return self.ctrl.slct_sala_service()

    def slct_by_id_sala_controller(self, id: int) -> list:
        return self.ctrl.slct_by_id_sala_service(id=id)
