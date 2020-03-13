# Docker && Kubernetes

## Docker镜像与容器

Docker 中有两个重要概念。

一个是容器（Container）：容器特别像一个虚拟机，容器中运行着一个完整的操作系统。可以在容器中装 Nodejs，可以执行npm install，可以做一切你当前操作系统能做的事情

另一个是镜像（Image）：镜像是一个文件，它是用来创建容器的。如果你有装过 Windows 操作系统，那么 Docker 镜像特别像“Win7纯净版.rar”文件

![](https://img-blog.csdnimg.cn/20181108181808777.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NsZXZlckNvZGU=,size_16,color_FFFFFF,t_70)

## Docker流程

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

## Docker-CLI命令

docker image/container命令可以简写，比如docker pull/build命令简写image，docker run简写container

``` docker
docker [image] build -t IMAGE_NAME # 打包本地dockerfile
docker [image] pull IMAGE_NAME # 拉取远程docker到本地
docker image ls # 查看image列表
docker image rm IMAGE_ID # 删除指定image,等价于docker rmi IMAGE_ID

docker [container] run -d -p 映射端口:容器端口 IMAGE # 实例化化容器
docker [container] stop CONTAINER_ID # 停止容器运行
docker exec -it CONTAINER_ID bash # 进入指定容器里面，bash是进入命令界面
docker container ls # 列出正在跑的container,等价docker ps
docker container ls -a # 列出所有实例化的container， -a表示列出所有all
docker container rm CONTAINER_ID # 删除实例化容器（正在运行的容器需要先停止才能删除成功）

# 批量处理
docker stop $(docker ps -aq) # 停止所有的container（容器），这样才能够删除其中的images
docker rm $(docker ps -aq) # 删除所有container
docker rmi -f $(docker images -q) # 强制删除全部image
docker system prune # 清除docker无用的对象

# 上传到远程仓库，类似github上传。
# 远程仓库带上你的namespace，如果不带就表示官方仓库，你没有这权限push
docker login
docker tag LOCAL_IMAGE:VERSION YOUR_NAMESPACE/LOCAL_IMAGE:VERSION
docker push YOUR_NAMESPACE/LOCAL_IMAGE:VERSION
```

## Dockerfile命令

``` docker
# 第一阶段：build
FROM node:8.9.1 as build-stage # FROM：基础镜像

WORKDIR /app # WORKDIR：指定docker工作空间，后面可以把.代指/app

COPY ./package.json /app/ # COPY：把本机文件拷贝进docker中/app
RUN npm install # RUN: 执行命令

COPY . /app/
RUN npm run build

# 第二阶段：部署  # 多阶段构建
FROM nginx

COPY --from=build-stage /app/dist /usr/share/nginx/html # --from参数，从前一步的dist目录，拷贝到nginx目录下
EXPOSE 8088

# CMD ["node", "./app-server"] # CMD：指定默认的容器主进程的启动命令
```

### Docker CMD VS ENTRYPOINT

因为CMD命令很容易被docker run命令的方式覆盖, 所以, 如果你希望你的docker镜像的功能足够灵活, 建议在Dockerfile里调用CMD命令. 比如, 你可能有一个通用的Ruby镜像, 这个镜像启动时默认执行irb (CMD irb).

相反, ENTRYPOINT的作用不同, 如果你希望你的docker镜像只执行一个具体程序, 不希望用户在执行docker run的时候随意覆盖默认程序. 建议用ENTRYPOINT.

> 清除docker无用的对象：docker system prune。清除所有docker image：docker image prune -a

## Kubernetes

K8S，就是基于容器的集群管理平台，它的全称，是kubernetes。Kubernetes 是一个可移植的、可扩展的开源平台，用于管理容器化的工作负载和服务，可促进声明式配置和自动化。
Kubernetes 的本质是通过声明式配置对应用进行生命周期管理，具体说是部署和管理（扩缩容、自动恢复、发布）。Kubernetes 为微服务提供了可扩展、高弹性的部署和管理平台。

> 简单说就是容器也要管理，因为docker container多了也要进行管理，k8s是container管理和监控者。

### 1. Pod/Deploy（核心）

pod是最基本资源，把docker container放在里面运行；rc监控pod；service是个中介者，对外提供服务，对内连接pod。
* pod是基本操作单元，也是应用运行的载体。整个k8s都是围绕着pod展开，比如如何部署运行pod，如何保证pod的数量，如何访问pod等。
* Deployment定义了pod部署的信息
* 若干pod副本（副本是一个pod的多个实例）组成service，对外提供服务

`Pod配置必需设置image，可选：注入env数据、启动命令command`。

``` docker
kubectl run k8s-name --image=docker-image --port 8080 # 使用k8s建立pod，pod包含指定docker image
kubectl get pods
kubectl get rc
kubectl scale rc k8s-name --replicas=3 # 扩充pod到3个，3个服务支持（负载均衡）

kubectl expose rc k8s-name # 为前面创建的rc，对外提供service
kubectl get services
```

> kubectl是管理k8s集群的cli工具

### 2. [Services](https://kubernetes.io/zh/docs/concepts/services-networking/service/)(服务)

Services为Pods提供自己的IP地址和一组Pod的单个DNS名称，并且可以在它们之间进行负载平衡。

前面虽然创建了 Pod，但是在 kubernetes 中，Pod 的 IP 地址会随着 Pod 的重启而变化，并不建议直接拿 Pod 的 IP 来交互。那如何来访问这些 Pod 提供的服务呢？使用 Service。Service 为一组 Pod（通过 labels 来选择）提供一个统一的入口，并为它们提供负载均衡和自动服务发现。

``` json
// Service： kubectl -n kubeflow get svc deep-fed-platform -o yaml
Name:              deep-fed-platform
Namespace:         kubeflow
Labels:            <none>
Annotations:       <none>
Selector:          name=deep-fed-platform # 匹配的pod
Type:              ClusterIP
IP:                10.178.5.190
Port:              <unset>  80/TCP
TargetPort:        80/TCP
Endpoints:         10.177.10.6:80
Session Affinity:  None
Events:            <none>
```

### 3. VirtualService

VirtualService 是流量控制的核心组件，起着承上（Gateway）启下（DestinationRule）的作用。

``` json
// VirtualService:kubectl -n kubeflow describe vs deep-fed-platform
Name:         deep-fed-platform
Namespace:    kubeflow
Labels:       app.kubernetes.io/component=deep-fed-platform
              app.kubernetes.io/instance=deep-fed-platform-v0.7.0
              app.kubernetes.io/managed-by=kfctl
              app.kubernetes.io/name=deep-fed-platform
              app.kubernetes.io/part-of=kubeflow
              app.kubernetes.io/version=v0.7.0
Annotations:  <none>
API Version:  networking.istio.io/v1alpha3
Kind:         VirtualService
Spec:
  Gateways:
    kubeflow-gateway
  Hosts: // 网站匹配规则
    *
  Http:
    Match: // 匹配的path
      Uri:
        Prefix:  /
    Rewrite:
      Uri:  /
    Route:
      Destination: // 目标流量，以下是在services上
        Host:  deep-fed-platform.kubeflow.svc.cluster.local # DNS 模式
        Port:
          Number:  80
```

### 4. [Volumes](https://kubernetes.io/zh/docs/concepts/storage/volumes/)(存储)

容器中的文件在磁盘上是临时存放的，这给容器中运行的特殊应用程序带来一些问题。 首先，当容器崩溃时，kubelet 将重新启动容器，容器中的文件将会丢失——因为容器会以干净的状态重建。 其次，当在一个 Pod 中同时运行多个容器时，常常需要在这些容器之间共享文件。 Kubernetes 抽象出 Volume 对象来解决这两个问题。

使用卷时, Pod 声明中需要提供卷的类型 (.spec.volumes 字段)和卷挂载的位置 (.spec.containers.volumeMounts 字段).

### 5. Kubernetes Operator

基于k8s上层进行的扩展。扩展的核心是[Kubernetes Operator](https://zhuanlan.zhihu.com/p/67567555)`。

> label/selector标签匹配

## 参考文章

* https://docs.docker.com/get-started/part2/
* https://zhuanlan.zhihu.com/p/83309276?utm_medium=social&utm_source=wechat_session
* https://www.youtube.com/watch?v=wnKyJKqKiVE k8s入门视频，推荐
* https://kubernetes.io/docs/setup/learning-environment/minikube/
* https://linuxize.com/post/how-to-remove-docker-images-containers-volumes-and-networks/