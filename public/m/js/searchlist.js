 //区域滚动
 mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	 scrollY: true, //是否竖向滚动
	 scrollX: false, //是否横向滚动
	 startX: 0, //初始化时滚动至x
	 startY: 0, //初始化时滚动至y
	 indicators: true, //是否显示滚动条
	 bounce: true //是否启用回弹
});












//获取地址栏传参，转为对象
 var keyd= window.location.search.substr(1);
 //console.log(keyd);
 var arrk=keyd.split('&');  //没有该字符也能直接变为数组
 //console.log(arrk);
 var localparm={};
 for (var i = 0; i < arrk.length; i++) {
 	 var arrkd=arrk[i].split('=');    //把=两边也分解为数组 
 	 localparm[arrkd[0]]=decodeURI(arrkd[1]) ;   //  把数组转为对象  对中文的url直接转换 严格点其实还应进行编码判断
 	//console.log(localparm.key);
 }
//搜索栏填字
$('.searchbox input').val(localparm.key);



//构建个请求后台数据，并生成html的函数
function getdata(argument,fn) {
	$.get('/product/queryProduct',argument,function (r) {
//    console.log(r.data);
  	  for (var i = 0; i < r.data.length; i++) {                  //遍历数组，取数据生成html
  	  	  // $('.product ul').append('<li><a href="#"></a></li>');  直接可以一起写，分开来上拉添加时会有bug
  	  	   if (r.data[i].pic[0].picAddr) {                      //图片存在且不为空
  	  	   		 var picadd= r.data[i].pic[0].picAddr;
  	  	   }
  	  	   else{
  	  	   		var  picadd='images/none.png';
  	  	   }	
  	  	  // console.log(r.data[i].pic[0]);			
  	  	   $('.product ul ').append(
  	  	   	'<li><a href="product.html?productId='+r.data[i].id+'"><img src="'+picadd+'"><p>'+r.data[i].proName+'</p><div class="price"><span>¥'+ r.data[i].price +'</span> <span>¥'+r.data[i].oldPrice +'</span></div><button >立即购买</button></a></li>');
  	  }	   
  	   fn && fn(r);
  });
}



//发送搜索请求给后台
//
// $.get('/product/queryProduct',{
// 								proName:localparm.key,
// 								page:1,
// 								pageSize:4,
// 							  },function (r) {
//     console.log(r.data);
//   	  for (var i = 0; i < r.data.length; i++) {                  //遍历数组，取数据生成html
//   	  	   $('.product ul').append('<li><a href="#"></a></li>');
//   	  	   if (r.data[i].pic[0].picAddr) {                      //图片存在且不为空
//   	  	   		 var picadd= r.data[i].pic[0].picAddr;
//   	  	   }
//   	  	   else{
//   	  	   		var  picadd='images/none.png';
//   	  	   }	
//   	  	  // console.log(r.data[i].pic[0]);			
//   	  	   $('.product ul li a').eq(i).append(
//   	  	   	'<img src="'+picadd+'"><p>'+r.data[i].proName+'</p><div class="price"><span>¥'+ r.data[i].price +'</span> <span>¥'+r.data[i].oldPrice +'</span></div><button >立即购买</button>');
//   	  }	   
//   });
getdata({                        //把上面的封装为函数，这个参数也做成参数传入即可
		proName:localparm.key,
 		page:1,
 		pageSize:4,
		});




//排序功能
var canshu={
			proName:localparm.key,
	 		page:1,
	 		pageSize:4,};
$('.sort li a').on('tap',function(){
	//图标变色，变反向
	if($(this).hasClass("now")){
		//console.log($(this).find('.fa-angle-down'));
		if ($(this).find('.fa-angle-down').length!=0) {                       //注意这里的判断即使find没找到，也是存在的，所有不能直接if ($(this).find('.fa-angle-down')) 
			//console.log($(this).find('.fa-angle-down'));
			$(this).find('.fa-angle-down').removeClass("fa-angle-down").addClass("fa-angle-up");
		}
		else  {
			$(this).find('.fa-angle-up').removeClass("fa-angle-up").addClass("fa-angle-down");
		}
		
	}
	else{ 
		$(this).addClass("now").parent().siblings().find('a').removeClass("now");
		$(this).addClass("now").parent().siblings().find('.fa-angle-up').removeClass('fa-angle-up').addClass("fa-angle-down"); //不存在也不会报错
	}

	//点击排序也要获取数据 注这个后台只提供了价格和库存排序的接口，无奈只能先价格排序了
	canshu.page=1;
	if ($(this).data('sort')=='price') {
		if($(this).find('.fa-angle-down').length!=0){
			canshu[$(this).data('sort')]=2;
		}
		else{
			canshu[$(this).data('sort')]=1;
		}
		$('.product ul').empty();		
		getdata(canshu);
	}

});




//下拉刷新
mui.init({

  pullRefresh : {
    container:"#pullrefresh",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down : {
      height:50,//可选,默认50.触发下拉刷新拖动距离,
      auto: false,//可选,默认false.首次加载自动下拉刷新一次
      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
      callback :function () {
      //	console.log('hh');
      	var that=this;
      	canshu.page=1;
      	$('.product ul').empty();	
      	getdata(canshu,function(){                   //注我们这里的刷新是重新以当前参数获取数据，，而不是重置，更符合逻辑
			that.endPulldownToRefresh(); 
		})
      	//this.endPulldownToRefresh();   //停止刷新
      } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    },
    up:{
       callback:function(){
       		canshu.page ++;        //这个参数的属性可以直接加就行
       		var that=this;
       		setTimeout(function(){
       			getdata(canshu,function(r){                   //注我们这里的刷新是重新以当前参数获取数据，，而不是重置，更符合逻辑
				
				//console.log(r.data);
				if (r.data.length==0) {
					 // $('.product .lastdata').text('没有更多商品了');
					 that.endPullupToRefresh(true);         //  这个上来用true自己会生成没有更多商品了
				}
				else{
					that.endPullupToRefresh(); 
				}
			});
       		},500);
       	
       }
    }
  }
});

$('li').on('click',function (argument) {
	console.log('hh');
})