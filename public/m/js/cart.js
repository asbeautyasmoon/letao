


//登陆判断 渲染页面
function getdata(canshu,fn){
		$.get('/cart/queryCartPaging',canshu,function(r) {
	 	if(r.error==400){
	 		//window.stop();
	 		location.href = '/m/user/login.html' + '?returnUrl=' + location.href;
	 		
	 	}
	 	else{
	 		//console.log(r);
	 		if(r.length!=0){  //需要判断下再生成，不然因为一次一次取没有数据了或报错
		 		for (var i = 0; i < r.data.length; i++) {
			 				var picad=r.data[i].pic[0].picAddr || 'images/none.png';
			 				//console.log(picad);
			 			//$('.container ul').append('<li class="mui-table-view-cell mui-media"><a href="javascript:;"><img class="mui-media-object mui-pull-left" src="'+picad+'"><div class="mui-media-body"><input type="checkbox" name="" data-sxid="'+r.data[i].id+'"><p >'+r.data[i].proName+'</p><div class="data"><span class="price">¥'+r.data[i].price+'</span> <span class="opr">¥'+r.data[i].oldPrice+'</span> <span class="num">x'+r.data[i].num+'双</span></div><span class="size">鞋码：'+r.data[i].size+'</span></div></a></li>')
			 			$('.container ul').append('<li class="mui-table-view-cell mui-media"><img class="mui-media-object mui-pull-left" src="'+picad+'"><input type="checkbox" name="" data-sxid="'+r.data[i].id+'"><a href="javascript:;"><div class="mui-media-body"><p >'+r.data[i].proName+'</p><div class="data"><span class="price">¥'+r.data[i].price+'</span> <span class="opr">¥'+r.data[i].oldPrice+'</span> <span class="num">x'+r.data[i].num+'双</span></div><span class="size">鞋码：'+r.data[i].size+'</span></div></a></li>')
			 		}
		 	}
	 		fn &&fn(r);


	 		 //区域滚动 写在渲染之后，以防逻辑错误
			 mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
				 scrollY: true, //是否竖向滚动
				 scrollX: false, //是否横向滚动
				 startX: 0, //初始化时滚动至x
				 startY: 0, //初始化时滚动至y
				 indicators: true, //是否显示滚动条
				 bounce: true //是否启用回弹
			});
			
	 	}
	});

}



//下拉刷新 上拉加载
var canshu={            //默认取第1页，5条数据
	page:1,
	pageSize:6,
};

// getdata(canshu);
mui.init({
  pullRefresh : {
    container:"#pullrefresh",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down : {
      height:50,//可选,默认50.触发下拉刷新拖动距离,
      auto: true,//可选,默认false.首次加载自动下拉刷新一次
      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
      callback :function () {
       canshu.page=1;
      	var that=this;

      	$('.container ul').empty();	
      	getdata(canshu,function(){             
			that.endPulldownToRefresh(); 
			mui('#pullrefresh').pullRefresh().refresh(true);  //重置上拉刷新，以免不再执行上拉刷新

		})
      	//this.endPulldownToRefresh();   //停止刷新
      } 
    },
    up:{
       callback:function(){
       		canshu.page ++;        //这个参数的属性可以直接加就行
       		var that=this;
       		// setTimeout(function(){
       			getdata(canshu,function(r){                   //注我们这里的刷新是重新以当前参数获取数据，，而不是重置，更符合逻辑
				
				console.log(r);
				if (r.length==0) {
					 // $('.product .lastdata').text('没有更多商品了');
					 that.endPullupToRefresh(true);         //  这个上来用true自己会生成没有更多商品了 ,但是如果下啦刷新后，这个上拉也不会在执行，还要重置那还不如自己洗个没有更多了
				}
				else{
					that.endPullupToRefresh(); 
				
				}
			});
       		// },500);
       	
       }
    }
  }
});


$('.gl').on('tap',function () {
	if ($(this).text()=='管理') {
		$(this).text('完成');
		$('.js span').text('删除');
	}
	else{
		$(this).text('管理');
		$('.js span').text('结算');
	}
	
})

 //绑定委托事件,编辑功能
$('.container').on('tap','a',function () {
	//console.log('hh');	
			// $.get('',{},function(r) {
			// 	 	if(r.error==400){
			// 	 		//window.stop();
			// 	 		location.href = '/m/user/login.html' + '?returnUrl=' + location.href;		 		
			// 	 	}
			// 	 	else{
				 			 	
			// 	 	    console.log(r);
				 		
			// 	 	}
				 

			// 	 });
	
})


//删除功能
$('.js').on('click',function () {
	if ($(this).text()=='删除') {
		var scid=[];       //需要传给后台的删除的id
		$('.container input').each(function (idx,ele) {       //循环判断添加入数组
			//console.log(ele);                  //注意，这个each后是js元素了
			if ($(ele).prop("checked")==true) {
				scid.push($(ele).data('sxid'));
			}
		})
		console.log(scid);
		$.get('/cart/deleteCart',{'id':scid},function(r) {      //这个后台接口有问题，传入多个id的数组就会崩溃，搞笑
				 	if(r.error==400){
				 		//window.stop();
				 		location.href = '/m/user/login.html' + '?returnUrl=' + location.href;		 		
				 	}
				 	else if(r.success){		 	
				 	    console.log(r);
				 	    mui.toast('删除成功');
				 	    for (var i = 0; i < scid.length; i++) {
				 	    	$("input[data-sxid='"+scid[i]+"']").parent().remove();   //直接属性选择器+id拼接即可选择该id的元素
				 		}

				 		//合计金额也要变
							var sum=0;
							$('.container ul input').each(function(i,ele){
								if ($(ele).prop("checked")==true) {
									var nowprice=$(ele).parent().find('.price').text().substr(1);   //取数据
									var sumd=parseInt(parseFloat(nowprice)*100); //如果转为浮点数js运算会出现很多小数点，所以直接在乘100转整形
									var num=$(ele).parent().find('.num').text().substr(1);
									var numd=parseInt(num);
									
									sum=sum+sumd*numd;
									console.log(sum);									
								}
							});
							sump='¥'+sum/100;
							$('.sump').text(sump);				 			


				 	}
				 

				 });

	}
	else{
		console.log('结算');
	}
})

//资金相加计算

$('.container ul').on('click','input',function () {
	// if($(this).prop('checked')==true){
	// 	var nowprice=$(this).parent().find('.price').text().substr(1);   //取数据
	// 	var sumd=parseInt(parseFloat(nowprice)*100); //如果转为浮点数js运算会出现很多小数点，所以直接在乘100转整形
	// 	var num=$(this).parent().find('.num').text().substr(1);
	// 	var numd=parseInt(num);
	// 	console.log(sumd);
	// 	console.log(num);
	// 	sum=sum+sumd*numd;
	// 	console.log(sum);
	// 	sump='¥'+sum/100;
	// 	$('.sump').text(sump);

	// }
	// else{
	// 	var nowprice=$(this).parent().find('.price').text().substr(1);   //取数据
	// 	var sumd=parseInt(parseFloat(nowprice)*100); //如果转为浮点数js运算会出现很多小数点，所以直接在乘100转整形
	// 	var num=$(this).parent().find('.num').text().substr(1);
	// 	var numd=parseInt(num);
	
	// 	sum=sum-sumd*numd;
	// 	sump='¥'+sum/100;
	// 	$('.sump').text(sump);
	// }
//换一种算法 不必单单算一个了 还是重新遍历了 因为在删除和全选时候也要用的计算
	var sum=0;
	$('.container ul input').each(function(i,ele){
		if ($(ele).prop("checked")==true) {
			var nowprice=$(ele).parent().find('.price').text().substr(1);   //取数据
			var sumd=parseInt(parseFloat(nowprice)*100); //如果转为浮点数js运算会出现很多小数点，所以直接在乘100转整形
			var num=$(ele).parent().find('.num').text().substr(1);
			var numd=parseInt(num);
			
			sum=sum+sumd*numd;
			console.log(sum);		
		}
	});
	sump='¥'+sum/100;
	$('.sump').text(sump);


	//全选关联
	

});


//全选
$('.dingdan input').on("click",function(){
	$('.container ul input').prop("checked",$(this).prop("checked"));

	//计算金额
	var sum=0;
	$('.container ul input').each(function(i,ele){
		if ($(ele).prop("checked")==true) {
			var nowprice=$(ele).parent().find('.price').text().substr(1);   //取数据
			var sumd=parseInt(parseFloat(nowprice)*100); //如果转为浮点数js运算会出现很多小数点，所以直接在乘100转整形
			var num=$(ele).parent().find('.num').text().substr(1);
			var numd=parseInt(num);
			
			sum=sum+sumd*numd;
			console.log(sum);		
		}
	});
	sump='¥'+sum/100;
	$('.sump').text(sump);
})