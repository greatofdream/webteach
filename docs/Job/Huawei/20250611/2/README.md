# 网络整改

## Description

在一个树形的网络拓扑中，有n台设备，编号1到n，其中我们固定1为根设备，根设备下可下挂多台设备（如设备编号2、3 ），以此类推每一台设备下都可能下挂1台或者多台设备，最后没有下挂设备的设备成为边缘设备（如设备3、5、6、7 ）。现在我们希望对网络进行整改，将组网中的部分设备移除，使得所有的边缘设备到根设备的距离相同，请你计算下最少需要移除多少台设备。注：整个网络是单个连通的树型组网且没有环

## Input

用例第一行为一个整数n（3 ≤ n ≤ 5000 ），代表网络设备数目。 接下来n行每行包含两个整数u, v（1 ≤ u, v ≤ n, u ≠ v ），代表设备u与设备v相连接（注意仅代表链接关系，不表明确父子关系）。注：我们保证每个设备的编号都小于等于n，且不重复；n个网络设备，必然有n - 1条连接。

## Output

输出最少移除多少台设备，可以使得剩下的所有边缘设备到根设备的距离都相同。

## 样例
+ 1
7
1 2
1 3
2 4
2 5
4 6
4 7

2
+ 2
5
4 1
2 4
5 1
5 3

0

## 示例代码
看起来默认剪枝叶节点，边缘设备定义不会随剪枝而变化。
```python
n = int(input())
from collections import deque
adj = {}
for i in range(n-1):
    u, v = map(int, input().split())
    if u in adj:
        adj[u].append(v)
    else:
        adj[u] = [v]
    if v in adj:
        adj[v].append(u)
    else:
        adj[v] = [u]

# bfs
st = deque([1])
visited = [False] * (n+1)
leafs = [False] * (n+1)
depths = [0] * (n+1)
d = 0
while len(st) > 0:
    node = st.popleft()
    visited[node] = True
    d = depths[node]
    child_n = 0
    for no in adj[node]:
        if not visited[no]:
            st.append(no)
            depths[no] = d + 1
            child_n += 1
    if child_n == 0:
        leafs[node] = True

# 移除节点
max_depth = max(depths)
min_num = n
#print(depths, leafs)
# 循环depth，计算每种depth对应的移除节点数
for depth in range(max_depth, 0, -1):
    num = 0
    for i in range(1, n+1):
        if depths[i] < depth:
            if leafs[i]:
                num += 1
        elif depths[i] > depth:
            num += 1
            depths[i] -= 1
    #print(depth, num)
    if num < min_num:
        min_num = num

print(min_num)
        
```
