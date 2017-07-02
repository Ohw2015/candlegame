;(function(){
//网页加载进度条。by wxl
var $loading = $('.loading_mask');
var $progress = $('.percent');
var $protxt = $('.percentNum');
var picComplete = false; //图片加载完毕。
var ajaxComplete = true;//ajax加载完毕
var prg = 0
var timer = null;
progress([70, 90], [1, 3], 50)  // 使用数组来表示随机数的区间
window.onload = function(){
    var img  = new Image();
    img.src = '/gameball/img/stage_bg_big.jpg';
    img.onload = function(){
       picComplete = true;
       if(picComplete){//图片加载完成，ajax请求完成了，进度条加载到100%。
        progress(100, [1, 5], 10,function(){
         $loading.hide()
        })
       }
    };
    // $(document).ajaxSend(function(event,xhr,options){
    //    ajaxComplete = true;
    // });
}
function progress (dist, speed, delay, callback) {
  var _dist = random(dist)
  var _delay = random(delay)
  var _speed = random(speed)
  console.log(_delay);
  window.clearTimeout(timer)
  timer = window.setTimeout(function(){
    if (prg + _speed >= _dist) {
      window.clearTimeout(timer)
      prg = _dist;
      callback && callback();
    } else {
      prg += _speed;
      progress (_dist, speed, delay, callback);
    }
    $progress.width(parseInt(prg) + '%');
    $protxt.html(parseInt(prg) + '%')// 留意，由于已经不是自增1，所以这里要取整
   
  }, _delay)
}
//生成一个随机数。
function random (n) {
  //已经做了判断了。
  if (typeof n === 'object') {
    var offset = n[1] - n[0]
    var min = n[0]
    return Math.random() * offset + min
  } else {
    return n
  }
}
})()


/* by wxl
网页加载进度条实现思路
1.判断ajax是够加载完成$(document).ajaxSend(function(event,xhr,options));
2.判断大图是否加载完成
img1.onload =function() {}
参考这篇文章：
http://blog.csdn.net/z69183787/article/details/17393793
3.判断dom节点是否加载完成
4.判断js是否加载完成
*/
