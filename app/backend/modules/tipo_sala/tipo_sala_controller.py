from .tipo_sala_service import TipoSalaService
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from .tipo_sala_dto import TipoSalaDTO
from fastapi.responses import JSONResponse
from http import HTTPStatus

class TipoSalaController:

    def __init__(self):
        self.ctrl = TipoSalaService()

    def slct_tipo_sala_controller(self) -> JSONResponse:
        try:
            data = self.ctrl.slct_tipo_sala_service()
        except IntegrityError:
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST,
                content="Bad Request"
            )
        except NoResultFound:
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST,
                content="Bad Request"
            )
        except SQLAlchemyError:
            return JSONResponse(
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
                content="Internal Error"
            )
        except data == []:
            return JSONResponse(
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
                content="Internal Error"
            )
        return JSONResponse(
                status_code=HTTPStatus.OK,
                content=data
            )

    def insrt_tipo_sala_controller(self, data: TipoSalaDTO) -> JSONResponse:
        try:
            self.ctrl.insrt_tipo_sala_service(data=data)
        except IntegrityError:
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST,
                content="Bad Request"
            )
        except NoResultFound:
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST,
                content="Bad Request"
            )
        except SQLAlchemyError:
            return JSONResponse(
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
                content="Internal Error"
            )
        return JSONResponse(
            status_code=HTTPStatus.CREATED,
            content="Tipo Sala Objected Created"
        )
    
    def updt_tipo_sala_controller(self, data: dict, id: int) -> JSONResponse:
        try:
            self.ctrl.updt_tipo_sala_service(data=data, id=id)
        except IntegrityError:
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST,
                content="Bad Request"
            )
        except NoResultFound:
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST,
                content="Bad Request"
            )
        except SQLAlchemyError:
            return JSONResponse(
                status_code=500,
                content="Internal Error"
            )
        return JSONResponse(
                status_code=HTTPStatus.OK,
                content="Tipo Sala Objected Updated"
            )
    
    def del_tipo_sala_controller(self, id: int) -> JSONResponse:
        try:
            self.ctrl.del_tipo_sala_service(id)
        except IntegrityError:
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST,
                content="Bad Request"
            )
        except NoResultFound:
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST,
                content="Bad Request"
            )
        except SQLAlchemyError:
            return JSONResponse(
                status_code=500,
                content="Internal Error"
            )
        return JSONResponse(
                status_code=HTTPStatus.OK,
                content="Sala Objected Deleted"
            )
    
    def slct_by_id_tipo_sala_controller(self, id: int) -> JSONResponse:
        try:
            data = self.ctrl.slct_by_id_tipo_sala_service(id)
        except IntegrityError:
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST,
                content="Bad Request"
            )
        except NoResultFound:
            return JSONResponse(
                status_code=HTTPStatus.BAD_REQUEST,
                content="Bad Request"
            )
        except SQLAlchemyError:
            return JSONResponse(
                status_code=500,
                content="Internal Error"
            )
        except data == []:
            return JSONResponse(
                status_code=HTTPStatus.NOT_FOUND,
                content="Not Found"
            )
        return JSONResponse(
                status_code=HTTPStatus.OK,
                content=data
            )