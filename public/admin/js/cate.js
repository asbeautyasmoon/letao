$('.menu li.fl').addClass("now").siblings().removeClass("now");
$('.menu li.fl').find('.child').slideToggle();
$('.menu li.fl .child a:first').addClass("now");

//进度条
NProgress.configure({ showSpinner: false });
$(window).ajaxStart(function () {                //这个要写在ajax请求前
    NProgress.start();                      
});
$(window).ajaxComplete(function () {
    /*结束进度条*/
    NProgress.done();
});




var persize=5;    //设置每页查询几条
var nowpage=1;	   //设置查询第几页

	$.get('/category/queryTopCategoryPaging',{page:nowpage,pageSize:persize},function(r){    //接口判断是否登录， 第一次默认查询
			console.log(r);
			for (var i = 0; i < r.rows.length; i++) {
			 
				$('.yijifl tbody').prepend('<tr><td>'+r.rows[i].id+'</td><td>'+r.rows[i].categoryName+'<button type="button" class="btn btn-info" data-id='+r.rows[i].id+'>修改</button></td></tr>')
			}




			//点击添加按钮
			$('#addBtn').on('click',function(){
				$('#addModal').fadeIn();   

			});

			var addf=$('#addModal input').val();
			$('#addModal .modal-footer .sure').on('click',function(){                 //点击添加一级分类
				$.post('/category/addTopCategory',{categoryName:addf},function(r){   //为何添加不进去？
					console.log(r);
					if (r.success) {
						$('#addModal').fadeOut();

							$('.yijifl tbody').empty();                                  //重新发送刷新
							$.get('/category/queryTopCategoryPaging',{page:nowpage,pageSize:persize},function(r){  
								for (var i = 0; i < r.rows.length; i++) {
									$('.yijifl tbody').prepend('<tr><td>'+r.rows[i].id+'</td><td>'+r.rows[i].categoryName+'</td></tr>')
								}
							});

					}
					
				});
			});
			$('#addModal [data-dismiss]').on('click',function(){
				$('#addModal').fadeOut();
			})



           //点击修改按钮
           $('.btn-info').on('click',function(){
				var cid=$(this).data('id');
				$('#addModal').fadeIn();  
				var xiuf=$('#addModal input').val();
				$('#addModal .modal-footer .sure').on('click',function(){                
					$.post('/category/addTopCategory',{id:cid,categoryName:xiuf,isDelete:是},function(r){     //这个修改修改接口也有问题
						console.log(r);
						if (r.success) {
							$('#addModal').fadeOut();

								$('.yijifl tbody').empty();                                  //重新发送刷新
								$.get('/category/queryTopCategoryPaging',{page:nowpage,pageSize:persize},function(r){  
									for (var i = 0; i < r.rows.length; i++) {
										$('.yijifl tbody').prepend('<tr><td>'+r.rows[i].id+'</td><td>'+r.rows[i].categoryName+'</td></tr>')
									}
								});

						}
						
					});
				});;	


			})







		//这个是退出登录模态框
			$('.out').on('click',function(){
				$('#myModal').fadeIn();   

			});
			$('#myModal .modal-footer .sure').on('click',function(){    
				$.get('/employee/employeeLogout',{},function(r){
					if (r.success) {
						location.href='login.html';
					}
					
				});
			});
			$('#myModal [data-dismiss]').on('click',function(){
				$('#myModal').fadeOut();
			})
	 //

	 //分页插件
			
			    new Page({
			        id: 'pagination',
			        pageTotal: Math.ceil(r.total/persize), //必填,总页数
			        pageAmount: persize,  //每页多少条
			        dataTotal: r.total, //总共多少条数据
			        curPage: nowpage, //初始页码,不填默认为1
			        pageSize: 5, //分页个数,不填默认为5
			        showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
			        showSkipInputFlag:true, //是否支持跳转,不填默认不显示
			        getPage: function (page) {
			            //page为当前页数
			             nowpage=page;
			             $('.yijifl tbody').empty();                                  //重新发送刷新
						 $.get('/category/queryTopCategoryPaging',{page:nowpage,pageSize:persize},function(r){  
									for (var i = 0; i < r.rows.length; i++) {
										$('.yijifl tbody').prepend('<tr><td>'+r.rows[i].id+'</td><td>'+r.rows[i].categoryName+'</td></tr>')
									}
						});
	


			        }
			    })

			








		});

			