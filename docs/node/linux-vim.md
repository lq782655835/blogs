# Linux && Vim

## 目录操作
| 命令名      | 使用举例   | 功能描述     |
| ---        |   ----    | ---        |
| **mkdir**      | mkdir dirname | 创建一个目录 |
| rmdir      | rmdir dirname | 删除一个目录 |
| mvdir      | cp -r sourcedir destdir | 移动或重命名一个目录 |
| **cp**      | mvdir dir1 dir2 | 复制文件夹（-r递归） |
| **rm**      | rm -rf dirname |  删除文件或目录（-r递归 -f强制）
| **cd**      | cd dirname | 改变当前目录 |
| **ls**      | ls -la | 显示当前目录的内容 |
| **pwd**      | pwd | 显示当前目录的路径名 |
| du      | du -ha dirname | 查看目录/文件占用空间大小 |

## 文件操作
| 命令名      | 使用举例   | 功能描述     |
| ---        |   ----    | ---        |
| cat      | cat filename | 显示或连接文件 |
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

## Vim

* `进入编辑模式`: 在默认的"指令模式"下按 i
* `返回指令模式`: 在非指令模式下按 ESC
* 在"指令模式"下输入:
    * `:w`保存当前文件
    * `:q` 退出编辑,如果文件为保存需要用强制模式
    * `:q!`强制退出不保存修改
    * `:wq`组合指令, 保存并退出
    * `ZZ` 保存并退出。ZZ不需要输入冒号并回车
