# Docker

## 镜像与容器

Docker 中有两个重要概念。

一个是容器（Container）：容器特别像一个虚拟机，容器中运行着一个完整的操作系统。可以在容器中装 Nodejs，可以执行npm install，可以做一切你当前操作系统能做的事情

另一个是镜像（Image）：镜像是一个文件，它是用来创建容器的。如果你有装过 Windows 操作系统，那么 Docker 镜像特别像“Win7纯净版.rar”文件

![](https://img-blog.csdnimg.cn/20181108181808777.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NsZXZlckNvZGU=,size_16,color_FFFFFF,t_70)

## 流程

容器运行程序,容器是镜像创建出来,镜像是通过一个 Dockerfile 打包来的，它非常像我们前端的package.json文件.

```
Dockerfile: 类似于“package.json”
 |
 V
Image: 类似于“Win7纯净版.rar”
 |
 V
Container: 一个完整操作系统(实例)
```

1. 配置Dockerfile文件

EXPOSE 指令是声明运行时容器提供服务端口，**这只是一个声明，在运行时并不会因为这个声明应用就会开启这个端口的服务**。在 Dockerfile 中写入这样的声明有两个好处，一个是帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射；另一个用处则是在运行时使用随机端口映射时，也就是 docker run -P 时，会自动随机映射 EXPOSE 的端口。

``` docker
FROM nginx
COPY ./index.html /usr/share/nginx/html/index.html
EXPOSE 80
```

2. 打包镜像Image

Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。

``` docker
# 基于路径./（当前路径）打包一个镜像，镜像的名字是hello-docker，版本号是1.0.0。
# 该命令会自动寻找Dockerfile来打包出一个镜像，在本地
docker image build ./ -t hello-docker:1.0.0

# docker pull ubunttu # 下载官方已经做好的镜像源到本地
docker image ls # 查看本机打包的镜像列表
```

3. 运行容器（基于镜像上）

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样。

创建基于hello-docker:1.0.0镜像的一个容器。使用-p来指定端口绑定——将容器80端口绑定在宿主机的2333端口。执行完该命令，会返回一个容器ID

``` docker
docker container create -p 2333:80 hello-docker:1.0.0
docker container start xxx # xxx 为上一条命令运行得到的结果
# 以上等价于以下一条命令
# docker run -d -p 2333:80 hello-docker:1.0.0

docker containers ls # 查看当前运行的容器
```

常用docker命令：

docker image/container命令可以简写，比如docker pull/build命令简写image，docker run简写container

``` docker
docker [image] build IMAGE_NAME # 打包本地dockerfile
docker [image] pull IMAGE_NAME # 拉取远程docker到本地
docker image ls # 查看image列表
docker image rm IMAGE_ID # 删除指定image

docker [container] run -d -p 映射端口:容器端口 IMAGE # 实例化化容器
docker [container] stop CONTAINER_ID # 停止容器运行
docker exec -it CONTAINER_ID bash # 进入指定容器里面，bash是进入命令界面
docker container ls # 列出正在跑的container 等价docker ps
docker container ls -a # 列出所有实例化的container， -a表示列出所有all
docker container rm CONTAINER_ID # 删除实例化容器（正在运行的容器需要先停止才能删除成功）


docker login
# 上传到远程仓库，类似github上传。
# 远程仓库带上你的namespace，如果不带就表示官方仓库，你没有这权限push
docker tag LOCAL_IMAGE:VERSION YOUR_NAMESPACE/LOCAL_IMAGE:VERSION
docker push YOUR_NAMESPACE/LOCAL_IMAGE:VERSION
```

## 参考文章

* https://docs.docker.com/get-started/part2/
* https://zhuanlan.zhihu.com/p/83309276?utm_medium=social&utm_source=wechat_session