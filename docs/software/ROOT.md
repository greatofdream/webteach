# Cern Root
+ `root-config` 查看root编译时的配置
+ `configure`产生`config/Makefile.config`文件包含很多安装信息。
## Rootcint 和 Rootcling
Rootcint 是旧的用于产生dict的文件，Rootcling是新的
## 集成Cmake工程
[参考](https://root.cern/manual/integrate_root_into_my_cmake_project/)
[参考](https://cliutils.gitlab.io/modern-cmake/chapters/packages/ROOT.html)

`find_package(ROOT)`可以定义一系列变量，包括`ROOT_LIBRARIES`
+ `ROOT_USE_FILE`: 使用`ROOT_GENERATE_DICITONARY`命令


+ [RIO 使用cmake](https://root.cern/manual/io_custom_classes/#using-cmake)
  + Dictionary产生：为C++提供反射的特性
+ [ROOT已经移除了`RootNewMacros.cmake`](https://github.com/root-project/root/blob/master/cmake/modules/RootNewMacros.cmake)，且旧版的`ROOT_GENERATE_DICTIONARY`没有MODULE指令，[新版](https://github.com/root-project/root/blob/master/cmake/modules/RootMacros.cmake#L272)中才有，建议放弃在旧版本中用CMake构建dict特性。
+ Rootcint使用的`LinkDef.h`要用`__CINT__`，而rootcling用`__CLING__`，这里的坑耽误了我一天时间
```cpp
// LinkDef.h
// rootcint 用下面的
#ifdef __CINT__

#pragma link off all classes;
#pragma link off all functions;
//填充需要反射的类
#endif
// rootcling用下面的
#ifdef __CLING__

#pragma link off all classes;
#pragma link off all functions;
//填充需要反射的类
#endif
```

## Error记录
+ class的版本号不对应会导致`CheckByteCount`warning和错误
```shell
Error in <TBufferFile::CheckByteCount>: object of class vector<pair<int,pair<double,double> > > read too many bytes
Warning in <TBufferFile::CheckByteCount>: vector<pair<int,pair<double,double> > >::Streamer() not in sync with data on file
```
+ rootcint 的bug，可搜索的记录有，但是给出的解决方案无用，包括移除`-I/usr/include`，更新版本。我检查了对应的代码，发现rootcint不知道何种原因无法找到相应的头文件，包括`cint/cint/include`,`cint/cint/stl`,`cint/cint/lib`这几个路径，rootcint就能找到对应的头文件，从而完成编译。需要看rootcint源码找到本质原因。
  + [Problems with rootcint for ROOT 5.20.0 ](https://root-forum.cern.ch/t/problems-with-rootcint-for-root-5-20-0-macos-10-3-9-on-ppc/7378)
  + [Rootcint and ROOTSYS](https://root-forum.cern.ch/t/rootcint-and-rootsys/5535)
  + [Rootcint problem](https://root-forum.cern.ch/t/rootcint-problem/7657/10)
+ rootcint 源代码位置：`src/core/utils/src/rootcint.cxx`
  + `Which` find the include header `-I`, `rewind(fpld)` read the header (`./cint/cint/lib/stdstrct/stdfunc.h:void rewind(FILE *fp);`).
  + `src/Makefile:      echo "Installing cint/cint/include cint/cint/lib and cint/cint/stl in $(DESTDIR)$(CINTINCDIR)";`
  + `src/config/Makefile.config`: `CINTINCDIR     := /usr/local/sklib_gcc8/root_v5.34.38/lib/cint`
```shell
Error: cannot open file "typeinfo"  /home/scratch/extlib/root-5.22.00/include/Rtypeinfo.h:33:
#error "You need a ISO C conforming compiler to use the glibc headers"
```
```shell
# 下面为示例
$ /usr/local/sklib_gcc8/root_v5.34.38/build_cmake/bin/rootcint -cint -f SKG4_dict.cxx -c  -I/usr/local/sklib_gcc8/root_v5.34.38/build_cmake/cint/cint/include -I/usr/local/sklib_gcc8/root_v5.34.38/build_cmake/cint/cint/stl -I/usr/local/sklib_gcc8/root_v5.34.38/build_cmake/cint/cint/lib /junofs/users/junoprotondecay/SolarNeutrino/SuperK/bonsailightcurve/converter/SKG4RootPmt.hh /junofs/users/junoprotondecay/SolarNeutrino/SuperK/bonsailightcurve/converter/SKG4RootCeren.hh /junofs/users/junoprotondecay/SolarNeutrino/SuperK/bonsailightcurve/converter/LinkDef.h
```
