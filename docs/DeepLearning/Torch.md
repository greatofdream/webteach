# Pytorch
+ 显示当前设备
  + `torch.cuda.device_count()`:设备数量
  + `torch.cuda.current_device()`:当前设备编号
  + `torch.cuda.get_device_properties(i)`:获得第i个设备属性
+ 选择第一个设备并将矩阵x放到该设备
```
device = torch.device("cuda:1")
torch.from_numpy(x).cuda(device=device)
```
