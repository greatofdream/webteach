# 算法
[OI wiki](https://oi-wiki.org/ds)
## 动态规划
寻找递推关系

### 背包问题
NPC问题。
+ [知乎解答](https://zhuanlan.zhihu.com/p/93857890)
+ [带有约束的背包问题，如约束可选择的物品数量](https://www.nowcoder.com/practice/bb8efeec4e39421d8fe6516169c98083?tpId=387&tqId=11116733&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D37%26type%3D387):多出了选择的物品数量维度，需要将某一个维度，如可选物品的列表用循环替代存储。

## 二分匹配
+ [匈牙利算法](http://tup.tsinghua.edu.cn/upload/books/yz/096569-01.pdf)
  + 增广道路，交互道路；定理：存在增广道路时可以加入新的节点获得更大匹配，因此无增广道路的匹配即为最大匹配。
  + [例题](https://www.nowcoder.com/practice/b9eae162e02f4f928eac37d7699b352e?tpId=37&tqId=21251&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=undefined&judgeStatus=undefined&tags=&title=)

## 递归回溯八皇后
+ [例题：数独](https://www.nowcoder.com/practice/78a1a4ebe8a34c93aac006c44f6bf8a1?tpId=37&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=5&judgeStatus=&tags=&title=&gioEnter=menu)

## 模运算
+ 对于分数的模运算，需要求[乘法逆元](https://www.cnblogs.com/kingwz/p/16497759.html) 可以用python的函数求value的乘法逆元：`pow(value, k-2, mod)`
+ [例题](https://www.nowcoder.com/practice/bfb7f9b9f6704892b4b1792edb13a9f0?tpId=37&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=5&judgeStatus=&tags=&title=&gioEnter=menu)

## 流匹配

## DFS与BFS
DFS使用循环方式需要一个栈Stack保存当前的路径，递归需要传入节点参数，用函数栈充当辅助存储路径
+ 路径存储方式：
  + `while len(stack)`循环：将所有路径节点全部压入stack中，然后`pop`，此时路径依赖的信息需要一同压入stack,否则无法追踪路径。
    + 当使用递归方式时，可以通过维护一个stack在dfs递归调用前后`push`和`pop`维护路径
      + [例题](https://www.nowcoder.com/practice/fbc417f314f745b1978fc751a54ac8cb?tpId=37&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=3&judgeStatus=&tags=&title=&gioEnter=menu&dayCountBigMember=365%E5%A4%A9)
  + `while 1`循环：将路径压入stack，当发现节点无可访问节点后`pop`，有可访问节点是`push`，直到寻找到节点后退出。这种方式适用于样例数据一定满足退出条件。当然可以优化使用的退出条件。
    + [例题](https://www.nowcoder.com/practice/cf24906056f4488c9ddb132f317e03bc?tpId=37&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=3&judgeStatus=&tags=&title=&gioEnter=menu)

## 树遍历
+ 中序遍历：分治，使用递归。
  + [例题](https://www.nowcoder.com/questionTerminal/4582efa5ffe949cc80c136eeb78795d6)

## 逆波兰表达式
+ 使用两个栈
  + [例题](https://www.nowcoder.com/practice/9999764a61484d819056f807d2a91f1e?tpId=37&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=3&judgeStatus=&tags=&title=&gioEnter=menu)

## 平面图
[四色定理](https://zh.wikipedia.org/zh-cn/%E5%9B%9B%E8%89%B2%E5%AE%9A%E7%90%86)
+ [着色方法]()：贪心、回溯
  + [回溯例题](https://blog.csdn.net/misayaaaaa/article/details/147669531)

## 旅行商问题
[题解](https://www.nowcoder.com/practice/3d1adf0f16474c90b27a9954b71d125d?tpId=182&tqId=362294&sourceUrl=/exam/oj&channelPut=wcnblog&fromPut=wcnblog)
+ [题解](https://blog.csdn.net/misayaaaaa/article/details/147669603)

## 组合数学
+ n个不同的元素放入m个不同的盒子
  + 允许空盒：$m^n$
  + 没有空盒：插空法，等价于n-1个位置上选m-1个分割点，并对元素排序$C(n-1,m-1)A(n,n)$
+ n个相同的元素放入m个不同的盒子
  + 允许空盒：m-1个挡板和n个元素一起排，选出m-1个位置$C(n+m-1,m-1)$
  + 没有空盒：插空法，等价于n-1个位置上选m-1个分割点$C(n-1,m-1)$
+ n个不同元素放入m个相同的盒子 
  + 没有空盒
    + [第二类斯特林数]():n个不同的元素分成m个集合的数目$S(n,m)$
    + 分成两种情况：1个球占据1个盒子，剩余n-1球放入m-1个盒子；1个球放入剩余n-1球组成的m盒子中任意一个盒子。$S(n,m)=S(n-1,m-1)+mS(n-1,m)$
  + 允许空盒：
    + 可以分为不空盒数目`k=[1,m]`，每种情况为$S(n,k)$，因此总数为$T(n,m)=\Sigma_k{S(n,k)}$；为了推导递推公式，分为2种情况，A.没有空盒需要将m个球放入m个盒子，剩下随机放$T(n-m,m)$，B.至少有一个空盒$T(n,m-1)$，因此递推公式为$T(n,m)=T(n-m,m)+T(n,m-1)$
  + [例题：全同的苹果分到全同的盘子](https://www.nowcoder.com/practice/bfd8234bb5e84be0b493656e390bdebf?tpId=387&tqId=36885&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D37%26type%3D387)
+ n个相同元素放入m个相同的盒子

## 区间极值询问
[Range Maximum/Minimum Query ](https://oi-wiki.org/topic/rmq/)

### 单调队列
存储滑动窗口的单调下降序列
+ [存储滑动窗口内的最大值](https://www.nowcoder.com/practice/dfe0f8ffa80d47d48053fb6a8b7ddbad?tpId=390&tqId=11348391&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D37%26type%3D387): Python可以用能在队尾`pop`的队列`collection.deque`，循环中判断队首是否在区间内，并循环判断队列中元素是否大于当前元素（搜索区间最大值即为队列首位元素），否则从队尾移走。
+ [模板例题](https://www.nowcoder.com/practice/896fa6501b634231892ebc8a4e042460?tpId=388&tqId=11306267&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D383)

### ST 表
[稀疏表（Sparse table）](https://oi-wiki.org/ds/sparse-table/): 基于 倍增 思想，`O(nlogn)` 预处理，`O(1)`查询，不支持修改

### 线段树
[线段树](https://oi-wiki.org/ds/seg/): 大小4n。[例题模板](https://www.nowcoder.com/practice/3d5796cd11d44b77bfb59e550beba3ee?tpId=388&tqId=11092602&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D383)
+ 左子节点：`2p`；右子节点：`2p+1`
```python
# 建堆
def build(s, t, p):
    # 对 [s,t] 区间建立线段树,当前根的编号为 p
    if s == t:
        d[p] = a[s]
        return
    m = s + ((t - s) >> 1)
    # 移位运算符的优先级小于加减法，所以加上括号
    # 如果写成 (s + t) >> 1 可能会超出 int 范围
    build(s, m, p * 2)
    build(m + 1, t, p * 2 + 1)
    # 递归对左右区间建树
    d[p] = d[p * 2] + d[(p * 2) + 1]
# 根节点为1，这个编号规则似乎是由于一些未知的历史因素 https://www.zhihu.com/question/58156194
build(0, n-1, 1)
# 查询
def getsum(l, r, s, t, p):
    # [l, r] 为查询区间, [s, t] 为当前节点包含的区间, p 为当前节点的编号
    if l <= s and t <= r:
        return d[p]  # 当前区间为询问区间的子集时直接返回当前区间的和
    m = s + ((t - s) >> 1)
    sum = 0
    if l <= m:
        sum = sum + getsum(l, r, s, m, p * 2)
    # 如果左儿子代表的区间 [s, m] 与询问区间有交集, 则递归查询左儿子
    if r > m:
        sum = sum + getsum(l, r, m + 1, t, p * 2 + 1)
    # 如果右儿子代表的区间 [m + 1, t] 与询问区间有交集, 则递归查询右儿子
    return sum
```
+ 修改区间并查询，可以设置标记。
```python
def update(l, r, c, s, t, p):
    # [l, r] 为修改区间, c 为被修改的元素的变化量, [s, t] 为当前节点包含的区间, p
    # 为当前节点的编号
    if l <= s and t <= r:
        d[p] = d[p] + (t - s + 1) * c
        b[p] = b[p] + c
        return
    # 当前区间为修改区间的子集时直接修改当前节点的值, 然后打标记, 结束修改
    m = s + ((t - s) >> 1)
    if b[p] and s != t:
        # 如果当前节点的懒标记非空, 则更新当前节点两个子节点的值和懒标记值
        d[p * 2] = d[p * 2] + b[p] * (m - s + 1)
        d[p * 2 + 1] = d[p * 2 + 1] + b[p] * (t - m)
        # 将标记下传给子节点
        b[p * 2] = b[p * 2] + b[p]
        b[p * 2 + 1] = b[p * 2 + 1] + b[p]
        # 清空当前节点的标记
        b[p] = 0
    if l <= m:
        update(l, r, c, s, m, p * 2)
    if r > m:
        update(l, r, c, m + 1, t, p * 2 + 1)
    d[p] = d[p * 2] + d[p * 2 + 1]

def getsum(l, r, s, t, p):
    # [l, r] 为查询区间, [s, t] 为当前节点包含的区间, p为当前节点的编号
    if l <= s and t <= r:
        return d[p]
    # 当前区间为询问区间的子集时直接返回当前区间的和
    m = s + ((t - s) >> 1)
    if b[p]:
        # 如果当前节点的懒标记非空, 则更新当前节点两个子节点的值和懒标记值
        d[p * 2] = d[p * 2] + b[p] * (m - s + 1)
        d[p * 2 + 1] = d[p * 2 + 1] + b[p] * (t - m)
        # 将标记下传给子节点
        b[p * 2] = b[p * 2] + b[p]
        b[p * 2 + 1] = b[p * 2 + 1] + b[p]
        # 清空当前节点的标记
        b[p] = 0
    sum = 0
    if l <= m:
        sum = getsum(l, r, s, m, p * 2)
    if r > m:
        sum = sum + getsum(l, r, m + 1, t, p * 2 + 1)
    return sum
```

## 最短路
[dijkstra算法](https://oi-wiki.org/graph/shortest-path/)
+ [搜索最短路径：dijkstra和DP](https://www.nowcoder.com/practice/7dd330d6ab3b46af9ca604979b8bd83b?tpId=388&tqId=11306763&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D383)
+ [dijkstra模板](https://www.nowcoder.com/practice/d7fafd4f3340439e90597532850257b5?tpId=388&tqId=11074139&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D383)
Floyd算法：多源最短路径
+ [Floyd模板](https://oi-wiki.org/graph/shortest-path/#__tabbed_2_2)
```python
for k in range(1, n + 1):
    for x in range(1, n + 1):
        for y in range(1, n + 1):
            f[x][y] = min(f[x][y], f[x][k] + f[k][y])
```

## 生成树
Prim算法：加点
+ [Prim算法模板]()
Kruskal算法：加边
+ [复杂度](https://oi-wiki.org/graph/mst/)优于Prim
+ [Kruskal例题模板](https://www.nowcoder.com/practice/6434142fe980434899c396a6124b0778?tpId=388&tqId=11077677&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D383%26type%3D388)
