# JSON Schema 规范

Json Schema，约定json数据格式以及可验证是否正确的规范。

``` json
schema = {
    # 该关键字用于指定JSON Schema版本: draft-07
    "$schema": "http://json-schema.org/draft-07/schema#",
    # 描述对应的JSON元素，title相对来说，更加简洁
    "title": "book info",
    # 描述对应的JSON元素，description更加倾向于详细描述相关信息
    "description": "some information about book",
    # 该关键字用于限定待校验JSON元素所属的数据类型，取值可为：object，array，integer，number，string，boolean，null
    "type": "object",
    # 用于指定JSON对象中的各种不同key应该满足的校验逻辑，
    # 如果待校验JSON对象中所有值都能够通过该关键字值中定义的对应key的校验逻辑，每个key对应的值，都是一个JSON Schema，则待校验JSON对象通过校验。
    "properties": {
        "id": {
            "description": "The unique identifier for a book",
            "type": "integer",
            "minimum": 1
        },
        "name": {
            "description": "book name",
            "type": "string",
            "minLength": 3,
            "maxLength": 30
        },
        "info": {
            "description": "simple information about book",
            "type": "string",
            "minLength": 10,
            "maxLength": 60
        },
        "tips": {
            "anyOf": [  # 满足其中一个类型 就行
                {"type": "string", "minLength": 10, "maxLength": 60}, 
                {"type": "number", "minimum": 5.0}
            ]
        },
        "price": {
            "description": "book price",
            "type": "number",
            # 能被0.5整除
            "multipleOf": 0.5,
            # 这里取等，5.0=<price<=99999.0
            "minimum": 5.0,
            "maximum": 99999.0,
            # 若使用下面这两个关键字则 5.0<price<99999.0
            # "exclusiveMinimum": 5.0,
            # "exclusiveMaximum": 99999.0
        },
        "tags": {
            "type": "array",
            "items": [
                {
                    "type": "string",
                    "minLength": 2,
                    "maxLength": 8
                },
                {
                    "type": "number",
                    "minimum": 1.0
                }
            ],
            # 待校验JSON数组第一个元素是string类型，且可接受的最短长度为5个字符，第二个元素是number类型，且可接受的最小值为10
            # 剩余的其他元素是string类型，且可接受的最短长度为2。
            "additonalItems": {
                "type": "string",
                "miniLength": 2
            },
            # 至少一个
            "miniItems": 1,
            # 最多5个
            "maxItems": 5,
            # 值为true时，所有元素都具有唯一性时，才能通过校验。
            "uniqueItems": True
        },
        "date": {
            "description": "书籍出版日期",
            "type": "string",
            # 可以是以下取值：date、date-time（时间格式）、email（邮件格式）、hostname（网站地址格式）、ipv4、ipv6、uri等。
            # 使用format关键字时，在实例化validator时必须给它传format_checker参数，值如：draft7_format_checker, 网址：
            # https://python-jsonschema.readthedocs.io/en/latest/validate/#jsonschema.Draft7Validator
            "format": "date",
        },
        "bookcoding": {
            "description": "书籍编码",
            "type": "string",
            # 符合该关键字指定的正则表达式，才算通过校验。
            "pattern": "^[A-Z]+[a-zA-Z0-9]{12}$"
        },
        "other": {
            "description": "其他信息",
            "type": "object",
            "properties": {
                "info1": {
                    "type": "string"
                },
                "info2": {
                    "type": "string"
                }
            }
        }
    },
    # 指定了待校验JSON对象可以接受的最少 一级key 的个数
    "minProperties": 3,
    # 指定了待校验JSON对象可以接受的最多 一级key 的个数。
    "maxProperties": 7,
    # patternProperties对象的每一个一级key都是一个正则表达式，value都是一个JSON Schema。
    # 只有待校验JSON对象中的一级key，通过与之匹配的patternProperties中的一级正则表达式，对应的JSON Schema的校验，才算通过校验。
    # 下面的JSON Schema表示, 所有以a开头的一级key的value都必须是number，
    "patternProperties": {
        "^a": {
            "type": "number"
        },
    },
    # 如果待校验JSON对象中存在，既没有在properties中被定义，又没有在patternProperties中被定义，那么这些一级key必须通过additionalProperties的校验。
    "additionalProperties": {
        "desc": {
            "type": "string",
            "minLength": 1
        },
    },
    # 该关键字限制了JSON对象中必须包含哪些一级key。
    # 如果一个JSON对象中含有required关键字所指定的所有一级key，则该JSON对象能够通过校验。
    "required": ["id", "name", "info", "price"]
}
```

使用vjt校验
``` js
const errors = vjt.validate(json_data, schema)
```

## object
object类型有三个关键字:type（限定类型）,properties(定义object的各个字段),required（限定必需字段）

## array
array有三个单独的属性:items,minItems,uniqueItems:

## 参考

https://www.jianshu.com/p/8278eb2458c4