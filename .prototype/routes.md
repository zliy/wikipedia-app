## 路由页面：

/explore
/saved
/history

/wiki/非对称加密

/search
/settings




```js
[
    '/explorer',
    '/settings',
]

[
'/saved',
'/wiki/非对称加密',
'/wiki/二进制',
'/wiki/数字签名',
]
```

## 路由方式： 
三个主页面不会并列
搜索=>文章，返回时忽略搜索页。
[/explore ]

## 路由返回策略：
历史记录中，3个主页面一定是且只是栈底的，三者一共只出现一次。
