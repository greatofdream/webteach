# 最小代价相遇的路径规划
## Description

假定有两辆车在给定一个 n x n 的非负整数矩阵地图 grid中行驶，地图左上角位置为[0, 0]。我们简化车辆行驶的方式，每辆车可以从一个坐标行驶到相邻（上下左右）的另一个坐标，并且经过的每个位置都会产生代价，包括起始位置的代价。其中 grid[i] [j] 表示通过网格位置 [i, j] 所需的代价。矩阵中，grid[i] [j] 等于 0 表示该位置为障碍物，车辆无法通过。两辆车约定好需要在地图中快速相遇进行货物交接。

两辆车相遇的定义为：两辆车最终分别停在相邻的网格位置（上下或左右相邻），并且路径可达。
两辆车相遇所需的代价定义为：两辆车到达各自相遇位置所需代价中的较大值。
注意：路径代价包含车辆的起始位置位置的代价；行驶过程中，车辆可以停在某一个网格位置上，两辆车无需同步行驶。

求两辆车可以相遇需要的最小代价，如果无法相遇则返回 -1 。

Input

第一行输入是一个整数 n ，代表地图 grid[n] [n] 的大小，即 n 行 n 列大小的地图。

后续每一行代表地图中通过每个网格位置所需的时间信息，即 grid[n] [n] 的每一行的元素值。

假设初始状态两辆车分别从左上角 [0, 0] 和右下角 [n-1, n-1] 出发，左上角的车只能向右或向下移动，右下角的车只能向上或向左移动。

Output

一个整数，表示两辆车相遇的最小代价；如果两车无法相遇（例如都被障碍物阻挡），则返回 -1。

## 示例代码
不知道为什么需要dijkstra算法。
```python
n = int(input())
grid = []
c1 = [[0]*(n+2) for _ in range(n+2)]
c2 = [[0]*(n+2) for _ in range(n+2)]
for i in range(n):
    grid.append(list(map(int, input().split())))

INF = 1E10
for i in range(0, n):
    for j in range(0, n):
        if grid[i][j]==0:
            c1[i+1][j+1] = 0
        else:
            if c1[i][j+1]==0   and c1[i+1][j]==0:
                if i==0 and j==0:
                    c1[i+1][j+1] = grid[i][j]
                else:
                    c1[i+1][j+1] = 0
            elif c1[i][j+1]==0:
                c1[i+1][j+1] =c1[i+1][j] + grid[i][j]
            elif c1[i+1][j]==0:
                c1[i+1][j+1] = c1[i][j+1] + grid[i][j]
            else:
                if c1[i][j+1]<c1[i+1][j]:
                    c1[i+1][j+1] = c1[i][j+1] + grid[i][j]
                else:
                    c1[i+1][j+1] = c1[i+1][j] + grid[i][j]

for i in range(n-1, -1, -1):
    for j in range(n-1, -1, -1):
        if grid[i][j]==0:
            c2[i+1][j+1] = 0
        else:
            if c2[i+2][j+1]==0 and c2[i+1][j+2]==0:
                if i==n-1 and j==n-1:
                    c2[i+1][j+1] = grid[i][j]
                else:
                    c2[i+1][j+1] = 0
            elif c2[i+2][j+1]==0:
                c2[i+1][j+1] = c2[i+1][j+2] + grid[i][j]
            elif c2[i+1][j+2]==0:
                c2[i+1][j+1] = c2[i+2][j+1] + grid[i][j]
            else:
                if c2[i+2][j+1] < c2[i+1][j+2]:
                    c2[i+1][j+1] = c2[i+2][j+1] + grid[i][j]
                else:
                    c2[i+1][j+1] = c2[i+1][j+2] + grid[i][j]
# print(c1)
# print(c2)
c_min = 1E10
for i in range(1, n+1):
    for j in range(1, n+1):
        if c1[i][j]!=0:

            for dx, dy in zip([-1, 0, 1, 0], [0, 1, 0, -1]):
                if c2[i+dx][j+dy]!=0:
                    if c1[i][j] < c2[i+dx][j+dy]:
                        c_tmp = c2[i+dx][j+dy]
                    else:
                        c_tmp = c1[i][j]
                    if c_tmp < c_min:
                        c_min = c_tmp
if c_min==1E10:
    print(-1)
else:
    print(c_min)
```
