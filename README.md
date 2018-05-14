# vue-cache-scroll-position

> A vue-cache-scroll-position project

## 解决问题

使用keep-alive做路由缓存时，页面中的列表/对话框等滚动区域的滚动条位置无法缓存，切换回去之后位置被复位。

支持原生的滚动条和iview中的scroll（iview中的scroll模块无法更新，直接拿出来封装了一个模块，使用方法和原来的保持一致）

## 设置

```
mixins: [Position],
```

```
<cScroll 
        :on-reach-bottom="handleReachBottom"
        :on-scroll-list="()=>handleScrollList('ivewscroll')"
        ref="ivewscroll"
    >
```

* on-scroll-list是调用了position中的handleScrollList
* ref在下面也需要申明

```
  //data中需要增加cacheComponents
  /**
   cScroll: iview的scroll组件升级版，可以记录滚动条位置
   rScroll：原生的div滚动条
  **/
  cacheComponents:{
    "cScroll":["ivewscroll"],
    "rScroll":["scroll2"]
  }
```

## 后续

这个版本比较粗糙，已经在git上提交，希望vue的作者可以把这个功能更新到keep-alive的组件中
