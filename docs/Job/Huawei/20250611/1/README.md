# 货物运输

## 描述
物流公司每天都要处理很多物流的运输工作，整个城市共有 ( N ) 个地点，共有 ( N - 1 ) 条公路，每 2 个地点之间都能通过公路连通。物流公司总部位于 1 号地点。 今天有一辆物流运输车共有 ( M ) 条物流运输任务，物流运输车每天的工作流程如下： 先要从总部出发去收取所有的寄件货物，收到所有货物后回到总部扫描货物，再从总部出发将货物送至所有的送件地址，送完后最终回到总部，算作完成了今天的运输工作。 请问该辆物流运输车今天最少行驶多少路程可以完成今天的运输工作，运输任务不分先后。

## 输入
对于每组数据，第一行有 2 个整数，依次为 ( N(3 \leq N \leq 10^5), M(1 \leq M \leq 10^5) )，表示有 ( N ) 个地点和 ( M ) 条物流任务，数字用空格分开。 接下来有 ( N - 1 ) 行，每行有 3 个整数，依次为 ( u(1 \leq u \leq N), v(1 \leq v \leq N), c(1 \leq c \leq 10^3) )，表示从 ( u ) 到 ( v ) 有一条公路，公路里程为 ( c )，输入保证所有地点连通。 接下来有 ( M ) 行，每行有 2 个整数，依次为 ( s(2 \leq s \leq N), t(2 \leq t \leq N, s \neq t) )，表示寄件任务从 ( s ) 寄到 ( t )。

## 输出
输出一个整数，表示该辆物流运输车最少行驶多少路程能够完成今天的运输工作。

## 样例
+ Sample 1
4 2
2 1 1
1 3 2
4 3 2
3 2
4 2

1

+ Sample 2
5 2
2 1 1
1 3 2
4 3 2
1 5 3
4 2
5 4

24

## 示例代码
+ 由于边数N-1，且节点联通，所以构成的是无环联通图，每个节点只有唯一的到达方式。
+ 利用dfs可以搜索到节点的路径，同时dfs返回是否包含所需节点，从而贡献到最终的路径长度
```python
N, M = list(map(int, input().split()))
adj = {}
for i in range(N-1):
    u, v, c = map(int, input().split())
    if u in adj:
        adj[u].append((v, c))
    else:
        adj[u] = [(v, c)]
    if v in adj:
        adj[v].append((u, c))
    else:
        adj[v] = [(u, c)]
s_s = set()
t_s = set()
for i in range(M):
    s, t = map(int, input().split())
    s_s.add(s)
    t_s.add(t)

visited = [False] * (N+1)

def dfs(n, waitlist):
    global total_l
    visited[n] = True
    if n in waitlist:
        inS = True
    else:
        inS = False
    for node, c in adj[n]:
        if not visited[node] and dfs(node, waitlist):
            total_l += c
            inS = True
    return inS
total_l = 0
dfs(1, s_s)
s_l = total_l
visited = [False] * (N+1)
total_l = 0
dfs(1, t_s)
t_l = total_l
print((s_l+t_l)*2)

```
