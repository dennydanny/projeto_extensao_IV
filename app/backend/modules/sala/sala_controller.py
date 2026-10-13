from .sala_service import SalaService
from ..base_json.return_json import ReturnJson


class SalaController:

    def __init__(self):    
        self.ctrl = SalaService()
        self.json = ReturnJson()

    def insrt_sala_controller(self, data: dict):
        response = []
        try:
            self.ctrl.insrt_sala_service(data=data)
            response.append({
                "status": 201,
                "description": "Object created"
            });
        except Exception as e:
            response.append({
                "status": 400,
                "description": "Bad Request",
                "error": str(e).split('\n')[0],
                "error_type": str(type(e))
            })
        return self.json.return_format_data(response)
    
    def updt_sala_controller(self, data: dict, id: int) -> None:
        response = []
        try:
            self.ctrl.updt_sala_service(data=data, id=id)
        except:
            pass

    def del_sala_controller(self, id: int) -> None:
        
        response = []
        try:
            data = self.ctrl.del_sala_service(id=id)
            response.append({
                "status": 200,
                "description": "Success",
                "data": data
            })
        except Exception:
            response.append({
                "status": 500,
                "description": "Internal Error",
            })
        return self.json.return_format_data(response)

    def slct_sala_controller(self) -> str:
        response = self.ctrl.slct_sala_service()
        # try:
        #     data = self.ctrl.slct_sala_service()
        #     response.append({
        #         "status": 200,
        #         "description": "Success",
        #         "data": data
        #     })
        # except Exception as e:
        #     response.append({
        #         "status": 500,
        #         "description": "Internal Error",
        #         "error": str(e)
        #     })
        #return self.json.return_format_data(response)
        return response

    def slct_by_id_sala_controller(self, id: int) -> str:
        return self.ctrl.slct_by_id_sala_service(id=id)
