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