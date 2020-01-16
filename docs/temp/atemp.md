Declaration Type	Namespace	Type	Value
Namespace	X	 	X
Class	 	X	X
Enum	 	X	X
Interface	 	X	 
Type Alias	 	X	 
Function	 	 	X
Variable	 	 	X
``` ts
namespace TestNamespace {
    let aaa: string
}
console.log(TestNamespace) // undefined

enum JobState {
    Pending = 'Pending',
    Running = 'Running'
}
console.log(JobState) // Object:{Pending: "Pending" Running: "Running"}

class Person {
    aaa: string
}
console.log(Person) // f Person() {...}

type TestType = 'Pending' | 'Running'
console.log(TestType) // ts error
```

``` ts
// 泛型T
export interface PagingResponseMsg<T> {
  code: number;
  message: string;
  data: T;
  totalCount?: number; // 数据总条数
  pageNo?: number; // 当前页码
  pageSize?: number; // 页大小
  pageCount?: number; // 总页数
}

```

## Lerna

* lerna init
* lerna add package --scope xxx # 添加项目包
* lerna run command --scope xxx # 执行包命令

lerna bootstrap
lerna publish

* lerna exec --scope xxx -- ls