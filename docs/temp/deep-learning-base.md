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

## 参考文章

* [mooc Tensorflow课程](https://www.youtube.com/watch?v=kGktiYF5upk&list=PLqVl9yVjQ_EK67vL3ZE2391TZOdQEbrpg)
* [google 机器学习](https://developers.google.cn/machine-learning/crash-course/introduction-to-neural-networks/video-lecture)
* [斯坦福大学公开课 ：机器学习课程](http://open.163.com/special/opencourse/machinelearning.html)
* [纯新手入门安装TensorFlow并写Hello（mac版）](https://blog.csdn.net/Cloudox_/article/details/77823389)
* [人人都可以做深度学习应用：入门篇](https://juejin.im/entry/58afdd9c2f301e0068f7da72)
* [deeplearningbook-chinese](https://github.com/exacity/deeplearningbook-chinese)
* [Deep-Learning-21-Examples](https://github.com/hzy46/Deep-Learning-21-Examples)