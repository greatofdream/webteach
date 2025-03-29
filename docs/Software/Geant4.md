# GEANT4
+ `geant4-config --help` 查看geant4编译时使用了哪些选项

## Visualization
+ [Tutorial](https://conferences.fnal.gov/g4tutorial/g4cd/Slides/Fermilab/G4VisTutorial.pdf)
+ [visualization support dependency with cmake](https://geant4-userdoc.web.cern.ch/UsersGuides/ForApplicationDeveloper/html/GettingStarted/makeFile.html)
+ [Visualize the Detector and Events](https://geant4-userdoc.web.cern.ch/UsersGuides/ForApplicationDeveloper/html/GettingStarted/visualization.html)
+ [Visualization detail](https://geant4-userdoc.web.cern.ch/UsersGuides/ForApplicationDeveloper/html/Visualization/introduction.html)
  + 选择`Visualization Driver`的方式
+ make: 需要手动引入`config/architecture.gmk`，并链接对应的lib
  + 使用QT:`-lQt5Core -lQt5Gui -lQt5OpenGL`
  + 使用OPENGL: 
```shell
CPPFLAGS += -DG4VIS_USE_OPENGLQT

G4VIS_USE_RAYTRACERX:=true
G4VIS_BUILD_RAYTRACERX_DRIVER:=true

G4VIS_USE_OPENGLX := true
G4VIS_BUILD_OPENGLX_DRIVER := true
```

## resources
+ [The European School in Instrumentation for Particle and Astroparticle Physics](https://indico.cern.ch/event/472305/)
+ [Doxygen](https://geant4.kek.jp/Reference/): 这是根据Geant4头文件产生的html网页的索引，可以快速定位需要的函数。但是详细的注释需要点击跳转到每一个头文件查看。
+ [安装指南](https://geant4-userdoc.web.cern.ch/UsersGuides/InstallationGuide/html/gettingstarted.html)
