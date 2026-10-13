import json


class ReturnJson:
    
    def return_format_data(self, data: list[dict] | dict) -> str:
        return json.dumps(data, ensure_ascii=False, indent=4)

    