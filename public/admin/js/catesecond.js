$('.menu li.fl').addClass("now").siblings().removeClass("now");
$('.menu li.fl').find('.child').slideToggle();
$('.menu li.fl .child a:last').addClass("now");

//进度条
NProgress.configure({ showSpinner: false });
$(window).ajaxStart(function () {                //这个要写在ajax请求前
    NProgress.start();                      
});
$(window).ajaxComplete(function () {
    /*结束进度条*/
    NProgress.done();
});




var qqsjscym=function(fn){    //封装个请求数据生成页面的函数
	$.get('/category/querySecondCategoryPaging',{page:nowpage,pageSize:persize},function(r){    //接口判断是否登录， 第一次默认查询
			console.log(r);
			$('.erjifl tbody').empty();   
			for (var i = 0; i < r.rows.length; i++) {			 
				$('.erjifl tbody').prepend('<tr><td>'+r.rows[i].id+'</td><td>'+r.rows[i].categoryName+'</td><td>'+r.rows[i].brandName+'</td><td><img src="'+r.rows[i].brandLogo+'"><button type="button" class="btn btn-info" data-id='+r.rows[i].id+'>修改</button></td></tr>');
			}
			fn && fn(r);
	});		
};

//默认第一次渲染
var persize=2;    //设置每页查询几条
var nowpage=1;	   //设置查询第几页
qqsjscym(function(r){
		    new Page({                 //分页初始化
			        id: 'pagination',
			        pageTotal: Math.ceil(r.total/persize), //必填,总页数
			        pageAmount: persize,  //每页多少条
			        dataTotal: r.total, //总共多少条数据
			        curPage: nowpage, //初始页码,不填默认为1
			        pageSize: 5, //分页个数,不填默认为5
			        showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
			      //  showSkipInputFlag:true, //是否支持跳转,不填默认不显示
			        getPage: function (page) {    //点击页码时的动作
			            //page为当前页数
			             nowpage=page;
			             qqsjscym();                          //重新发送刷新
						  


			        }
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
			});



	 	//点击添加分类的模态框
		 	$('#addBtn').on('click',function(){                 //模态框的生成
					$('#addModal').fadeIn();   

			});

		 	$('#dropdownMenu1').on('click',function(){            //下拉菜单切换
		 		$('#addModal .dropdown-menu').slideToggle();
		 	})

		 	$.get('/category/queryTopCategoryPaging',{page:1,pageSize:1000},function(r){       //一级分类菜单内容，假设1000为最大值，这个其实需要后端查询数据库的接口设置全部查询！
		 		if(r){                                        //后端应该有查询成功或者失败标识，不能直接传入数据
		 			for (var i = 0; i < r.rows.length; i++) {
		 				$('#addModal .dropdown-menu').prepend('<li data-id="'+r.rows[i].id+'"><a href="javascript:;">'+r.rows[i].categoryName+'</a></li>');
		 			}
		 			$('#addModal .dropdown-menu li').on('click',function(){
		 				$('#addModal .dropdown-menu').slideToggle();
		 				var yijiid=$(this).data('id');            //取得点击时的该分类id
		 				$('#addModal .dropdown button').text($(this).find('a').text());
		 				$('input[name="yijiflm"]:first').val(yijiid);         //这个赋值是为了插件验证
		 				$('#form1').data('bootstrapValidator').updateStatus("yijiflm",  "NOT_VALID");   //更改状态为未验证
		 				$('#form1').data('bootstrapValidator').validateField('yijiflm');  //重新验证
		 			});
		 		}
		 				
		 	});
			//var addf=$('#addModal input[type="text"]').val();        //获取输入的二级分类名


			$('#addModal input[type="file"]').on("change", function(){     //图片上传功能 ，注意我们把原生的input透明移动到按钮上，造成按纽选择图片的效果
				  var formData = new FormData("");                          		//创建formdata对象
				  formData.append("pic1", $('#addModal input[type="file"]')[0].files[0]);         //在form添加input的name和value ---这个$('#addModal input[type="file"]')[0].files里面有文件名等信息，一定要再往下取具体的
				  var that=this;     //其实这个就是$('#addModal input[type="file"]')[0]
				//  console.log(formData.get("pic1"));   注意，这个formdata不能直接通过formData在控制台显示

				  $.ajax({                                                  //先把图片传到后台，成功后再在预览本地图片 或者从服务端返回图片的预览
      					  url:'/category/addSecondCategoryPic',
					      type: "POST",
					    
					      data: formData,
					      processData: false,   //不要对data参数进行序列化处理，默认为true
					      contentType: false,	// 不要设置Content-Type请求头，因为文件数据是以 multipart/form-data 来编码
					      success: function(response){
					             // console.log(response);   //这里后端传过来是个地址，其实最好是个预览图，当然我们不用这个 用本地预览
					             if (response.picAddr) {
					             	//使用本地预览
								     var imgread=new FileReader();
									imgread.readAsDataURL(that.files[0]);
									imgread.onload=function () {	
										$('#picadd').attr('src',imgread.result);
										$('#addModal input[name="erjitu"]').val(response.picAddr);
										$('#form1').data('bootstrapValidator').updateStatus("erjitu",  "VALID");  //验证手动通过
									}	 
					             }
					      }
					  });	 	
			 })


		//添加分类表单的前端有效性验证
		 $('#form1').bootstrapValidator({
		        	live: 'enabled',//验证时机，enabled是内容有变化就验证（默认），disabled和submitted是提交再验证
		            excluded: [],//排除无需验证的控件，比如被禁用的或者被隐藏的  注意 这里是要清空值，不是直接删掉这个选项
		            submitButtons: '#addModal .sure',//指定提交按钮 这个就是说如果验证不通过会把这个按钮变灰
		            message: '通用的验证失败消息',//?未触发
					feedbackIcons: {
		                　　　　　　　　valid: 'glyphicon glyphicon-ok',
		                　　　　　　　　invalid: 'glyphicon glyphicon-remove',
		                　　　　　　　　validating: 'glyphicon glyphicon-refresh'
		            　　　　　　　　   },
		            fields: {
		                addm:{                    //input的name
		                  
		                    validators: {
		                        notEmpty: {
		                            message: '不能为空'
		                        },
		                     
		                    }
		                },
		                erjitu:{                    //input的name
		                  
		                    validators: {
		                        notEmpty: {
		                            message: '不能为空'
		                        },
		                     
		                    }
		                },
		                yijiflm:{                    //input的name
		                  
		                    validators: {
		                        notEmpty: {
		                            message: '不能为空'
		                        },
		                     
		                    }
		                },

		            }
		        });



		   $('#addModal .modal-footer .sure').on('click',function(){                 //点击添加按钮
		   		console.log($("#form1").serialize());
		   		$("#form1").bootstrapValidator('validate');  //提交验证
	 			if ($("#form1").data('bootstrapValidator').isValid()) {

					$.post('/category/addSecondCategory',{brandName:$('input[name="addm"]:first').val(),categoryId:$('input[name="yijiflm"]:first').val(),brandLogo:$('input[name="erjitu"]:first').val(),hot:0},function(r){   //为何添加不进去？
						console.log(r);      //接口又有错误
						if (r.success) {
							$('#addModal').fadeOut();
							nowpage=1;
							qqsjscym(function(r){					//重新发送刷新
									    new Page({                 //分页初始化
										        id: 'pagination',
										        pageTotal: Math.ceil(r.total/persize), //必填,总页数
										        pageAmount: persize,  //每页多少条
										        dataTotal: r.total, //总共多少条数据
										        curPage: nowpage, //初始页码,不填默认为1
										        pageSize: 5, //分页个数,不填默认为5
										        showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
										      //  showSkipInputFlag:true, //是否支持跳转,不填默认不显示
										        getPage: function (page) {    //点击页码时的动作
										            //page为当前页数
										             nowpage=page;
										             qqsjscym();                          //重新发送刷新
										        }
										    });                                 
								

							});

							//重置
							 $("#form1").data('bootstrapValidator').resetForm();   //重置
						     $("#form1")[0].reset();   //表单全部重置  ，注意无法清空 hidden的属性 需要直接设置val 
						     $('input[name="yijiflm"]:first').val('');
						     $('input[name="erjitu"]:first').val('');
						     $('#addModal .dropdown button').text('请选择'); 
						     $('#picadd').attr('src','images/none.png'); 		

						 }
				 	});
				}
			});
			$('#addModal [data-dismiss]').on('click',function(){
				$('#addModal').fadeOut();
			    $("#form1").data('bootstrapValidator').resetForm();   //重置
			     $("#form1")[0].reset();   //表单全部重置  ，注意无法清空 hidden的属性 需要直接设置val 
			     $('input[name="yijiflm"]:first').val('');
			     $('input[name="erjitu"]:first').val('');
			     $('#addModal .dropdown button').text('请选择'); 
			     $('#picadd').attr('src','images/none.png'); 
			})















});   



