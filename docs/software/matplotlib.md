# matplotlib
+ 使用特定的画图风格文件，比如`journal.mplstyle`
```python
import matplotlib.pyplot as plt
plt.style.use('./journal.mplstyle')
```

## Example
+ [带边缘分布的二维图](https://matplotlib.org/stable/gallery/lines_bars_and_markers/scatter_hist.html):样例使用`grid_spec`和`inset_axes`两种方式实现了该效果。
![](https://matplotlib.org/stable/_images/sphx_glr_scatter_hist_001.png)
+ [上下坐标轴使用有转换关系的坐标](https://matplotlib.org/stable/gallery/subplots_axes_and_figures/secondary_axis.html#sphx-glr-gallery-subplots-axes-and-figures-secondary-axis-py)：此外`twinx`和`twiny`可以实现双坐标轴，但是坐标之间没有对应关系
![](https://matplotlib.org/stable/_images/sphx_glr_secondary_axis_001.png)
