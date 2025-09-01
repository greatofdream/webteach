# Beamer
[Beamer是latex的一个文档类](https://ctan.org/pkg/beamer)，用于制作演示文稿。
+ 优点
  + 强大的排版能力
  + 数学公式支持
  + 一致的格式
  + 可定制性强
+ 缺点
  + $\LaTeX$需要经过编译才能看到最终的结果，与其他所见即所得（WYSIWYG，What You See Is What You Get）的软件（LibreOffice、KeyNote、PowerPoint）有区别。
  + 大量结构化代码
## 
+ [标题右侧加入logo](https://bloerg.net/posts/customizing-the-frametitle-of-beamer-presentation/)

## Rmarkdown
+ [加入package](https://bookdown.org/yihui/rmarkdown-cookbook/latex-extra.html)
+ [beamer编译](https://bookdown.org/yihui/rmarkdown/beamer-presentation.html): `rmarkdown::render('TestRmarkdown.md')` in R cli.
```markdown
--
title: "Hello R Markdown"
author: "Awesome Me"
date: "2018-02-14"
output:
  beamer_presentation:
    theme: "AnnArbor"
    colortheme: "dolphin"
    fonttheme: "structurebold"
---
This is a paragraph in an R Markdown document.

Below is a code chunk:
```
```{r}
fit = lm(dist ~ speed, data = cars)
b   = coef(fit)
plot(cars)
abline(fit)
```
```
The slope of the regression is `r b[1]`.
```

## org-mode
