from .sala_service import SalaService
from .sala_dto import SalaDTO
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from fastapi.responses import JSONResponse
from http import HTTPStatus

class SalaController:

    def __init__(self):    
        self.ctrl = SalaService()

    def insrt_sala_controller(self, data: SalaDTO) -> JSONResponse:
        try:
            self.ctrl.insrt_sala_service(data=data)
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
                content="Sala Object Created"
            )

    def updt_sala_controller(self, data: SalaDTO, id: int) -> JSONResponse:
        try:
            self.ctrl.updt_sala_service(data=data, id=id)
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
                status_code=HTTPStatus.OK,
                content="Sala Objected Updated"
            )

    def del_sala_controller(self, id: int) -> JSONResponse:
        try:
            self.ctrl.del_sala_service(id=id)
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
                status_code=HTTPStatus.OK,
                content="Sala Objected Deleted"
            )

    def slct_sala_controller(self) -> JSONResponse:
        try:
            data = self.ctrl.slct_sala_service()
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

    def slct_by_id_sala_controller(self, id: int) -> JSONResponse:
        try:
            data = self.ctrl.slct_by_id_sala_service(id=id)
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
                status_code=HTTPStatus.NOT_FOUND,
                content="Not Found"
            )
        return JSONResponse(
                status_code=HTTPStatus.OK,
                content=data
            )