 $.get('/user/queryUserMessage',{},function(r) {
 	if(r.error==400){
 		//window.stop();
 		location.href = '/m/user/login.html' + '?returnUrl=' + location.href;
 		
 	}
 	else{           //这个接口是坑，成功了居然直接返回对象了，我还去判断，，，
 		$('ul').append('<li class="mui-table-view-cell"><a class="mui-navigate-right">修改密码</a></li><li class="mui-table-view-cell">  <a class="mui-navigate-right">我的购物车</a></li><li class="mui-table-view-cell"><a class="mui-navigate-right adress">收货地址管理</a></li><li  class="out mui-table-view-cell"><a class="mui-navigate-right">退出登录</a></li>')

 		 // window.onload=function () {       //如果用js生成的话就不用onlaod了         
 		 	$('.zs').css('display','none');
 			console.log(r);
 		 // }
 		 

 		$('.out').on('tap',function(){
 			var un='aa';
 			var pa='ss';
 			$.get('/user/logout',{un:pa},function(s){              //这个登出居然不要验证用户名？
					 //	console.log(s);
				if (s.success) {
					location.href = '/m/index.html';
				}
				else{
					mui.toast(s.error);
				}
			})
 		})
 		
 		$('ul .adress').on('tap',function () {
 			// $.get('/address/queryAddress',{},function(rd) {
 				//console.log(rd);
 				location.href = '/m/user/adress.html';  //我就直接跳过去了 ，在地址页再判断是否有登陆
 				
 			// });
 		})

 		
 	}



 });






// $.get('/user/logout',{'itcast':'111111'},function(r){
// 	 	console.log(r);
// })





 //退出登录
// $.get('/user/logout',localparm,function(r){
// 	 	console.log(r);
// })

