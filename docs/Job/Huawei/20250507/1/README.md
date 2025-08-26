# 寻找智能汽车行驶距离最近的K个充电桩
[oj](https://niumacode.com/training/108/problem/P1621)
## Description

一个超大智能汽车测试场有多个充电桩，每个充电桩的位置由其在二维平面上的坐标 (x, y) 表示。给定一辆智能汽车的当前位置 (car_x, car_y)，请设计一个高效的算法，找出给定智能汽车行驶到充电桩行驶距离最近的k个充电桩并输出相关充电桩信息（编号、坐标、行驶距离），且按行驶距离升序排序（最近行驶距离的排在最前面），如果存在行驶距离相等的充电桩则按照充电桩的编号从小到大输出。汽车到充电桩的行驶距离的计算方法为 abs(car_x - x) + abs(car_y - y) 注意：abs表示绝对值。

## Input

1，第一行是2个整数k n，空格间隔，第1个整数k表示需要输出到的行驶距离最近的充电桩的数量（ 0 <= k <= 1000000），第2个整数n表示充电桩的总数量（0 < n <= 1000000）。
2，第2行是长度为2的整数数组car_x car_y，中间是空格间隔，表示智能汽车的当前位置坐标。
3，第3行到第n+2行是编号为1到n的充电桩的位置坐标。
注意：坐标数值大小区间为： [-2^32, 2^31-1

## Output

一个二维数组，每一行是一个长度为4 的数组：编号 x y distance，编号表示充电桩的编号（介于1到n之间）、x y表示充电桩的坐标, distance表示智能汽车到充电桩的行驶距离，从第1行开始往下是按距离从小到大排序的。 如果存在行驶距离相等的充电桩则按照充电桩的编号从小到大输出。如果k为0或者k大于n，输出字符串null。

## Sample Input
+ 1
3 5 
0 0 
1 4 
5 6 
2 3 
7 8 
3 -1

5 3 -1 4 
1 1 4 5 
3 2 3 5
+ 2

## 示例代码
```python
import sys
k, n = map(int, input().split())
if k==0:
    print('null')
    exit(0)
car_x, car_y = map(int, input().split())

dis = []
pos = []
for i in range(n):
    x, y = map(int, input().split())
    pos.append((x, y))
    dis.append((abs(car_x-x) + abs(car_y-y), i))
dis.sort()

for i in range(k):
    print(dis[i][1]+1, *pos[dis[i][1]], dis[i][0])
```
