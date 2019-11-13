# 深度学习入门

机器学习是实现人工智能的方法，深度学习是实现机器学习算法的技术。

1. [基础概念](#1-基础概念)
    1. [总体流程](#11-总体流程)
    1. [算法模型](#12-算法模型)
    1. [神经网络详解](#13-神经网络详解)
        1. [神经元概念](#131-神经元的几个概念)
        1. [神经网络训练过程](#132-神经网络训练过程)
    1. [深度学习进展](#14-深度学习进展)
2. [Netease 深度学习流程](#2-netease-深度学习流程)
3. [Netease AI深度学习平台 V1.0架构](#3-netease-ai深度学习平台-v10架构)
    1. [slurm](#31-slurm)
    1. [conda](#32-conda)
    1. [分布式训练系统](#33-分布式训练系统)
        1. [分布式训练策略](#331-分布式训练策略)
        1. [分布式训练架构 - PS](#332-分布式训练架构---ps)
        1. [基于PS的分布式TensorFlow](#333-基于ps的分布式tensorflow)
4. [Netease AI深度学习平台 V2.0架构](#4-netease-ai深度学习平台-v20架构)
    1. [Kubernetes](#41-kubernetes)
    1. [Istio](#42-istio)
        1. [Service Mesh概念](#421-service-mesh概念)
        1. [Grafana](#422-grafana)
    1. [kubeflow](#43-kubeflow)
        1. [tf-operator](#431-tf-operator)
        1. [jupyter](#432-jupyter)
5. [AI框架](#5-ai框架)
    1. [Tensorflow](#51-tensorflow)
    1. PyTouch

## 1. 基础概念

**模型（Model）：从输入（特征）到输出（标签）的映射方法。**

**训练（Train）：通过对样本数据的拟合，确定出模型中参数，让模型在新的数据集上有好的表现。**

### 1.1 总体流程

1. 数据处理（采集 + 处理（如音频的去噪））
1. 模型训练（特征（算法选择） + 训练）
1. 模型评估与优化（MSE、AUC+调参）
1. 模型应用（部署 + A/B测试）

### 1.2 算法模型

* `神经网络`。最常见，由多个神经元（它接受多个输入（x1，x2，x3…），产生一个输出（output））组成神经网络。常见的神经网络：
    * DNN：深度神经网络
    * CNN：卷积神经网络（计算机视觉）
    * RNN：循环神经网络（自然语言处理）
    * GAN：对抗神经网络（模仿）
* 朴素贝叶斯。给定的待分类项，求解在此项出现的情况下其他各个类别出现的概率。典型案例：垃圾分类
* KNN
* SVM
* 聚类
* 自动编码器

### 1.3 神经网络详解

#### 1.3.1 神经元的几个概念：

* 特征、权重、激活函数
* 损失函数

举个例子：
假设你买房子，考虑房屋面积、房屋价格、社区评分三个要素（特征），其权重分别为0.4，0.6，0.5。
当有A楼房屋面积3星，房屋价格1星，社区评分2星。所以其加权值：0.4*3+0.6*1+0.5*2=2.8。假设激活函数是count/10（此时激活函数是第一层），则最终输出：2.8/10=0.28。

当还有一个决策人时，如你女朋友（此时又多一个神经元），她觉得权重是0.3，0.2，0.1，则最终输出：（3*0.3+1*0.2+2*0.1）/10=0.13。

此时需要在两个人基础上（神经网络），再叠加一个激活函数，以算出最终的值。

![image](https://user-images.githubusercontent.com/6310131/68285115-a5460280-00b9-11ea-9fff-18f9ceee4677.png)

![image](https://user-images.githubusercontent.com/6310131/68285914-218d1580-00bb-11ea-9f00-c335f524b214.png)

#### 1.3.2 神经网络训练过程

简单说，神经元训练就是给你一个输入x，当通过某个模型f时，得到结果y，即`y = f(x)`。

以上是泛化说法，当需要去实现模型时，有诸多步骤，但总的结果公式不变：`y = f(x) = wx + b`。其中输入数据`x`可能是多向量纬度的（比如你买房考虑3个因素，再比如图像分类时，可能以像素通道为单位，如32长*32宽*3通道），对应的`w`也要是多向量维度（比如权重），而`b`是个常量，通过一定的激活函数（比如买房就是向量x * 向量w加权平均）就能得到最终的结果`y`（有方法可以把多维计算结果，映射转换成唯一值）。

通过以上我们知道，神经网络训练过程：
1. `随机生成w和b`。就像每个买房人初始权重都不清楚，先随机，再训练过程中再不断优化这两个值（就像现实生活中看别人的数据）
1. 通过某些模型算法选择（激活函数），`得到y值，再计算损失函数`。
1. `迭代修改w和b的值`，为的是下次计算时，损失函数结果更小。
1. `经过大量的训练(一般会有指定次数的训练)，使得w和b确定下来`（即模型确定），对其他类似数据有更好的准确性（已经找到了特征规律）。
1. 模型在训练集训练完，在`测试集也有较好表现`。
1. `对外导出模型，封装成服务`（如被java包装或tfserving）对外提供。

> 注意区分模型算法和模型的区别，一般对应用输出的是训练好的模型。在开发过程中会用到许多科学家已经发明的模型算法。

![image](https://user-images.githubusercontent.com/6310131/68456999-2926f880-023a-11ea-9aa0-98537348f9c9.png)

### 1.4 深度学习进展

* 图像分类，CNN卷积神经网络
* 机器翻译，RNN循环神经网络
* 图像生成

推荐视频，了解AI：
* https://www.imooc.com/learn/1063
* https://www.youtube.com/watch?v=GmjiSAfHplQ&list=PLsYXQooxlb1rByOhOJ1Sp1gI8JSvNregB&index=3

## 2. Netease 深度学习流程

1. 训练模型
    1. 数据收集和清洗
        1. 上传到集群 hadoop hdf共享存储地址
        1. [数据预处理](https://dl.netease.com/docs/tutorials/bert_named_entity_recognition/bert_named_entity_recognition.html#%E6%95%B0%E6%8D%AE%E7%9A%84%E9%A2%84%E5%A4%84%E7%90%86)，集群分布式处理能力
    2. 模型训练
        1. 写好代码，提交任务
            * 单机/单机集群，都是生成单个进程任务。
            * 多机任务（分布式）则数据并行，训练时读取不同的数据，然后计算梯度，各进程计算完梯度后进行同步（合并），使用合并后的梯度更新所有进程的参数，进行下一轮迭代。
        ![](https://dl.netease.com/docs/assets/img/data_parallel.818a0fae.png)
        1. 训练（日志存储产出 + dashboard查看）
        1. [模型存储](https://dl.netease.com/docs/tutorials/short_video_classification/short_video_classification.html#%E6%A8%A1%E5%9E%8B%E5%AD%98%E5%82%A8)
        > 所以在编写分布式训练程序时，需要在单卡训练程序的基础上，重写数据和梯度合并部分（意味着需要改源代码）。
    3. 模型测试
        1. 加载已训练好的模型，基于数据集进行结果测试。
    4. 评测和优化
1. 模型部署上线 + 对外提供服务
    * 使用tf serving/docker部署模型并对外提供服务

### 在线实例

* pytouch手写字识别案例：https://github.com/pytorch/examples/blob/master/mnist/main.py
* pytouch训练分类案例：https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html#sphx-glr-beginner-blitz-cifar10-tutorial-py
    * 在线可运行代码：https://colab.research.google.com/github/pytorch/tutorials/blob/gh-pages/_downloads/cifar10_tutorial.ipynb#scrollTo=t6J5B3xw0vUC
* 空间转换案例：https://colab.research.google.com/github/pytorch/tutorials/blob/gh-pages/_downloads/spatial_transformer_tutorial.ipynb#scrollTo=WvmgjenBxkic

## 3. Netease AI深度学习平台 V1.0架构

Netease AI深度学习平台，旨在简化算法工程师的工作，把机器学习过程中繁琐的存储、环境配置、分布式训练、部署等过程都进行内部包装。通过基础建设（存储、网络等）以及平台搭建，`提供模型在线编写、模型训练、可视化调优、模型保存以及一键部署等整体流程`。中间涉及到很多概念，包括`如何打通内部网络存储、如何分布式训练模型、如何对机器资源管理`等。

V1.0 基于`slurm + conda`。使用slurm分配计算机资源和维护Job，conda则提供python环境。

### 3.1 slurm

slurm是一种可用于大型计算节点集群的高度可伸缩和容错的`集群管理器和作业调度系统`。SLURM 维护着一个待处理工作的队列并管理此工作的整体资源利用。SLURM 会为任务队列合理地分配资源，并监视作业至其完成。

> slurm分配集群计算机资源，开启job，跑模型训练。

### 3.2 conda

[conda](https://medium.com/python4u/%E7%94%A8conda%E5%BB%BA%E7%AB%8B%E5%8F%8A%E7%AE%A1%E7%90%86python%E8%99%9B%E6%93%AC%E7%92%B0%E5%A2%83-b61fd2a76566) 是一个开源的跨平台工具软件。使用conda時，你可以進行建立(create)、輸出(export)、列表(list)、移除(remove)和更新(update)環境於不同Python版本及Packages，同時也可以分享你的虛擬環境。

> 可以理解为nvm一样的作用，管理node版本以及环境。而conda管理着python版本和环境。

### 3.3 分布式训练系统

#### 3.3.1 分布式训练策略

`模型并行`:指的是将模型部署到很多设备上（设备可能分布在不同机器上，下同）运行。实际上层与层之间的运行是存在约束的：前向运算时，后面的层需要等待前面层的输出作为输入，而在反向传播时，前面的层又要受限于后面层的计算结果。所以除非模型本身很大，**一般不会采用模型并行**，因为模型层与层之间存在串行逻辑。

`数据并行`(常采用的策略)：数据并行就是在很多设备上放置相同的模型，并且各个设备采用不同的训练样本对模型训练。训练深度学习模型常采用的是batch SGD方法，采用数据并行，可以每个设备都训练不同的batch，然后收集这些梯度用于模型参数更新。

数据并行又分同步和异步，Netease AI目前主要使用数据并行同步。`所谓同步指的是所有的设备都是采用相同的模型参数来训练，等待所有设备的mini-batch训练完成后，收集它们的梯度然后取均值，然后执行模型的一次参数更新。`

#### 3.3.2 分布式训练架构 - PS

这里讲下分布式训练具体实现，即架构方案。目前使用`经典的PS（Parameter server architecture）架构`。

在Parameter server架构（PS架构）中，集群中的节点被分为两类：parameter server和worker。其中parameter server存放模型的参数，而worker负责计算参数的梯度。在每个迭代过程，worker从parameter sever中获得参数，然后将计算的梯度返回给parameter server，parameter server聚合从worker传回的梯度，然后更新参数，并将新的参数广播给worker。采用同步SGD方式的PS架构如下图所示：

![](https://pic2.zhimg.com/80/v2-eaa0cc1152eea0c99471595499b1d3b9_hd.jpg)

> 多台机器组合成集群cluster，ps-worker架构就是一部分机器作为ps节点，一部分机器作为worker。

#### 3.3.3 基于PS的分布式TensorFlow

在分布式TensorFlow中，参与分布式系统的所有节点或者设备统称为一个Cluster，一个Cluster中包含很多Server，每个Server去执行一项Task，Server和Task是一一对应的。所以，Cluster可以看成是Server的集合，也可以看成是Task的集合，TensorFlow为各个Task又增加了一个抽象层，`将一系列相似的Task集合称为一个Job`。

对于PS架构，Parameter Server的Task集合为ps(即`job类型为ps`)，而执行梯度计算的Task集合为worker(即`job类型为worker`)。

## 4. Netease AI深度学习平台 V2.0架构

底层基于`Docker + Kubernetes`，内部服务治理(众多的服务管理、限流等)使用`Istio`，顶层应用使用开源`Kubeflow`。

### 4.1 Kubernetes

kubernetes 容器化编排工具（docker是容器化基础）。`k8s可以很方便的对机器资源进行管理和扩容`，其特性有：
* 方便的容器升级（修改yaml配置，自动更新替换）
* 提供容器的自动化复制和部署（随时扩展容器规模），同时支持负载均衡

Pod：
* pod是基本操作单元，也是应用运行的载体。整个k8s都是围绕着pod展开，比如如何部署运行pod，如何保证pod的数量，如何访问pod等。
* Deployment定义了pod部署的信息
* 若干pod副本（副本是一个pod的多个实例）组成service，对外提供服务

Deployment:
```yaml
apiVersion: extensions/v1beta1
kind: Deployment # 类型
metadata:
  labels:
    app.kubernetes.io/name: job-dashboard-frontend
  name: job-dashboard-frontend
  namespace: kubeflow
spec:
  replicas: 1 # 多少副本
  selector:
    matchLabels:
      app.kubernetes.io/name: job-dashboard-frontend
  template:
    metadata:
      labels:
        app.kubernetes.io/name: job-dashboard-frontend
        name: job-dashboard-frontend
    spec:
      containers:
      - image: hub.cn-east-p1.netease.com/deeplearning/job-frontend:0.1 # pod内容器镜像地址
        name: job-dashboard-frontend
        ports:
        - containerPort: 80
          protocol: TCP
        resources: {}
      serviceAccount: tf-job-dashboard
      serviceAccountName: tf-job-dashboard
```

Service：
``` yaml
apiVersion: v1
kind: Service # 类型
metadata:
  labels:
    app.kubernetes.io/name: job-dashboard-frontend
  name: job-dashboard-frontend
  namespace: kubeflow
spec:
  ports:
  - port: 80 #
    protocol: TCP
    targetPort: 80
  selector: # 选择哪些pod组成service
    app.kubernetes.io/name: job-dashboard-frontend
    name: job-dashboard-frontend
  type: ClusterIP
```

命令一览：

``` docker
# deployments -n代表指定命名空间
kubectl create -f xxx.yaml -n kubeflow # 创建deploy
kubectl get deploy -n kubeflow # 获取在跑的deploy
kubectl edit deploy xxx -n kubeflow # 修改deploy配置
kubectl delete -f xxx.yarm # 删除deploy

# service
kubectl create -f service.yaml # 创建service
kubectl get service --all-namespace # 查看service

# pod
kubectl get pods -n kubeflow # 修改完后查看pods状态
kubectl exec xxx bash -n kubeflow # 进入pod中的container
```

推荐视频，了解k8s：https://www.imooc.com/video/19149

* k8s快速部署：https://g.hz.netease.com/cloud_ml/documents/blob/master/design_docs/deployment/kubernetes/developer_guide.md

### 4.2 Istio

`Istio 被称为 Service Mesh 架构`,是一个完全开源的服务网格。

Istio 提供一种简单的方式来为已部署的服务建立网络，该网络具有负载均衡、服务间认证、监控等功能，只需要对服务的代码进行一点或不需要做任何改动。想要让服务支持 Istio，只需要在您的环境中部署一个特殊的 sidecar 代理，使用 Istio 控制平面功能配置和管理代理，拦截微服务之间的所有网络通信。

`直白点就是做业务之外的管控（服务治理核心）`，核心功能：
1. `流量管理`。通过简单的规则配置和流量路由，您可以控制服务之间的流量和 API 调用。
    * 负载均衡
    * 动态路由
    * 灰度发布
    * 故障注入
1. `安全`。专注于应用程序级别的安全性，与 Kubernetes结合优势更大。
    * 认证
    * 鉴权
1. `可观察`。强大的追踪、监控和日志记录可让您深入了解服务网格部署。
    * 调用链
    * 访问日志
    * 监控
1. 平台支持。独立于平台的，可运行在各种环境中。
1. 集成和定制。组件可以扩展和定制

Istio 以一个项目（Pod）的形式部署到 Kubernetes 集群中。我们可以看到，部署好的 pods 中，除了有 istio-citadel、istio-egressgateway、istio-ingressgateway、istio-pilot 等 Istio 本身的功能组件，还集成了微服务相关的监控工具，如：grafana、jaeger-agent、kiali、prometheus。正是这些功能丰富且强大的监控工具，帮助 Istio 实现了微服务的可视化管理。

#### 4.2.1 Service Mesh概念

Service Mesh 通常是通过一组轻量级网络代理（Sidecar proxy），与应用程序代码部署在一起来实现，且对应用程序透明。

个人理解，传统软件除应用开发外，还需要耦合一些限流、熔断等处理。此时就有了Sidecar模式的兴起：Sidecar(有时会叫做agent) 在原有的客户端和服务端之间加多了一个代理, 为应用程序提供的额外的功能, 如服务发现, 路由代理, 认证授权, 链路跟踪 等等。随着微服务的发展，需要把Sidecar升级为Service Mesh。Service Mesh不再将Sidecar(代理)视为单独的组件，而是强调由这些代理连接而形成的网络。

更多可查看：https://tencentcloudcontainerteam.github.io/2019/01/31/servicemesh-istio/

> 关系：Service Mesh是概念，Istio是Service Mesh实践架构，为的是服务治理。而微服务是服务治理不可或缺的。

#### 4.2.2 Grafana

Istio 的工具集：Grafana。Grafana 是一个非常著名的开源项目。它是一个 Web 应用，可以提供丰富的监控仪表盘。它的后端支持 graphite、 InfluxDB 或 opentsdb。

> 监控框架Prometheus也常用到Grafana工具，来进行优美的数据展示。

### 4.3 kubeflow

kubeflow是针对机器学习领域，在k8s基础上搭建的深度学习平台（可理解为社区版深度学习平台）。kubernetes只是底层资源（如硬件的机器CPU/内存、软件的service服务）管理，而上层算法工程师需要简单化的使用平台，来进行深度学习模型的编写、训练、调试、部署等。

V2.0架构中，平台基础组件以及UI复用了部分kubeflow组件，这样在跟进社区进度的同时，也能自定义开发符合内部需求的组件。目前主要采用社区以下组件：

1. tf-operator：管理tensorflow job任务信息
1. jupyter（nodebook server）： 书写代码在线工具，以及提交job任务

#### 4.3.1 tf-operator

tf-operator 为 tensorflow 提供了 TFJob 资源，以满足 tensorflow 分布式训练的资源和拓扑需求，最终达到一键拉起分布式机器学习集群的效果。

简单理解，tf-operator 就是让用户在 K8S 集群上部署训练tensorflow任务更加方便和简单。

#### 4.3.2 jupyter

jupyter是一个工具，安装后可快速启动一个本地的服务器，帮助运行python代码。

## 5. AI框架

![](https://img-blog.csdnimg.cn/20181108111104813.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpNTI4NDA1MTc2,size_16,color_FFFFFF,t_70)

### 5.1 Tensorflow

TensorFlow 是一个端到端开源机器学习平台。个人理解，通过提供tensorflow python包以及它提供的API，可以进行模型的制作。tensorflow快速开始深度学习：http://www.tensorfly.cn/tfdoc/api_docs/SOURCE/tutorials/mnist_pros.html

* 社区繁华
* 可扩展性好，支持分布式，可以扩展至多机多卡

#### 5.1.1 Tensorflow环境安装

1. 在系统上安装 Python 开发环境

```
// 检查
python --version
pip --version
virtualenv --version

// 安装
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
export PATH="/usr/local/bin:/usr/local/sbin:$PATH"
brew update
brew install python@2  # Python 2
sudo pip install -U virtualenv  # system-wide install
```

2. 开辟虚拟空间

```
// 创建一个新的虚拟环境，方法是选择 Python 解析器并创建一个 ./venv 目录来存放它
virtualenv --system-site-packages -p python2.7 ./venv

// 使用特定于 shell 的命令激活该虚拟环境：(此时上下文已经有了tensorflow环境)
source ./venv/bin/activate  # sh, bash, ksh, or zsh
```

3. 校验

```
python
import tensorflow as tf
print tf.__verison__
```

开启tensorflow编程，如下：
``` python
#!/usr/bin/env
# -*- coding: UTF-8 -*-
# from __future__ import absolute_import, division, print_function, unicode_literals

import tensorflow as tf
import tensorflow.contrib.keras as keras
import cPickle # python2自带
import os # python自带
# NumPy(Numerical Python) 是 Python 语言的一个扩展程序库，支持大量的维度数组与矩阵运算.
# 单独安装：https://www.runoob.com/numpy/numpy-tutorial.html
import numpy as np

print(tf.__version__)
print os.listdir('./package_runoob')
print np.eye(4)
```

#### 5.1.2 TensorBoard

TensorBoard 是由 Tensorflow 提供的一个可视化工具。

如果要在 TensorBoard 中觀察各種資料，首先要在 TensorFlow 的程式中以 tf.summary 將要觀察的模型或資料以事件檔案（events files）的方式輸出，讓 TensorBoard 從這些事件檔案取得資料，並且繪製各種圖形。

开启tensorboard服务器：
``` bash
tensorboard --logdir=/tmp/tensorflow/mnist # --logdir 所指定的目錄就是我們在 TensorFlow 程式中使用 tf.summary.FileWriter 寫入資料的目錄。
```

### 5.2 PyTouch

待更新。。。

### 5.3 Keras

深度学习库，是由纯python编写而成的高层神经网络API，也仅支持python开发。
它是为了支持快速实践而对tensorflow或者Theano的再次封装，让我们可以不用关注过多的底层细节，能够把想法快速转换为结果。Keras默认的后端为tensorflow。

比如说盖木头房子。想盖什么房子要先选木料，然后加工成需要的形状，最后组合钉装成想要的房子形状。tensorflow 好比是木头，Keras 好比是拿 tensorflow 做好的木板。如果你盖的房子简单，形状大众，Keras 调用起来会很方便。但如果想设计特殊的房子，那就要从木料开始。

Keras有后端依赖，即在安装 Keras 之前，请安装以下后端引擎之一：TensorFlow，Theano，或者 CNTK。

> Keras API较为简单，底层调用Tensorflow API，适合初学者；Tensorflow API就较为复杂。


## 参考文章

* [mooc Tensorflow课程](https://www.youtube.com/watch?v=kGktiYF5upk&list=PLqVl9yVjQ_EK67vL3ZE2391TZOdQEbrpg)
* [google 机器学习](https://developers.google.cn/machine-learning/crash-course/introduction-to-neural-networks/video-lecture)
* [斯坦福大学公开课 ：机器学习课程](http://open.163.com/special/opencourse/machinelearning.html)
* [纯新手入门安装TensorFlow并写Hello（mac版）](https://blog.csdn.net/Cloudox_/article/details/77823389)
* [人人都可以做深度学习应用：入门篇](https://juejin.im/entry/58afdd9c2f301e0068f7da72)
* [deeplearningbook-chinese](https://github.com/exacity/deeplearningbook-chinese)
* [Deep-Learning-21-Examples](https://github.com/hzy46/Deep-Learning-21-Examples)