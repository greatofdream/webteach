# 建设基站

## Description

有一棵二叉树，每个节点上都住了一户居民。现在要给这棵树上的居民建设基站，每个基站只能覆盖她所在与相邻的节点，请问信号覆盖这棵树最少需要建设多少个基站

## Input

一个整数数组 nums(1<=num.length<=3000)，用空格分隔，表示二叉树的节点值，正整数表示存在节点，N 表示不存在节点，如[1 2 3 4 N 5 6]表示一颗如下所示的树，最少需要建设2个基站

## Output

最少需要建设的基站个数

## Sample
+ 1
1 2 3 4 N 5 6

2
+ 2
1 2 N 3 N N 4

2

## 样例代码
树型DP，分配的节点数为4n，参考了[线段树的证明](https://oi-wiki.org/ds/seg/#__tabbed_1_2)
```python
arr = input().split()

n = len(arr)
nodes = [0] * (4*n+2)
i, j = 0, 0
for j in range(n):
    while nodes[i+1] == -1:
        i += 1
    if arr[j]!='N':
        nodes[i+1] = int(arr[j])
    else:
        nodes[(i+1)*2] = -1 # 这题的测例跳过空节点的子节点，所以要手动补上，理论上应该构造一棵树，才能避免极端测例导致数组长度不够
        nodes[(i+1)*2+1] = -1
    i += 1
        
# print(nodes)

# 每个点有3种情况：无基站但子节点有基站覆盖，无基站子节点也无基站可覆盖该节点，有基站
# f代表当前节点的子树包含节点个数
# f[0,i] = min(f[2, i*2] + f[0, i*2+1], f[0, i*2] + f[2, i*2+1], f[2, i*2] + f[2, i*2+1]) ,
# f[1, i] = f[0, i*2] + f[0, i*2+1]
# f[2, i] = 1 + min(f[:, i*2]) + min(f[:, i*2+1])
dp = [[0] * (2*n+1) for _ in range(4)]# 3种情况加min最小值共四行
INF = 1E10
def dfs(i):
    l, r = 2*i, 2*i+1
    if nodes[l]<=0 and nodes[r]<=0:#叶节点
        dp[0][i] = INF
        dp[1][i] = 0
        dp[2][i] = 1
        dp[3][i] = 0
    else:
        if nodes[r]>0 and nodes[l]<=0:#只有右节点
            dfs(r)
            dp[0][l] = 0
            dp[1][l] = 0
            dp[2][l] = INF
            dp[3][l] = 0
        elif nodes[l]>0 and nodes[r]<=0:#只有左节点
            dfs(l)
            dp[0][r] = 0
            dp[1][r] = 0
            dp[2][r] = INF
            dp[3][r] = 0
        else:
            dfs(l)
            dfs(r)
        dp[0][i] = min([
            dp[2][i*2] + dp[0][i*2+1],
            dp[0][i*2] + dp[2][i*2+1],
            dp[2][i*2] + dp[2][i*2+1],
        ])
        dp[1][i] = dp[0][i*2] + dp[0][i*2+1]
        dp[2][i] = 1+ dp[3][i*2] + dp[3][i*2+1]
        dp[3][i] = min([dp[0][i], dp[1][i], dp[2][i]])
dfs(1)
#print(dp)
print(min(dp[0][1], dp[2][1]))
```
