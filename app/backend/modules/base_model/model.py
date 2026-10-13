import datetime
from sqlalchemy import INT, VARCHAR, String, TIMESTAMP, Numeric
from sqlalchemy import  ForeignKey, table, column
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, registry
from decimal import Decimal
from typing_extensions import Annotated

str_30 = Annotated[str, 30]
str_50 = Annotated[str, 50]
num_12_4 = Annotated[Decimal, 12]
num_6_2 = Annotated[Decimal, 6]

initpk = Annotated[int, mapped_column(primary_key=True)]
timestamp = Annotated[datetime.datetime, mapped_column(nullable=False)]

class DefaultModel(DeclarativeBase):

    registry = registry(
        type_annotation_map = {
            int: INT,
            datetime.datetime: TIMESTAMP(timezone=True),
            str: String().with_variant(VARCHAR(255), "mysql"),
            str_30: String(30),
            str_50: String(50),
            num_12_4: Numeric(12, 4),
            num_6_2: Numeric(6, 2),
        }
    )