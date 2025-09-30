# 概率论
+ 高等概率论
  - Vladimir Bogachev. Measure Theory
  - 测度与概率教程. 任佳刚,巫静

## EM算法
+ [一份总结的博客](https://luyiyun.github.io/2020/12/08/methods/methods-em/)
+ [The EM Algorithm and Extensions]()
  + 未观测值需要有一个prior的分布，在计算`logL`时候需要按照全概率公式计算在prior分布下的期望。

## 统计
![data science](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcaf14b50-da37-48f9-8d5e-20d63bb847e8_2828x4000.jpeg)

## Bayes方法
+ [A First Course in Bayesian Statistical Methods](https://sites.math.rutgers.edu/~zeilberg/EM20/Hoff.pdf)
  + conjugate分布：作为先验获得的后验属于同一种分布。比如Poisson分布的conjugate分布是Gamma分布。

## 广义线性回归
+ [Generalized Linear Models and Extensions]()
  + EDM (Exponential Dispersion Model): 指数族，由下面的参数定义
    + 自然参数 `theta(mu)`
    + 放缩参数 phi
    + 权重 w
  + Link function: 将`X*beta`变换为`mu`
+ [Negative Binomial Regression](https://www.cambridge.org/core/books/negative-binomial-regression/12D6281A46B9A980DC6021080C9419E7):负二项分布回归。
