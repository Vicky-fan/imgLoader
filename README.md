# imgLoader

## 说明
* imgLoader 用于预加载图片、显示图片加载进度和加载完成后的回调。
* 不依赖任何库，可单独外链引用，也可以当做一个模块引入，通用于移动端和PC端。

## 使用
1. 引入
```javascript
<script src="imgloader.js"></script>
或者
var imgLoader = require('./lib/imgLoader.js');
```

2. 调用
```javascript
var arr = [
            'http://img.dwstatic.com/www/1605/326487013743/1462867118922.jpg',
            'http://img2.dwstatic.com/www/1607/332156260726/1468201777561.png',
            'http://img4.dwstatic.com/www/1607/331553311031/1467598667542.png',
            'http://s1.dwstatic.com/group1/M00/47/8C/e5cc2e5c714e272ae2531bd61d00d316.jpg'
        ];

 new ImgLoader(arr, {
    onLoading: function(count, total, src) {
        console.log('onLoading:single loaded:', arguments);
        console.log('<p>' + src + '<br/>加载中。。。'+ count/total*100 +'%</p>');
    },
    onComplete: function(time) {
        console.log('oncomplete:all source loaded:',arguments);
        console.log('<p>加载完成,总共耗时:'+time+'ms</p>');
    }
});
```
或者第二个参数为函数，表示所有图片加载完成后的回调
```javascript
new ImgLoader(arr, function(time) {
       console.log('oncomplete:all source loaded:',arguments);
       console.log('<p>加载完成,总共耗时:'+time+'ms</p>');
   });
 ```

## 配置参数
|参数名|类型|注释|
| ---------- |:-------:|:-----|
|arr|Array|预加载的图片数组|
|onLoading|Function|加载完每一张图片的回调函数，参数count：当前加载到第几张；total：所有图片的总数；src: 当前加载的图片|
|onComplete|Function|加载完所有图片的回调函数，参数time：加载所有图片耗时|
