# 随身WiFi
芯片主要有高通410，ASR，紫光展锐
## ASR
[官网](https://www.asrmicro.com/proinfo/1.html)
+ Mifi: 管理页面为`192.168.100.1`，网页名为4G LTE WLan Router ，nmap扫描仅开放了3个端口，没有adb的端口，adb无法无线连接，也无ssh端口
```shell
$ nmap 192.168.100.1
Starting Nmap 7.94 ( https://nmap.org ) at 2024-03-25 20:44 й׼ʱ
Nmap scan report for 192.168.100.1
Host is up (0.0052s latency).
Not shown: 997 closed tcp ports (reset)
PORT     STATE SERVICE
53/tcp   open  domain
80/tcp   open  http
8000/tcp open  http-alt
MAC Address: 5C:A0:00:C8:94:97 (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 17.91 seconds
```
## 紫光展锐

## 高通
[9008模式](https://www.xgiu.com/msm_4gwifi_9008debug)
