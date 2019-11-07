# 深度学习一览

机器学习是实现人工智能的方法，深度学习是实现机器学习算法的技术。

## 1. 基础概念

### 1.1 流程

1. 数据处理（采集 + 处理（如音频的去噪））
1. 模型训练（特征（算法选择） + 训练）。以下已神经网络训练过程为例：
    1. 随机生成一组w和b
    1. 计算损失函数：例如y’和y的欧氏距离
    1. 迭代修改w和b的值（梯度下降、链式法则），让损失函数的结果趋于最小
    1. 停止：模型在训练集和验证集上的损失都最小的时候。
1. 模型评估与优化（MSE、AUC+调参）
1. 模型应用（部署 + A/B测试）

### 1.2 算法

* 神经网络。它接受多个输入（x1，x2，x3…），产生一个输出（output）
    * DNN：深度神经网络
    * CNN：卷积神经网络（计算机视觉）
    * RNN：循环神经网络（自然语言处理）
    * GAN：对抗神经网络（模仿）
* 朴素贝叶斯。给定的待分类项，求解在此项出现的情况下其他各个类别出现的概率。典型案例：垃圾分类
* KNN
* SVM
* 聚类
* 自动编码器

### 1.3 深度学习进展

* 图像分类，CNN卷积神经网络
* 机器翻译，RNN循环神经网络
* 图像生成

### 神经网络

* 神经元：
特征
权重
激活函数
* 损失函数

* 神经网络训练：每次参数都不一样（因为要对大量数据都拟合），比如有些今天的数据符合这些权重，但明天的又不能了，所以训练时使用固定的参数肯定有问题。
  * 梯度下降算法

举个例子：
假设你买房子，考虑房屋面积、房屋价格、社区评分三个要素，其权重分别为0.4，0.6，0.5。
当有A楼房屋面积3星，房屋价格1星，社区评分2星。所以其加权值：0.4*3+0.6*1+0.5*2=2.8。假设激活函数是count/10（此时激活函数是第一层），则最终输出：2.8/10=0.28。

当还有一个决策人时，如你女朋友（此时又多一个神经元），她觉得权重是0.3，0.2，0.1，则最终输出：（3*0.3+1*0.2+2*0.1）/10=0.13。

此时需要在两个人基础上，再叠加一个激活函数，以算出最终的值

![image](https://user-images.githubusercontent.com/6310131/68285115-a5460280-00b9-11ea-9fff-18f9ceee4677.png)
![image](https://user-images.githubusercontent.com/6310131/68285914-218d1580-00bb-11ea-9f00-c335f524b214.png)


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

基于`slurm + conda`。使用slurm分配计算机资源和维护Job，conda则提供python环境。

### 3.1 slurm

slurm是一种可用于大型计算节点集群的高度可伸缩和容错的`集群管理器和作业调度系统`。SLURM 维护着一个待处理工作的队列并管理此工作的整体资源利用。SLURM 会为任务队列合理地分配资源，并监视作业至其完成。

> slurm分配集群计算机资源，开启job，跑模型训练。

### 3.2 conda

[conda](https://medium.com/python4u/%E7%94%A8conda%E5%BB%BA%E7%AB%8B%E5%8F%8A%E7%AE%A1%E7%90%86python%E8%99%9B%E6%93%AC%E7%92%B0%E5%A2%83-b61fd2a76566) 是一个开源的跨平台工具软件。使用conda時，你可以進行建立(create)、輸出(export)、列表(list)、移除(remove)和更新(update)環境於不同Python版本及Packages，同時也可以分享你的虛擬環境。

> 可以理解为nvm一样的作用，管理node版本以及环境。而conda管理着python版本和环境。

## 4. Netease AI深度学习平台 V2.0架构

底层基于`Docker + Kubernes`，顶层应用使用开源Kubeflow。

### 4.1 Kubernes

kubernes 容器化编排工具（docker是容器化基础）。管理容器非常方便，其特性有：
* 方便的容器升级（修改yaml配置，自动更新替换）
* 提供容器的自动化复制和部署（随时扩展容器规模），同时支持负载均衡

Pod：
* pod是基本操作单元，也是应用运行的载体。整个k8s都是围绕着pod展开，比如如何部署运行pod，如何保证pod的数量，如何访问pod等。
* Deployment定义了pod部署的信息
* 若干pod副本（副本是一个pod的多个实例）组成service，对外提供服务

Deployment
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

#### Service Mesh

如果用一句话来解释什么是服务网格，可以将它比作是应用程序或者说微服务间的 TCP/IP，负责服务之间的网络调用、限流、熔断和监控。对于编写应用程序来说一般无须关心 TCP/IP 这一层（比如通过 HTTP 协议的 RESTful 应用），同样使用服务网格也就无须关心服务之间的那些原来是通过应用程序或者其他框架实现的事情，比如 Spring Cloud、OSS，现在只要交给服务网格就可以了。

### 4.2 kubeflow

* jupyter（nodebook server） 书写代码在线工具，以及提交job任务
* tf-operator 查看job任务信息

#### tf-operator

tf-operator 为 tensorflow 提供了 TFJob 资源，以满足 tensorflow 分布式训练的资源和拓扑需求，最终达到一键拉起分布式机器学习集群的效果。

> 简单理解，tf-operator 就是让用户在 K8S 集群上部署训练任务更加方便和简单。

## 5. AI框架

### 5.1 tensorflow

TensorFlow 是一个端到端开源机器学习平台。个人理解，通过提供tensorflow python包以及它提供的API，可以进行模型的制作。

* 社区繁华
* 可扩展性好，支持分布式，可以扩展至多机多卡

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

### 5.2 Pytouch

## 参考文章

* [mooc Tensorflow课程](https://www.youtube.com/watch?v=kGktiYF5upk&list=PLqVl9yVjQ_EK67vL3ZE2391TZOdQEbrpg)
* [google 机器学习](https://developers.google.cn/machine-learning/crash-course/introduction-to-neural-networks/video-lecture)
* [斯坦福大学公开课 ：机器学习课程](http://open.163.com/special/opencourse/machinelearning.html)
* [纯新手入门安装TensorFlow并写Hello（mac版）](https://blog.csdn.net/Cloudox_/article/details/77823389)
* [人人都可以做深度学习应用：入门篇](https://juejin.im/entry/58afdd9c2f301e0068f7da72)
* [deeplearningbook-chinese](https://github.com/exacity/deeplearningbook-chinese)
* [Deep-Learning-21-Examples](https://github.com/hzy46/Deep-Learning-21-Examples)