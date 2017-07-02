/*
by wxl 20170617 baseketBallGame
*/
/*
* cookie模块
*/
var NS = {
    'cookie' : {
        /*
        *@名称:  get 获取cookie
        *@作者： caoxl
        *@日期： 2016-06-29
        *@参数:  String name cookie名称
        *@描述:  使用方法TT_GET('cookiePkg').get('name');
        *@返回:  如果cookie存在返回cookie 否则返回null
        */
        'get': function(name){
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            return arr != null ? unescape(arr[2]) : null;
        },
        /*
        *@名称:  set 设置cookie
        *@作者： caoxl
        *@日期： 2016-06-29
        *@参数:  String name cookie名称
        *@描述:  使用方法TT_GET('cookiePkg').set('name', 'value');
        *@返回:  boolean
        */
        'set':function(name, value){  
           var exp = new Date();  
           exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000); //3天过期  
           document.cookie = name + "=" + encodeURIComponent(value) + ";domain=.tomtop.com;expires=" + exp.toGMTString()+";path=/";  
           return true;  
        },
        /*
        *@名称:  del 删除cookie
        *@作者： caoxl
        *@日期： 2016-06-29
        *@参数:  String name cookie名称
        *@描述:  使用方法TT_GET('cookiePkg').del('name');
        *@返回:  boolean
        */
        'del':function(name){
             var _this = this;
             var _exp = new Date();  //当前时间
             _exp.setTime(_exp.getTime() - 1);
             var _cval = _this.get(name);
             if(_cval != null){
                document.cookie= name + "="+_cval+";domain=.tomtop.com;expires="+_exp.toGMTString()+";path=/";
             }
        },
        'tem' : function(name, value) {
           var _domain = NS['config']['cookieDomain'];
           document.cookie = name + "=" + encodeURIComponent(value) + ";domain=.tomtop.com;path=/";
           return true;
        },
        'defauleCurr' : function(){
            if(this.get('TT_CURR') == null){
                this.set('TT_CURR','USD')
            }
        }
    }
};
var candleGame = {
    'timer1':null,//控制蜡烛移动的定时器。
    'timer2':null,//控制奖品的定时器。
    'timer3':null,
    init:function(){
		    var _this = this;
        this.stageHeight();
        this.bindEvent();
    },
    'bindEvent':function(){
        var _this = this;
        $('.range_click').mouseenter(function(){//转换思维
             var self = $(this);
             clearTimeout(_this.timer1);
             clearTimeout(_this.timer2);
             var hasfired = $(this).parents('.stage').find('.show');
             if(hasfired.length == 0){
                  $(this).parents('.cake').addClass('show centerAni');
                  _this.timer1 = setTimeout(function(){
                       self.parents('.cake').siblings().addClass('leaveAni');
                       self.addClass('shandong');
                  },600);
                  _this.getPrize();
                  _this.timer3 = setTimeout(function(){
                      $('.bang').remove();
                  },1100)
             }
            
        })
    },
    getPrize:function(){
        var _this = this;
        var arr = [0,1,2,3,4,5];
        var i = Math.floor(Math.random()*5);//随机出现的概率。
        var prize = arr[i];
        _this.timer2 = setTimeout(function(){
             //中奖
             if(prize == 0){
                 var res = '<p class="p1">Congratulations!</p>\
                   <p class="p2">You got the gift </p>\
                   <p class="p3">TOMSHOO Outdoor Picnic Camping\
Hiking Sleeping Bag Liner</p>';
                 _this.popshow(res,prize);
             }else if(prize == 1){
                 var res = '<p class="p1">Congratulations!</p>\
                   <p class="p2">You got the gift </p>\
                   <p class="p3">TOMSHOO Outdoor Picnic Camping\
Hiking Sleeping Bag Liner</p>';
                 _this.popshow(res,prize);
                 
             }else if(prize == 2){
                 var res = '<p class="p1">Congratulations!</p>\
                   <p class="p2">You got the gift </p>\
                   <p class="p3">TOMSHOO Outdoor Picnic Camping\
Hiking Sleeping Bag Liner</p>';
                 _this.popshow(res,prize);
                 
             }else if(prize == 3){
                 var res = '<p class="p1">Congratulations!</p>\
                   <p class="p2">You got the gift </p>\
                   <p class="p3">TOMSHOO Outdoor Picnic Camping\
Hiking Sleeping Bag Liner</p>';
                 _this.popshow(res,prize);
                 
             }else if(prize == 4){
                 var res = '<p class="p1">Congratulations!</p>\
                   <p class="p2">You got the gift </p>\
                   <p class="p3">TOMSHOO Outdoor Picnic Camping\
Hiking Sleeping Bag Liner</p>';
                 _this.popshow(res,prize);
                 
             }else if(prize == 5){
                 var res = '<span>Sorry No Prizes</span>';
                 _this.popshow(res,prize);
             }
        },900)
    },
    popshow:function(txt,p){
        //奖品弹窗
        $(".text_pop ").html(txt)
        if( p == 6){
            $(".dialog_pop").addClass('Ani no_prize');
        }else{
            $(".dialog_pop").addClass('Ani winning');
        }
        $(".flower,.text_pop,.mask,.bang").addClass('Ani');
    },
    stageHeight:function(){
        //设置主体高度始终为屏幕高度。
    	var winH = $(window).height();
    	$(".stage_wrap").css({"height":winH});
        $(window).resize(function(){
            var winH = $(window).height();
            $(".stage_wrap").css({"height":winH});
        });
    }
}
$(function(){
     candleGame.stageHeight();
     candleGame.bindEvent();
})


