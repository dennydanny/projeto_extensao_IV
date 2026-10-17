from .formato_service import FormatoService
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from http import HTTPStatus
from .formato_dto import FormatoDTO
from fastapi.responses import JSONResponse

class FormatoController:

    def __init__(self):
        self.serv = FormatoService()

    def slct_formato_controller(self) -> JSONResponse:
        try:
            data = self.serv.slct_formato_service()
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
    
    def insrt_formato_controller(self, data: FormatoDTO) -> JSONResponse:
        try:
            self.serv.insrt_formato_service(data)
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

    def updt_formato_controller(self, data: FormatoDTO, id: int) -> JSONResponse:
        try:
            self.serv.updt_formato_service(data, id)
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
    
    def del_formato_controller(self, id: int) -> JSONResponse:
        try:
            self.serv.del_formato_service(id)
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
    
    def slct_by_id_formato_controller(self, id: int) -> JSONResponse:
        try:
            data = self.serv.slct_by_id_formato_service(id)
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