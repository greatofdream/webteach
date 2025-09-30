# R
+ `R` 进入cli，`q()`退出cli
```r
# 安装一个包
install.packages("argparser")
# 安装多个包
install.packages(c("rhdf5","purrr","dplyr","glue"))
# 通过BiocManager安装包
install.packages("BiocManager")
BiocManager::install("rhdf5")
```
+ 在cli里运行`source("script file name")`，如果希望有默认参数，可以用
```r
argv <- if (interactive()) {
  # Defaults only used when debugging interactively (source/RStudio)
  cmd <- "SK4/current/hep/prob.h5 SK4/r061525.r077958/sys_err/e_corr/table/hep_ecor_sys.dat SK4/current/hep/fit.h5 --scan yes"
  argv <- strsplit(cmd, "\\s+")[[1]]
  print(argv)
  args <- parse_args(psr, argv)
} else {
  # Real command line arguments (Rscript script.R --input foo.csv --n 20)
  args <- parse_args(psr)
}
```
