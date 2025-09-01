# LaTex
如果要使用$latex$，首先要装上Tex的发行版，比如在windows或Linux或Mac上安装$Tex Live$，windows还可选择安装另外的发行版$MiKTex$[^1],mac上还可以安装$MacTex$

[^1][MiKTex](https://miktex.org/about)是另外一个Tex发行版，注重Minimal as possible, Just enough Tex。不过建议安装TexLive发行版。
**TexLive**[文档](http://www.tug.org/texlive/doc/texlive-en/texlive-en.html#x1-20001)
**TexWorks**是Tex引擎前端，安装上发行版后都会自带安装上TexWorks

## $\TeX$历史
1977年  Knuth教授构思了$\TeX$的排版系统。$\TeX$生成的文件为DVI(device independent file)文件，这种文件格式是为了适配不同的输出设备$^{[1]}$。同时Knuth还开发了METAFONT字体生成程序$^{[2]}$。由Kunth设计调用$\TeX$的一组命令集来被称为$plain \TeX$，但是这个命令集过于复杂$^{[3]}$。

1984年 Lamport给$\TeX$编写了一组自定义命令宏包(package)，并命名$\LaTeX$.生成的文件为DVI文件$^{[2]}$。

1993年 Knuth宣布不再对$\TeX$和METAFONT进行更新，两个软件版本号分别停留在3.141592653和2.718281（分别是$\pi$和e的近似值）$^{[2]}$。

1998年 $pdf\TeX/pdf\LaTeX$开发出来，可以直接将源文件编译成PDF格式文件$^{[2]}$。

2004年 $Xe\TeX/Xe\LaTeX$发布，可以将源文件编译成DVI格式后，转换为PDF格式文件输出$^{[2]}$。

2010年 $Lua\TeX/Lua\LaTeX$发布，是对$pdf\TeX/pdf\LaTeX$的扩展，内置Lua脚本语言，可在源文件中进行编程$^{[2]}$。

[1]http://www.tug.org/TUGboat/Articles/tb24-2/tb77waud-what.pdf
[2]胡伟.$\LaTeX2e$完全学习手册[M].
[3]https://ctan.org/tex

## 有用的资料
+ [A brief history of LATEX](https://www.bravotutorials.com/documents/Latex/BravoTutorials-Latex.pdf)
对于latex的历史介绍,对于latex之前的印刷术讲了不少，latex涉及也就1页而已。
+ [recommend reference](http://ctan.org/pkg/latex-doc-ptr)
对于latex的一些推荐的学习文档,里面有很多推荐的文档链接，一应俱全，在下面也会涉及到一部分。
+ [The Not-So Short Guide to LATEX 2ε](http://mirror.ctan.org/info/lshort/)
最==权威==的一份文档，读完差不多就了解了Tex所有部分，还有中文版本
+ [一份其实很短的 LaTeX 入门文档](https://liam.page/2014/09/08/latex-introduction/)
算是开始入门时我看到最简单易懂的文档了

## $latex2e$
 对于$latex2e$的简介[latex2e for author](https://www.latex-project.org/help/documentation/usrguide.pdf)，包括
- $latex2e$和$latex$的简单区别
- $latex2e$加入的新的特性

latex2e是将以前带有不同扩展的$latex$集合在一起的项目。

另一个非官方的文档也==非常详细==，[LATEX2e: An unofficial reference manual](http://texdoc.net/texmf-dist/doc/latex/latex2e-help-texinfo/latex2e.pdf)

## 不同的名称
xelatex支持UTF-8编码，这样就不需要使用奇怪的其他宏包就可以进行中英文混排。

下面为参考文档中的内容

**引擎** 排版引擎，编译源代码并生成文档
**格式** 定义了一组命令的代码集
**编译命令** 实际调用引擎按照格式生成文档的命令

----------
引擎 |格式|命令
---|---|---
Tex|tex|
pdfTex|pdftex|pdfLatex
XeTex|xetex|xeLatex
LuaTex|luatex|luaLatex

**尽量使用** $Xe\TeX$进行编译，带来的好处包括
+ 支持更多的语言
+ 支持插入的位图格式比$Pdf\TeX$多一个bmp

# 例子
## `figure`
排版多个子图可以使用`subfigure`或者`subcaption`，需要注意`subfigure`对于`hyperref`支持有问题
```
\begin{figure}[!htbp]
    \centering
    \begin{subfigure}[b]{\SF\textwidth}
        \includegraphics[width=\textwidth]{figures/method/triggercharge.pdf}
        \label{fig:triggercharge}
    \end{subfigure}
    \begin{subfigure}[b]{\SF\textwidth}
        \includegraphics[width=\textwidth]{figures/result/gainres.pdf}
        \label{fig:totalchargeCompare}
    \end{subfigure}
    \caption{(\subref{fig:triggercharge}) description for triggercharge (\subref{fig:totalchargeCompare}) description fro totalchargeCompare 
    }
\end{figure}

```
上面代码使用`subcaption`实现
## 不同的名称
xelatex支持UTF-8编码，这样就不需要使用奇怪的其他宏包就可以进行中英文混排。

下面为参考文档中的内容

**引擎** 排版引擎，编译源代码并生成文档
**格式** 定义了一组命令的代码集
**编译命令** 实际调用引擎按照格式生成文档的命令

----------
引擎 |格式|命令
---|---|---
Tex|tex|
pdfTex|pdftex|pdfLatex
XeTex|xetex|xeLatex
LuaTex|luatex|luaLatex

**尽量使用** $Xe\TeX$进行编译，带来的好处包括
+ 支持更多的语言
+ 支持插入的位图格式比$Pdf\TeX$多一个bmp

## 安装与编译
+ TexLive

## 编辑器
提供语法高亮与代码补全功能
+ Overleaf
+ VSCode + LaTex Workshop
+ Vim + LaTex-Box
+ Emacs + AUCTeX

## 语法

### `figure`
排版多个子图可以使用`subfigure`或者`subcaption`，需要注意`subfigure`对于`hyperref`支持有问题
```
\begin{figure}[!htbp]
    \centering
    \begin{subfigure}[b]{\SF\textwidth}
        \includegraphics[width=\textwidth]{figures/method/triggercharge.pdf}
        \label{fig:triggercharge}
    \end{subfigure}
    \begin{subfigure}[b]{\SF\textwidth}
        \includegraphics[width=\textwidth]{figures/result/gainres.pdf}
        \label{fig:totalchargeCompare}
    \end{subfigure}
    \caption{(\subref{fig:triggercharge}) description for triggercharge (\subref{fig:totalchargeCompare}) description fro totalchargeCompare 
    }
\end{figure}

```
上面代码使用`subcaption`实现
```
\begin{figure}[!htbp]
    \centering
    \subcaptionbox{\label{fig:triggercharge}}
        {{\includegraphics[width=\textwidth]{figures/method/triggercharge.pdf}}
        
    \subcaptionbox{\label{fig:totalchargeCompare}}
        {\includegraphics[width=\textwidth]{figures/result/gainres.pdf}}
    \caption{(\subref{fig:triggercharge}) description for triggercharge (\subref{fig:totalchargeCompare}) description fro totalchargeCompare }
\end{figure}

```
## table
在表格环境中无法正常使用footnote，手动调整比如使用\footnotemark,\footnotetext时，脚注会出现在页面底部，加入minipage后会在表格下出现默认的横线。此处提供另外一种方式，使用threeparttable
```latex
\usepackage{threeparttable}
\begin{threeparttable}
    \centering
     %\resizebox{\textwidth}{16mm}{
    \begin{tabular}{cccccccc}
    \hline
         & CR50\% & CR40\% & CR30\% & CR20\% & CR15\% & CR10\% & CR5\% \\ \hline
        CPE & 14.9 & 12.0 & 8.8 & 5.8 & 4.4 & 2.9 & 1.5 \\ 
        CPE+SPE\tnote{a} & 25.8 & 20.7 & 15.7 & 10.1 & 7.6 & 5.0 & 2.6 \\ 
        CPE+SPE\tnote{b} & 38.8 & 30.7 & 23.2 & 15.1 & 11.4 & 7.5 & 3.9 \\ 
        \hline
    \end{tabular}
    \begin{tablenotes}
    \item[a]{This footnote shows what footnote symbols to use.}
    \item[b]{This footnote shows the text turning over when a long footnote is added.}
    \end{tablenotes}
\end{threeparttable}
```

## 多行公式使用`\right`和`\left`
需要在每一行匹配相同数量的`\left`，`\right`，如果换行的时候，可以分别在行尾和行头补充`\right.`和`\left.`来调整数量。
## Tikz-Feynman
绘制Feynman图

## cls命令
 [参考](https://www.ctan.org/pkg/clsguide)
 `\newcommand`定义新的命令`[]`内代表参数个数，使用`#1,#2`索引参数

## patchcmd
 [参考](https://tex.stackexchange.com/questions/152773/please-tutor-the-usage-of-patchcmd-and-xpatch)
 `\patchcmd`可以替换原本命令中的某些部分
```
 \pretocmd{<command>}{<code>}{<success>}{<failure>}
\apptocmd{<command>}{<code>}{<success>}{<failure>}
\patchcmd{<command>}{<code to replace>}{<code>}{<success>}{<failure>}
```

# Beamer
主题设置可以在[这里](https://hartwork.org/beamer-theme-matrix/)查看, tex命令为`\usetheme`,`\usecolortheme`

比如beamer头部可以使用下面示例
```tex
\documentclass[aspectratio=169]{beamer}
\usepackage{ctex}
\usepackage{amsmath,siunitx,mhchem,calligra}
\usepackage{graphicx,caption,subcaption,cite}
\usepackage{appendixnumberbeamer}
\usepackage[square,sort,comma,numbers]{natbib}
\usetheme{AnnArbor}
\usecolortheme{whale}
\title{Solar Element Abundance, Standard Solar Model and Solar Neutrino}
\author{Zhang Aiqiang}
\institute{Tsinghua University}
\date{2023/06/08}
\begin{document}
\begin{frame}[noframenumbering]
    \titlepage
\end{frame}
\begin{frame}[noframenumbering]
    \tableofcontents
\end{frame}
\section{Overview}
\begin{frame}{frame title}
\end{frame}
\end{document}
```
## 标题页和目录页不计入页数
使用`noframenumbering`关键词
```latex
\begin{frame}[noframenumbering]
    \titlepage
\end{frame}
\begin{frame}[noframenumbering]
    \frametitle{Content}
    \tableofcontents
\end{frame}
```
## pdfPages
在`Beamer`中类似`\includepdf`的命令只能在`frame`之外工作，而且需要设置背景为空，否则插入的pdf将会被背景覆盖。
```latex
\setbeamercolor{background canvas}{bg=}
\includepdf[pages={1-5}]{peTimeCoeff.pdf}
```

## 字体大小查看
 如果想要查看或者使用字体大小作为变量，可以使用`\f@size`，比如如果想要输出字体大小使用下面的代码加入正文
```
\makeatletter
\show\f@size
\show\f@family
\makeatother
```
`\makeatletter`和`\makeatother`会使得`@`这个字符能够不被latex误解，`\f@size`和`\f@family`为字体大小和种类，编译过程中会暂停在对应位置，回车即可接着运行。

# Documentation of Some latex package
## siunitx
+ 这个包在2022年的最新版本为v3，可以在ctan上找到文档，但是找不到v2的文档,收集了一份v2文档[在此](https://www.aliyundrive.com/s/Y6AKoRtJsa7)
+ 这个包可以实现数值和单位之间的空格，默认宽度是number-unit-product `\,`


## 安装与编译
+ TexLive

## 编辑器
提供语法高亮与代码补全功能
+ Overleaf
+ VSCode + LaTex Workshop
+ Vim + LaTex-Box
+ Emacs + AUCTeX

