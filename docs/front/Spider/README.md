# 爬虫

## Python
+ 爬取微博上搜索结果
  + 由于电脑版微博网页返回的html，需要手动parse html，过于麻烦
  + 访问移动版微博网页可以返回json
  + url中需要将搜索词前面变为转义字符`%3D1%26q%3D`，否则会失败
  + 返回的搜索结果位于`data/cards`下，但是仅仅是开头一段文字，detail仍要再次爬取
下面是搜索关键词`2021河南暴雨`返回的结果
```python
import json
import requests
class Weibo(object):
    def __init__(self):
        self.url = 'https://m.weibo.cn/api/container/getIndex?'
        self.config = {
            'search': 'containerid=100103type%3D1%26q%3D{}&page_type=searchall', 
        }
        user_agent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36 Edg/117.0.2045.31"
        self.headers = {"User-Agent": user_agent}
    def search(self, target):
        headers = {
            "User-Agent": self.headers['User-Agent'],
            "Accept": "application/json, text/plain, */*"
        }
        url = self.url + self.config['search'].format(target) 
        print('get: {}'.format(url))
        r = requests.get(url, headers=headers)
        return r.json()

print('init the weibo client')
weiboClient = Weibo()
res = weiboClient.search('2021年河南暴雨')
# 提取微博
for i in res['data']['cards']:
    if i['card_type'] == 9:
        print(i["mblog"]['text'])
    elif i['card_type'] == 11:
        for j in i["card_group"]:
            if j['card_type'] == 9:
                print(j["mblog"]['text'])
# weibotxt = [{'text': i["mblog"]['text']} for i in res['data']['cards']]
```
