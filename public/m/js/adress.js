 $.get('/address/queryAddress',{},function(r) {
 	if(r.error==400){
 		//window.stop();
 		location.href = '/m/user/login.html' + '?returnUrl=' + location.href;
 		
 	}
 	else{
 		//这个地址需要遍历：
 		for (var i = 0; i < r.length; i++) {
 			$('.adress ul').append('<li class="mui-table-view-cell mui-media"><a href="javascript:;"><img class="mui-media-object mui-pull-left" src="../images/none.png"><div class="mui-media-body">'+r[i].recipients+'<span class="mobile">'+r[i].mobile+'</span><p class="mui-ellipsis">'+r[i].addressDetail+'</p></div><div class="edit">编辑</div></a></li>');
 			//$('.adress ul li').eq(i).data('id',r[i].id);    //注意 eq 不能省
 			 $('.adress ul li').last().data('id',r[i].id);
 		}
 		
 		

 		$('.zs').css('display','none');
 	    console.log(r);
 		
 		$('.adress ul li').on('tap',function (argument) {     
 			location.href = 'editadress.html?id='+$(this).data('id');
 		});
 		 
 	}
 

 });



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