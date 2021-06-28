(window.webpackJsonp=window.webpackJsonp||[]).push([[238],{746:function(e,t,s){"use strict";s.r(t);var r=s(9),a=Object(r.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"docker-kubernetes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker-kubernetes"}},[e._v("#")]),e._v(" Docker && Kubernetes")]),e._v(" "),s("h2",{attrs:{id:"docker镜像与容器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker镜像与容器"}},[e._v("#")]),e._v(" Docker镜像与容器")]),e._v(" "),s("p",[e._v("Docker 中有两个重要概念。")]),e._v(" "),s("p",[e._v("一个是容器（Container）：容器特别像一个虚拟机，容器中运行着一个完整的操作系统。可以在容器中装 Nodejs，可以执行npm install，可以做一切你当前操作系统能做的事情")]),e._v(" "),s("p",[e._v("另一个是镜像（Image）：镜像是一个文件，它是用来创建容器的。如果你有装过 Windows 操作系统，那么 Docker 镜像特别像“Win7纯净版.rar”文件")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/20181108181808777.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NsZXZlckNvZGU=,size_16,color_FFFFFF,t_70",alt:""}})]),e._v(" "),s("h2",{attrs:{id:"docker流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker流程"}},[e._v("#")]),e._v(" Docker流程")]),e._v(" "),s("p",[e._v("容器运行程序,容器是镜像创建出来,镜像是通过一个 Dockerfile 打包来的，它非常像我们前端的package.json文件.")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("Dockerfile: 类似于“package.json”\n |\n V\nImage: 类似于“Win7纯净版.rar”\n |\n V\nContainer: 一个完整操作系统(实例)\n")])])]),s("ol",[s("li",[e._v("配置Dockerfile文件")])]),e._v(" "),s("p",[e._v("EXPOSE 指令是声明运行时容器提供服务端口，"),s("strong",[e._v("这只是一个声明，在运行时并不会因为这个声明应用就会开启这个端口的服务")]),e._v("。在 Dockerfile 中写入这样的声明有两个好处，一个是帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射；另一个用处则是在运行时使用随机端口映射时，也就是 docker run -P 时，会自动随机映射 EXPOSE 的端口。")]),e._v(" "),s("div",{staticClass:"language-docker extra-class"},[s("pre",{pre:!0,attrs:{class:"language-docker"}},[s("code",[s("span",{pre:!0,attrs:{class:"token instruction"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("FROM")]),e._v(" nginx")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token instruction"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("COPY")]),e._v(" ./index.html /usr/share/nginx/html/index.html")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token instruction"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("EXPOSE")]),e._v(" 80")]),e._v("\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[e._v("打包镜像Image")])]),e._v(" "),s("p",[e._v("Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。")]),e._v(" "),s("div",{staticClass:"language-docker extra-class"},[s("pre",{pre:!0,attrs:{class:"language-docker"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 基于路径./（当前路径）打包一个镜像，镜像的名字是hello-docker，版本号是1.0.0。")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 该命令会自动寻找Dockerfile来打包出一个镜像，在本地")]),e._v("\ndocker image build ./ -t hello-docker:1.0.0\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# docker pull ubunttu # 下载官方已经做好的镜像源到本地")]),e._v("\ndocker image ls # 查看本机打包的镜像列表\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[e._v("运行容器（基于镜像上）")])]),e._v(" "),s("p",[e._v("镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样。")]),e._v(" "),s("p",[e._v("创建基于hello-docker:1.0.0镜像的一个容器。使用-p来指定端口绑定——将容器80端口绑定在宿主机的2333端口。执行完该命令，会返回一个容器ID")]),e._v(" "),s("div",{staticClass:"language-docker extra-class"},[s("pre",{pre:!0,attrs:{class:"language-docker"}},[s("code",[e._v("docker container create -p 2333:80 hello-docker:1.0.0\ndocker container start xxx # xxx 为上一条命令运行得到的结果\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 以上等价于以下一条命令")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# docker run -d -p 2333:80 hello-docker:1.0.0")]),e._v("\n\ndocker containers ls # 查看当前运行的容器\n")])])]),s("h2",{attrs:{id:"docker-cli命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker-cli命令"}},[e._v("#")]),e._v(" Docker-CLI命令")]),e._v(" "),s("p",[e._v("docker image/container命令可以简写，比如docker pull/build命令简写image，docker run简写container")]),e._v(" "),s("div",{staticClass:"language-docker extra-class"},[s("pre",{pre:!0,attrs:{class:"language-docker"}},[s("code",[e._v("docker [image] build -t IMAGE_NAME # 打包本地dockerfile\ndocker [image] pull IMAGE_NAME # 拉取远程docker到本地\ndocker image ls # 查看image列表\ndocker image rm IMAGE_ID # 删除指定image,等价于docker rmi IMAGE_ID\n\ndocker [container] run -d -p 映射端口:容器端口 IMAGE # 实例化化容器\ndocker [container] stop CONTAINER_ID # 停止容器运行\ndocker exec -it CONTAINER_ID bash # 进入指定容器里面，bash是进入命令界面\ndocker container ls # 列出正在跑的container,等价docker ps\ndocker container ls -a # 列出所有实例化的container， -a表示列出所有all\ndocker container rm CONTAINER_ID # 删除实例化容器（正在运行的容器需要先停止才能删除成功）\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 批量处理")]),e._v("\ndocker stop $(docker ps -aq) # 停止所有的container（容器），这样才能够删除其中的images\ndocker rm $(docker ps -aq) # 删除所有container\ndocker rmi -f $(docker images -q) # 强制删除全部image\ndocker system prune # 清除docker无用的对象\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 上传到远程仓库，类似github上传。")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 远程仓库带上你的namespace，如果不带就表示官方仓库，你没有这权限push")]),e._v("\ndocker login\ndocker tag LOCAL_IMAGE:VERSION YOUR_NAMESPACE/LOCAL_IMAGE:VERSION\ndocker push YOUR_NAMESPACE/LOCAL_IMAGE:VERSION\n")])])]),s("h2",{attrs:{id:"dockerfile命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dockerfile命令"}},[e._v("#")]),e._v(" Dockerfile命令")]),e._v(" "),s("div",{staticClass:"language-docker extra-class"},[s("pre",{pre:!0,attrs:{class:"language-docker"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 第一阶段：build")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token instruction"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("FROM")]),e._v(" node:8.9.1 "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("as")]),e._v(" build-stage # FROM：基础镜像")]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token instruction"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("WORKDIR")]),e._v(" /app # WORKDIR：指定docker工作空间，后面可以把.代指/app")]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token instruction"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("COPY")]),e._v(" ./package.json /app/ # COPY：把本机文件拷贝进docker中/app")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token instruction"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("RUN")]),e._v(" npm install # RUN: 执行命令")]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token instruction"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("COPY")]),e._v(" . /app/")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token instruction"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("RUN")]),e._v(" npm run build")]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 第二阶段：部署  # 多阶段构建")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token instruction"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("FROM")]),e._v(" nginx")]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token instruction"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("COPY")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token options"}},[s("span",{pre:!0,attrs:{class:"token property"}},[e._v("--from")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("build-stage")])]),e._v(" /app/dist /usr/share/nginx/html # --from参数，从前一步的dist目录，拷贝到nginx目录下")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token instruction"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("EXPOSE")]),e._v(" 8088")]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v('# CMD ["node", "./app-server"] # CMD：指定默认的容器主进程的启动命令')]),e._v("\n")])])]),s("h3",{attrs:{id:"docker-cmd-vs-entrypoint"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker-cmd-vs-entrypoint"}},[e._v("#")]),e._v(" Docker CMD VS ENTRYPOINT")]),e._v(" "),s("p",[e._v("因为CMD命令很容易被docker run命令的方式覆盖, 所以, 如果你希望你的docker镜像的功能足够灵活, 建议在Dockerfile里调用CMD命令. 比如, 你可能有一个通用的Ruby镜像, 这个镜像启动时默认执行irb (CMD irb).")]),e._v(" "),s("p",[e._v("相反, ENTRYPOINT的作用不同, 如果你希望你的docker镜像只执行一个具体程序, 不希望用户在执行docker run的时候随意覆盖默认程序. 建议用ENTRYPOINT.")]),e._v(" "),s("blockquote",[s("p",[e._v("清除docker无用的对象：docker system prune。清除所有docker image：docker image prune -a")])]),e._v(" "),s("h2",{attrs:{id:"kubernetes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes"}},[e._v("#")]),e._v(" Kubernetes")]),e._v(" "),s("p",[e._v("K8S，就是基于容器的集群管理平台，它的全称，是kubernetes。Kubernetes 是一个可移植的、可扩展的开源平台，用于管理容器化的工作负载和服务，可促进声明式配置和自动化。\nKubernetes 的本质是通过声明式配置对应用进行生命周期管理，具体说是部署和管理（扩缩容、自动恢复、发布）。Kubernetes 为微服务提供了可扩展、高弹性的部署和管理平台。")]),e._v(" "),s("blockquote",[s("p",[e._v("简单说就是容器也要管理，因为docker container多了也要进行管理，k8s是container管理和监控者。")])]),e._v(" "),s("h3",{attrs:{id:"_1-pod-deploy-核心"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-pod-deploy-核心"}},[e._v("#")]),e._v(" 1. Pod/Deploy（核心）")]),e._v(" "),s("p",[e._v("pod是最基本资源，把docker container放在里面运行；rc监控pod；service是个中介者，对外提供服务，对内连接pod。")]),e._v(" "),s("ul",[s("li",[e._v("pod是基本操作单元，也是应用运行的载体。整个k8s都是围绕着pod展开，比如如何部署运行pod，如何保证pod的数量，如何访问pod等。")]),e._v(" "),s("li",[e._v("Deployment定义了pod部署的信息")]),e._v(" "),s("li",[e._v("若干pod副本（副本是一个pod的多个实例）组成service，对外提供服务")])]),e._v(" "),s("p",[s("code",[e._v("Pod配置必需设置image，可选：注入env数据、启动命令command")]),e._v("。")]),e._v(" "),s("div",{staticClass:"language-docker extra-class"},[s("pre",{pre:!0,attrs:{class:"language-docker"}},[s("code",[e._v("kubectl run k8s-name --image=docker-image --port 8080 # 使用k8s建立pod，pod包含指定docker image\nkubectl get pods\nkubectl get rc\nkubectl scale rc k8s-name --replicas=3 # 扩充pod到3个，3个服务支持（负载均衡）\n\nkubectl expose rc k8s-name # 为前面创建的rc，对外提供service\nkubectl get services\n")])])]),s("blockquote",[s("p",[e._v("kubectl是管理k8s集群的cli工具")])]),e._v(" "),s("h3",{attrs:{id:"_2-services-服务"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-services-服务"}},[e._v("#")]),e._v(" 2. "),s("a",{attrs:{href:"https://kubernetes.io/zh/docs/concepts/services-networking/service/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Services"),s("OutboundLink")],1),e._v("(服务)")]),e._v(" "),s("p",[e._v("Services为Pods提供自己的IP地址和一组Pod的单个DNS名称，并且可以在它们之间进行负载平衡。")]),e._v(" "),s("p",[e._v("前面虽然创建了 Pod，但是在 kubernetes 中，Pod 的 IP 地址会随着 Pod 的重启而变化，并不建议直接拿 Pod 的 IP 来交互。那如何来访问这些 Pod 提供的服务呢？使用 Service。Service 为一组 Pod（通过 labels 来选择）提供一个统一的入口，并为它们提供负载均衡和自动服务发现。")]),e._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Service： kubectl -n kubeflow get svc deep-fed-platform -o yaml")]),e._v("\nName"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("              deep-fed-platform\nNamespace"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("         kubeflow\nLabels"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("            <none>\nAnnotations"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("       <none>\nSelector"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("          name=deep-fed-platform # 匹配的pod\nType"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("              ClusterIP\nIP"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("                "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("10.178")]),e._v("."),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("5.190")]),e._v("\nPort"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("              <unset>  "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("80")]),e._v("/TCP\nTargetPort"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("        "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("80")]),e._v("/TCP\nEndpoints"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("10.177")]),e._v("."),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("10.6")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("80")]),e._v("\nSession Affinity"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("  None\nEvents"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("            <none>\n")])])]),s("h3",{attrs:{id:"_3-virtualservice"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-virtualservice"}},[e._v("#")]),e._v(" 3. VirtualService")]),e._v(" "),s("p",[e._v("VirtualService 是流量控制的核心组件，起着承上（Gateway）启下（DestinationRule）的作用。")]),e._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// VirtualService:kubectl -n kubeflow describe vs deep-fed-platform")]),e._v("\nName"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("         deep-fed-platform\nNamespace"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("    kubeflow\nLabels"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("       app.kubernetes.io/component=deep-fed-platform\n              app.kubernetes.io/instance=deep-fed-platform-v0."),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("7.0")]),e._v("\n              app.kubernetes.io/managed-by=kfctl\n              app.kubernetes.io/name=deep-fed-platform\n              app.kubernetes.io/part-of=kubeflow\n              app.kubernetes.io/version=v0."),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("7.0")]),e._v("\nAnnotations"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("  <none>\nAPI Version"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("  networking.istio.io/v1alpha3\nKind"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("         VirtualService\nSpec"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("\n  Gateways"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("\n    kubeflow-gateway\n  Hosts"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 网站匹配规则")]),e._v("\n    *\n  Http"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("\n    Match"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 匹配的path")]),e._v("\n      Uri"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("\n        Prefix"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("  /\n    Rewrite"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("\n      Uri"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("  /\n    Route"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("\n      Destination"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 目标流量，以下是在services上")]),e._v("\n        Host"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("  deep-fed-platform.kubeflow.svc.cluster.local # DNS 模式\n        Port"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("\n          Number"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v("  "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("80")]),e._v("\n")])])]),s("h3",{attrs:{id:"_4-volumes-存储"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-volumes-存储"}},[e._v("#")]),e._v(" 4. "),s("a",{attrs:{href:"https://kubernetes.io/zh/docs/concepts/storage/volumes/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Volumes"),s("OutboundLink")],1),e._v("(存储)")]),e._v(" "),s("p",[e._v("容器中的文件在磁盘上是临时存放的，这给容器中运行的特殊应用程序带来一些问题。 首先，当容器崩溃时，kubelet 将重新启动容器，容器中的文件将会丢失——因为容器会以干净的状态重建。 其次，当在一个 Pod 中同时运行多个容器时，常常需要在这些容器之间共享文件。 Kubernetes 抽象出 Volume 对象来解决这两个问题。")]),e._v(" "),s("p",[e._v("使用卷时, Pod 声明中需要提供卷的类型 (.spec.volumes 字段)和卷挂载的位置 (.spec.containers.volumeMounts 字段).")]),e._v(" "),s("h3",{attrs:{id:"_5-kubernetes-operator"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-kubernetes-operator"}},[e._v("#")]),e._v(" 5. Kubernetes Operator")]),e._v(" "),s("p",[e._v("基于k8s上层进行的扩展。扩展的核心是"),s("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/67567555",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kubernetes Operator"),s("OutboundLink")],1),e._v("`。")]),e._v(" "),s("blockquote",[s("p",[e._v("label/selector标签匹配")])]),e._v(" "),s("h2",{attrs:{id:"参考文章"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[e._v("#")]),e._v(" 参考文章")]),e._v(" "),s("ul",[s("li",[e._v("https://docs.docker.com/get-started/part2/")]),e._v(" "),s("li",[e._v("https://zhuanlan.zhihu.com/p/83309276?utm_medium=social&utm_source=wechat_session")]),e._v(" "),s("li",[e._v("https://www.youtube.com/watch?v=wnKyJKqKiVE k8s入门视频，推荐")]),e._v(" "),s("li",[e._v("https://kubernetes.io/docs/setup/learning-environment/minikube/")]),e._v(" "),s("li",[e._v("https://linuxize.com/post/how-to-remove-docker-images-containers-volumes-and-networks/")])])])}),[],!1,null,null,null);t.default=a.exports}}]);