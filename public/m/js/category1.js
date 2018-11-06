
$.get(' /category/queryTopCategory',function (r) {    
    console.log(r); //测试接口	
	for (var i = 0; i < r.rows.length; i++) {
		//console.log(r.rows[i].categoryName);
		$('.navleft ul').append('<li><a href="#"></a></li>');    //先生成结构

	}

	$.each($('.navleft ul li a'),function(index,value){          //再写入接口内容
     		$(value).text(r.rows[index].categoryName);   //这个value是js对象，需要jq方法就转一下
     		$(value).parent().data('catid',r.rows[index].id);  //取出id，方便去二级分类内容
	});

	$('.navleft ul li ').eq(0).addClass("now");
	$('.navleft ul li ').eq(0).trigger('tap');   //加载时默认去第一个分类数据：模拟点击即可，无需再写一遍或者把下面再封装成函数
});



$('.navleft ul  ').on('tap','li',function () {
	 $(this).addClass('now').siblings().removeClass("now");
	 var catid=$(this).data('catid');    //注意，委托事件的this 仍是子元素
	 $('.right ul').empty();
	 $.get('/category/querySecondCategory', {id:catid},function (r) {    
		if(r.rows.length==0){          //如果接口没有返回数据
			$('.right ul').append('<li><span class="nodata">没有数据!!</span></li>');
			return ;
		}
		for (var i = 0; i < r.rows.length; i++) {
				$('.right ul').append('<li><a href="#"><img src="'+r.rows[i].brandLogo+'"><span>'+r.rows[i].brandName+'</span></a></li>');
			}	
	});


});



// $.get('/category/querySecondCategory', {id:2},function (r) {    
// 	console.log(r); //测试接口	
// });
 mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	 scrollY: true, //是否竖向滚动
	 scrollX: false, //是否横向滚动
	 startX: 0, //初始化时滚动至x
	 startY: 0, //初始化时滚动至y
	 indicators: true, //是否显示滚动条
	 bounce: true //是否启用回弹
});