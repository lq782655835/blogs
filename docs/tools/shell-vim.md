# Shell && Vim

## 目录操作

| 命令名      | 使用举例   | 功能描述     |
| ---        |   ----    | ---        |
| **mkdir**      | mkdir dirname | 创建一个目录 |
| rmdir      | rmdir dirname | 删除一个目录 |
| mvdir      | mvdir dir1 dir2 | 移动或重命名一个目录 |
| **cp**      | cp -r sourcedir destdir | 复制文件夹（-r递归） |
| **rm**      | rm -rf dirname |  删除文件或目录（-r递归 -f强制）
| **cd**      | cd dirname | 改变当前目录 |
| **ls**      | ls -la | 显示当前目录的内容 |
| **pwd**      | pwd | 显示当前目录的路径名 |
| du      | du -sh dirname | 查看目录/文件占用空间大小 |

``` shell
# examples
cp -r ../package1 ./packages/ # 拷贝package1文件夹到packages文件夹下
```

## 文件操作
| 命令名      | 使用举例   | 功能描述     |
| ---        |   ----    | ---        |
| cat      | cat filename | 显示文件 |
| echo      | echo 'hello world' > ./testfile.txt | 打印或新建文件 |
| touch      | touch filename | 新建文件 |
| mv      | cat filename | 显示或连接文件 |

## 其他Shell命令
| 命令名      | 使用举例   | 功能描述     |
| ---        |   ----    | ---        |
| clear      | clear | 清除屏幕或窗口内容 |
| env      | env | 显示当前所有设置过的环境变量 |
| date      | date | 显示系统的当前日期和时间 |
| cal      | cal | 显示日历 |
| curl   |  curl [option] url | http命令行工具
| grep   |  grep 'keyword' file | 过滤文本
| wc   |  wc [option] file | wordcount以及行数
| head/tail   |  head/tail file | 查看前/后几行文本
| ps   |  ps -A | 查看所有命令，可配合grep
![image](https://user-images.githubusercontent.com/6310131/69216024-18657380-0ba6-11ea-9b66-37972069568d.png)

> 管道：Linux系统中的命令可以将标准输入读取数据，还能将这些数据送到标准输出中去，这种功能被系统进一步的利用，从而产生出一种新的特性，称之为管道符“|”，这个符号可以将一个命令的标准输出管道为另外一个命令的标准输入。比如：echo "hello world" | grep -i "HELLO"

> ~/.zshrc:存放快捷配置；/etc/hosts: host配置；/usr/local/etc/nginx/(MACOS)/etc/nginx(Docker);

## Shell编程

### 基础

``` bash
# run: sh depoly.sh 123 123
# 变量定义
str='test' # 注意赋值不需要空格
str2="this is $str" # 双引号可以直接写入变量
str3="this is ${str}"
arr=('1' '2') # 数组

# echo打印
echo this is test # this is test # 被默认为字符串，不会报错
echo $str # test # 变量引用需要家$符号
echo $str2 # this is test
echo $str3 # this is test
echo ${arr[1]} # 2 # 数组切割

# if判断
if [ $str == "test" ] # if条件需要在方括号中，并且注意需要空格
then
    echo 'successed'
fi

a='10'
b='20'
if [ $a != $b ]
then
   echo "a 不等于 b"
fi

# 获取参数
echo $1 # 123 #第一个参数
echo $# # 2 # 参数个数
echo $* # 123 123 所有参数
```

### 常用
* $相关
    * ${ } $var 与${var} 并没有啥不一样。但是用 ${ } 会比较精确的界定变量名称的范围
    * $()和 ` ` 都是用来做命令替换用
* if 参数
    * [-z string] “string”的长度为零则为真。-n相反
    * -o(相当于||)	或运算，有一个表达式为 true 则返回 true。
    * -a（相当于&&）与运算，两个表达式都为 true 才返回 true。
* grep 文本搜索工具，常搭配cat命令
* awk 文本分析工具
* sed 在线编辑器
``` bash
aaa=1
bbb=2
echo $aaa == ${aaa} # 1==1
echo $(git remote -v)
echo `date`

if [ -z "$(git status --porcelain)" ]; then
  echo "Deploying gh-pages..."
else
  echo "Uncommitted git changes! Deploy failed."
fi

VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g');
```

### 实践案例

#### 1. sed内容正则替换

要求：把main.txt文件内容，所有“[data-v-*]”内容，替换为空字符串

```
sed -i ''  's/\[data-v-.*\]//g' main.txt
```

说明：
* 格式： `sed -i '' 's/oldValue/newValue/g' file.txt`
* sed替换后面加 `-i ''`，因为不加的表示备份，加上则直接替换原文件。

#### 2. shell编程批量把markdown文件转为docx文件

要求：对文件夹中的markdown文件，批量转换为同名的docx文件。

pandoc命令：该命令需要安装homebrew install pandoc

```
cd ./docs/vue1;
for file in ./*\.md;
do
    echo $file;
    # 格式：${string//substring/replacement}  使用$replacement, 代替所有匹配的$substring
    # filename=${file//'.md'/''}; # 替换普通文字
    # echo $filename;
    
    # 根据basename函数获取文件名
    filename=$(basename $file);
    echo $filename;
    filenameNoSuffix=$(basename $file .md)
    echo $filenameNoSuffix;
    
    # 执行命令
    echo "pandoc -f markdown -t docx "$file" -o "$filenameNoSuffix".docx";
    pandoc -f markdown -t docx "$file" -o "$filenameNoSuffix".docx
    ## (cd "$dir" && echo '111');
done
```

## Vim

1. 编辑模式
    1. `进入编辑模式`: 在默认模式下按 i/a/o
        * `i` insert，光标到当前位置后。I,当前位置前
        * `a` append，光标到末尾。A，到行首。
        * `o` open a new line，光标在新行后。O，往上新行。
    2. `编辑模式下输入`：
        * ctrl + h，删除字母
        * ctrl + w，删除单词
        * ctrl + u，删除整行
        * ctrl + a, 定位行首（仅terminal）
        * ctr + e，定位行尾（仅terminal）
        * ctrl + U：删除到行头（仅terminal）
        * ctrl + K：删除到行尾（仅terminal）
1. 默认模式
    1. `进入默认模式`: 在非指令模式下按 ESC/ctrl + c/ctrl + [
    1. `默认模式下`
        1. 移动
            * j 下
            * k 上
            * h 左
            * l 右
            * e/E end 移动到下一个单词尾
            * w/W 移动到下一个单词头
            * ^ 移动到行首
            * $ 移动到行尾
        1. 删除
            * dd 删除一行
            * x 删除当前单词
1. 选择模式： 输入v进行选择
1. 指令模式
    1. `进入指令模式`
        * `:w`保存当前文件
        * `:q` 退出编辑,如果文件为保存需要用强制模式
        * `:q!`强制退出不保存修改
        * `:wq`组合指令, 保存并退出
        * `ZZ` 保存并退出。ZZ不需要输入冒号并回车
