//进度条
NProgress.configure({ showSpinner: false });
$(window).ajaxStart(function () {                //这个要写在ajax请求前
    /*只要使用的ajax就会执行这个方法*/
    //开启进度条
 
    NProgress.start();                      
});
$(window).ajaxComplete(function () {
    /*结束进度条*/
    NProgress.done();
});




	$.get('/employee/checkRootLogin',{},function(r){    //接口判断是否登录
		console.log(r);
		if (r.success) {  
			//这个后端也无语了，判断了登陆好歹也给个员工头像地址等等的，什么也没有
			$('.out').on('click',function(){
				$('#myModal').fadeIn();   //看bts的代码，这个模态框原来的js也是有淡入的效果的，所以我这里用fadein，而默认的fade类就被我去除了

			});
			$('.modal-footer .sure').on('click',function(){    //确定后 有返回成功时退出
				$.get('/employee/employeeLogout',{},function(r){
					if (r.success) {
						location.href='login.html';
					}
					
				});
			});
			$('[data-dismiss]').on('click',function(){
				$('#myModal').fadeOut();
			})

	//使用echarts绘制图表
			    /*假设的数据*/
			    var data = [  
			        {
			            name:'一月',
			            value:300
			        },
			        {
			            name:'二月',
			            value:400
			        },
			        {
			            name:'三月',
			            value:500
			        },
			        {
			            name:'四月',
			            value:200
			        },
			        {
			            name:'五月',
			            value:600
			        }
			    ];
			    var xdata = [], sdata = [];     //横坐标的名称数组格式 纵坐标的数字值也是数组格式
			 	for (var i = 0; i < data.length; i++) {
			 			xdata.push(data[i].name);
			 			sdata.push(data[i].value);
			 		}	
			 	//console.log(sdata);
			 	
			 var myChart = echarts.init($('#zzt')[0]);    //初始化，注意要js的dom
			 var option = {
			 				title:{
					            text:'2017年注册人数'      //表的标题
					        },	
					        legend:{					  //图例组件展现了不同系列的标记(symbol)，颜色和名字		
					            data:[{name:'注册人数',}]   //  该项的名字，注意要对应下面的series的name  
					        },
					          tooltip : {                 //点击柱时的说明
      						 },

				   		   xAxis: {
						        type: 'category',
						        //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						    },
						    yAxis: {
						        type: 'value'
						    },
						    series: [{
						        //data: [120, 200, 150, 80, 70, 110, 130],
						        type: 'bar',				//柱状图
						        name:'注册人数',            // 点击时的说明
						        barWidth: '60%',

						    }]
						};
				  option.xAxis.data=xdata;  //把数组传给配置参数
				  option.series[0].data=sdata;    //注意series是个数组，不是纯对象

		     myChart.setOption(option);
		
		    //饼状图 假设数据未格式化导入
		     var myChart2 = echarts.init($('#bzt')[0]);
		     	option = {
				    title : {
				         text: '品牌销售占比',     
				         subtext: '2017年10月',
				         x:'center'                //标题位置
				    },
				    tooltip : {
				     trigger: 'item',          //数据项图形触发提示，主要在散点图，饼图等无类目轴的图表中使用。
							///*series.name  a  */				 //数据格式
				            /*data.name  b */
				            /*data.value  c */
				            /*占比  d */
				        formatter: "  {b} : {c} ({d}%)"    
				    },
				    legend: {
				        orient: 'vertical',
				        left: '20%',     //图例块左右位置
				        data: ['李宁','耐克','阿迪','匡威','回力'],
				    },
				    series : [
				        {	
				        	color:['#c23','#2f5', '#61a', '#d48', '#91c','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],   //可设置各项依次的颜色 没有设置的话会用默认的
				            name: '销量',
				            type: 'pie',
				            radius : '55%',				//饼图的半径。可以为如下类型：number：直接指定外半径值。'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度。
				            center: ['50%', '60%'],       //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
				            data:[
				                {value:335, name:'李宁'},
			                    {value:310, name:'耐克'},
			                    {value:234, name:'阿迪'},
			                    {value:135, name:'匡威'},
			                    {value:1548, name:'回力'}
				            ],
				            itemStyle: {
				            	normal:{       	       //非点击时的样式 统一的样式
				            		// color: ['#a12'],       //设置了会覆盖了上面设置的颜色
				            	},	
				                emphasis: {				//高亮的扇区和标签样式。    这里跟文档的配置相反了 文档中 shadowBlur在 itemStyle里
				                    shadowBlur: 100,    //阴影大小
				                    shadowOffsetX: 0,	
				                    shadowColor: 'rgba(0, 0, 0, 0.5)',
				                    borderColor:'red',   //高亮时的框线
				                }
				            }
				        }
				    ]
				};
			myChart2.setOption(option);	




		}
		else{
			//不需要再写跳转，这里发送请求如果是未登录直接自己做了跳转；
			return;
		}

	});
 

//左边菜单栏的下滑 需用到jq
$('.menu .fl').on("click",function(){
	$(this).find('.child').slideToggle();
})