# Python

## 列表

列表可以按照栈或队列的方式使用，参见[官方文档](https://docs.python.org/3/tutorial/datastructures.html)

+ 栈(Stack):
  + `list.append(x)`:在尾部加入新元素
  + ` list.pop()`：弹出尾部的元素
+ 队列(Queue):
  + `list.pop(0)`：弹出左侧的元素,但是并不高效
实现队列可以使用另外一个数据类型
+ deque:`from collections import deque`
  + `deque.append()`
  + `deque.popleft()`:弹出左侧的元素。

列表的其他函数
+ 默认的原地排序函数`list.sort()`，但是注意没有`cmp`参数。
  + [排序是稳定的](https://docs.python.org/3/howto/sorting.html#sort-stability-and-complex-sorts)
+ 原地反转数组`list.reverse()`

## 元组
元组不可以修改（immutable）,元素通过解包和索引获得，元素通常是不同的类型（inhomogeneous）。由于不可修改，因此可以作为字典的键。

序列类型：列表、元组和`range`
+ 可以按照顺序比较

## 集合
+ 集合构造方式：花括号和`set`
```python
a = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
a = set()
```
+ `set`作用于列表会去除重复元素
+ 也可类似列表生成方式构造
+ `in`运算符判断元素是否在集合中
+ `-`,`|`,`&`,`^`运算符进行集合运算

## 字典
+ 构造方式：花括号，`dict`
+ 也可类似列表生成方式构造
+ `in`运算符判断键是否在字典中
+ `values()`返回值的view，通过`list(dict.values())`可转换为列表

## defaultdict
[collections 里提供的dict](https://docs.python.org/3/library/collections.html#collections.defaultdict)
+ `collections.defaultdict(list)`：产生值为列表的dict

## 字符与字符串
字符操作包括
+ `ord`将字符转为整数
+ `chr`将整数转为字符

字符串
+ `int()`: 字符串转int，第一个参数为字符串，第二个参数为这个字符串是几进制的
+ `bin()`：int转字符串，但包含`0b`。比如14转字符串，可以用`format(14, 'b')`或者f-string来输出`f'{14:b}'`
+ [`f-string`输出指定样式的字符串](https://docs.python.org/3/library/string.html#format-specification-mini-language)：将数字转特定格式字符串
  + `format_spec ::= [options][width][grouping]["." precision][type]`
```shell
options     ::= [[fill]align][sign]["z"]["#"]["0"]
fill        ::= <any character>
align       ::= "<" | ">" | "=" | "^"
sign        ::= "+" | "-" | " "
width       ::= digit+
grouping    ::= "," | "_"
precision   ::= digit+
type        ::= "b" | "c" | "d" | "e" | "E" | "f" | "F" | "g"
                | "G" | "n" | "o" | "s" | "x" | "X" | "%"
```
[例题](https://www.nowcoder.com/practice/d3d8e23870584782b3dd48f26cb39c8f?tpId=387&tqId=36854&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D37%26type%3D390)

## 优先堆
使用`pqheap`可以将数组按照[优先最小堆](https://docs.python.org/3/library/heapq.html)操作，数据结构仍然为列表
+ `heapify`：建堆
+ `heappush(heap, item)`：
+ `heappop(heap)`：
```python
import heapq
```
例题：
+ [合并K个有序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)

## 二分算法
[`bisect`](https://docs.python.org/zh-cn/3/library/bisect.html)
+ `bisect.bisect_left`

## 数学
+ `math`库
  + `gcd`：最大公约数；`lcm`：最小公倍数
