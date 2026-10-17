from .especialidade_service import EspecialidadeService
from .especialidade_dto import EspecialidadeDTO
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from fastapi.responses import JSONResponse
from http import HTTPStatus

class EspecialidadeController:

    def __init__(self):
        self.serv = EspecialidadeService()

    def slct_especialidade_controller(self) -> list[dict] | None:
        try:
            data = self.serv.slct_especialidade_service()
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

    def insrt_especialidade_controller(self, data: dict) -> None:
        try:
            self.serv.insrt_especialidade_service(data)
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

    def updt_especialidade_controller(self, data: dict, id: int) -> None:
        try:
            self.serv.updt_especialidade_service(data, id)
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

    def del_especialidade_controller(self, id: int) -> None:
        try:
            self.serv.del_especialidade_service(id)
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
    
    def slct_by_id_especialidade_controller(self, id: int) -> list[dict] | None:
        try:
            data = self.serv.slct_especialidade_service(id)
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