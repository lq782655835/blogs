# 深度学习

## 基础概念

流程：
* 数据处理（采集 + 去噪）
* 模型训练（特征 + 模型）。以下已神经网络训练过程为例：
    1. 随机生成一组w和b
    1. 计算损失函数：例如y’和y的欧氏距离
    1. 迭代修改w和b的值（梯度下降、链式法则），让损失函数的结果趋于最小
    1. 停止：模型在训练集和验证集上的损失都最小的时候。
* 模型评估与优化（MSE、AUC+调参）
* 模型应用（A/B测试）

算法：
* 神经网络。它接受多个输入（x1，x2，x3…），产生一个输出（output）
    * DNN：深度神经网络
    * CNN：卷积神经网络（计算机视觉）
    * RNN：递归神经网络（自然语言处理）
    * GAN：对抗神经网络（模仿）
* 朴素贝叶斯。给定的待分类项，求解在此项出现的情况下其他各个类别出现的概率。典型案例：垃圾分类
* KNN
* SVM
* 聚类
* 自动编码器

深度学习进展：
* 图像分类
* 机器翻译
* 图像生成

## tensorflow
TensorFlow 是一个端到端开源机器学习平台。个人理解，通过提供tensorflow python包以及它提供的API，可以进行模型的制作。

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

## 参考文章

* [mooc Tensorflow课程](https://www.youtube.com/watch?v=kGktiYF5upk&list=PLqVl9yVjQ_EK67vL3ZE2391TZOdQEbrpg)
* [google 机器学习](https://developers.google.cn/machine-learning/crash-course/introduction-to-neural-networks/video-lecture)
* [斯坦福大学公开课 ：机器学习课程](http://open.163.com/special/opencourse/machinelearning.html)
* [纯新手入门安装TensorFlow并写Hello（mac版）](https://blog.csdn.net/Cloudox_/article/details/77823389)
* [人人都可以做深度学习应用：入门篇](https://juejin.im/entry/58afdd9c2f301e0068f7da72)
* [deeplearningbook-chinese](https://github.com/exacity/deeplearningbook-chinese)
* [Deep-Learning-21-Examples](https://github.com/hzy46/Deep-Learning-21-Examples)