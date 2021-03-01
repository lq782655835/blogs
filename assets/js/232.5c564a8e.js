(window.webpackJsonp=window.webpackJsonp||[]).push([[232],{551:function(n,t,a){"use strict";a.r(t);var e=a(1),s=Object(e.a)({},function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("h1",{attrs:{id:"初识c"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#初识c","aria-hidden":"true"}},[n._v("#")]),n._v(" 初识C++")]),n._v(" "),a("p",[n._v("C++ 程序的源文件通常使用扩展名 .cpp、.cp 或 .c。C++ 进一步扩充和完善了 C 语言，任何合法的 C 程序都是合法的 C++ 程序。")]),n._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[n._v("// 是否安装了 GCC,使用的是 Linux 或 UNIX\ng++ -v // MacOS安装了xcode后，默认带\n")])])]),a("div",{staticClass:"language-c++ extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('// #include <stdio.h> 是预处理器指令，告诉 C/C++ 编译器在实际编译之前要包含 iostream 文件。\n// iosstream该文件定义了 cin、cout、cerr 和 clog 对象，分别对应于标准输入流、标准输出流、非缓冲标准错误流和缓冲标准错误流。\n#include <iostream>\n\n// g++ main.cpp -o helloworld编译c++源码,生成可执行文件\n// ./helloworld 运行文件\nint main()\n{\n    // :: 是作用域符，是运算符中等级最高的\n    // 在这里我想用cout对象是命名空间std中的cout\n    std::cout << "Hello World!\\n";\n    return 0;\n}\n')])])]),a("blockquote",[a("p",[n._v("C++ 是大小写敏感.C++ 完全支持面向对象的程序设计，包括面向对象开发的四大特性：封装、抽象、继承、多态。")])]),n._v(" "),a("h2",{attrs:{id:"数据类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数据类型","aria-hidden":"true"}},[n._v("#")]),n._v(" 数据类型")]),n._v(" "),a("ul",[a("li",[n._v("bool")]),n._v(" "),a("li",[n._v("char 字符型")]),n._v(" "),a("li",[n._v("int/float/double")]),n._v(" "),a("li",[n._v("void")]),n._v(" "),a("li",[n._v("wchar_t 宽字符型")])]),n._v(" "),a("div",{staticClass:"language-c++ extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('#include<iostream>  \n#include<string>  \n#include <limits>  \nusing namespace std;  // 声明命名空间\n  \nint main()  \n{\n    char x = \'x\' // 变量声明\n    const int  LENGTH = 10; // 常量声明\n\n    // << 运算符用于向屏幕传多个值\n    // 使用了 endl，这将在每一行后插入一个换行符\n    cout << "type: \\t\\t" << "************size**************"<< endl;  \n    cout << "bool: \\t\\t" << "所占字节数：" << sizeof(bool);  \n    cout << "\\t最大值：" << (numeric_limits<bool>::max)();  \n    cout << "\\t\\t最小值：" << (numeric_limits<bool>::min)() << endl;  \n    cout << "char: \\t\\t" << "所占字节数：" << sizeof(char);  \n    cout << "\\t最大值：" << (numeric_limits<char>::max)();  \n    cout << "\\t\\t最小值：" << (numeric_limits<char>::min)() << endl;\n    return 0;  \n}\n')])])]),a("blockquote",[a("p",[n._v("基本数据类型是以上七种。")])]),n._v(" "),a("ul",[a("li",[a("p",[n._v("枚举类型：enum color { red, green=5, blue };")])]),n._v(" "),a("li",[a("p",[n._v("函数: 跟大多数语言一致。return_type function_name( parameter list ){...}")])])]),n._v(" "),a("div",{staticClass:"language-c++ extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("int max(int num1, int num2) \n{\n   // 局部变量声明\n   int result;\n \n   // if else\n   if (num1 > num2)\n      result = num1;\n   else\n      result = num2;\n \n   return result; \n}\n\n// Lambda 函数(也叫 Lambda 表达式):[capture](parameters)->return-type{body}\n[](int x, int y) -> int { int z = x + y; return z + x; }\n")])])]),a("ul",[a("li",[n._v("数组：type arrayName [ arraySize ];")])]),n._v(" "),a("div",{staticClass:"language-c++ extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("double balance[5] = {1000.0, 2.0, 3.4, 7.0, 50.0}; // 定义数组\ndouble salary = balance[0]; // 访问数组\n")])])]),a("blockquote",[a("p",[n._v("c++数组，内置无lenght或size()获取数组长度")])]),n._v(" "),a("ul",[a("li",[n._v("字符串")])]),n._v(" "),a("div",{staticClass:"language-c++ extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('#include <cstring>\n\nchar greeting[] = "Hello";\ncout << "Greeting message: ";\ncout << greeting << endl;\ncout << strlen(greeting) << endl;\n')])])]),a("div",{staticClass:"language-c++ extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('// C++ 标准库提供了 string 类类型\n#include <string>\nstring str1 = "Hello";\nstr3.size(); // 5\n')])])]),a("ul",[a("li",[n._v("指针")])]),n._v(" "),a("p",[n._v("指针是一个其值为地址的变量，（就是一个存储地址的变量）。")]),n._v(" "),a("div",{staticClass:"language-c++ extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("int a = 5;\nint *p = &a; // 指针变量里存储的是地址，&a也是地址.p是指针变量，&a是一个具体的地址\n")])])]),a("p",[n._v("int * 类型变量 p 里存放的是 int * 类型的地址，我们可以用这个地址找到内存中的一个存储空间。")]),n._v(" "),a("p",[n._v("c++要这个类型的变量（指针）有什么用呢？比如我们要去上课，下午一共三节课，有数据结构课，有算法课，还有c++课，三节课在不同的教室，如果我们不知道c++课在哪个教室，就得挨个去看喽，如果我们知道c++课在101教室，算法课在102教室，数据结构的课在103教室，直接去101教室就好啦，起中间媒介的连接作用的101，102，103编号或许有助于对指针的理解。指针变量里的内容就是编号，指针起这样的媒介的、连接的、引导的作用~~~ 在计算机内存中，指针变量中存储的就是编址后的内存的各个编号，这个编号一般叫地址。")]),n._v(" "),a("div",{staticClass:"language-c++ extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("// c++中指针的定义,四种写法编译都没有错误\n//  * 号我们现在可以理解为这仅仅代表定义了一个指针变量p, p的类型是 int * 或者 int* \nint *p; //*号前有空格，可以是任意个空格\nint* p; //*号后有空格，可以是任意个空格\nint*p; //*号前后都没有空格\nint * p; //*号前后都有空格，可以是任意个空格\n")])])]),a("div",{staticClass:"language-c++ extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("int p; //这是一个普通的整型变量\nint *p; //首先从P 处开始,先与*结合,所以说明P 是一个指针,然后再与int 结合,说明指针所指向的内容的类型为int 型.所以P是一个返回整型数据的指针\nint p[3]; //首先从P 处开始,先与[]结合,说明P 是一个数组,然后与int 结合,说明数组里的元素是整型的,所以P 是一个由整型数据组成的数组\nint *p[3]; //首先从P 处开始,先与[]结合,因为其优先级比*高,所以P 是一个数组,然后再与*结合,说明数组里的元素是指针类型,然后再与int 结合,说明指针所指向的内容的类型是整型的,所以P 是一个由返回整型数据的指针所组成的数组\n")])])]),a("div",{staticClass:"language-c++ extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('#include <iostream>\nusing namespace std;\nint main()\n{\n   int a=5;\n   double b=10.4;\n   cout<<"Address of a:"<<&a<<endl; // Address of a:0x7ffeede2899c\n   cout<<"Address of b:"<<&b<<endl; // Address of b:0x7ffeede28990\n   int c = a; // 虽然赋值，但基本类型，a和c不同地址\n   int* d = &c; // d和c指向同一个地方\n//    c = 6; // 当c改变时，d的指针也同时变\n    *d = 10; // 当d改变时，c的值也同时改变c=10\n    cout<<"Address of c:"<<&c<<";"<<c<<endl; // Address of c:0x7ffee798098c;5\n    cout<<"Address of d:"<<d<<";"<<*d<<endl; // Address of d:0x7ffee798098c;5\n}\n')])])]),a("blockquote",[a("p",[n._v("箭头（->）：左边必须为指针；点号（.）：左边必须为实体。")])]),n._v(" "),a("ul",[a("li",[n._v("类")])]),n._v(" "),a("div",{staticClass:"language-c++ extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("class Shape // 定义类\n{\n   public: // 限定符\n      void setWidth(int w) // 方法函数\n      {\n         width = w;\n      }\n      void setHeight(int h)\n      {\n         height = h;\n      }\n   protected:\n      int width;\n      int height;\n};\n")])])]),a("div",{staticClass:"language-c++ extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("// 类实例化\n// 一：不使用new，当作普通参数\n#include<iostream>\nusing namespace std;\n\nclass A {\n    public:\n        int a;\n    A() { a = 5; } // 可理解为构造函数\n};\n\nint main() {\n    A a = A();\n    A a1 = a; // a复制给a1，但它们之间不是引用\n    a1.a = 6; // a1改变，不影响a的内容。\n    cout<<&a<<&a1<<endl; // a1和a完全不同的两个地址\n    cout<<a.a<<a1.a<<endl; // 5，6\n};\n\n// 二：使用new\n// new创建类对象需要指针接收\n#include<iostream>\nusing namespace std;\n\nclass A {\n    public:\n        int a;\n    A() { a = 5; } // 可理解为构造函数\n};\n\nint main() {\n    A* a = new A();\n    A* a1 = a; // a复制给a1，引用互通。有点类似高级语言的引用类型\n    a1->a = 6; // a1改变，a同时改变。\n    cout<<a<<a1<<endl; // a1和a完全相同的两个地址\n    cout<<a->a<<a1->a<<endl; // 6，6\n};\n")])])])])},[],!1,null,null,null);t.default=s.exports}}]);