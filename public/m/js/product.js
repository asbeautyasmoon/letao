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


//取详情
var chosize;
$.get('/product/queryProductDetail',{id:localparm.productId},function(r){
	 console.log(r);
	 $('.mui-scroll').html(template('det', r));		//这里使用模板引擎 直接传入后台json对象试试

	  mui('.mui-slider').slider({      //注意使用ajax的话，必须要加载完毕后初始化这轮播，不然没反弹
            interval: 2000
        });

     $('.size .numb').on('tap',function(){       //选尺码
     	 $(this).css('background-color','orange').siblings().css('background-color','#efeff4');
     	 chosize=$(this).text();
     });

      $('.num .jian').on('tap',function(){       //数量
      		var gms=parseInt($('.num .gms').val());
      		
      		if (isNaN(gms)) {
      			mui.toast('数量不能为空');
      			return;
      		}
      		gms--;
      		if(gms < 0){
      			mui.toast('数量不能小于0');
      			return false;
      		}
      		if (gms>r.num) {
      			mui.toast('库存不足');    //这里不能return ，在输入大于库存的情况下，只要提示就行了 减还是减的
      			
      		}
      		
      		$('.num .gms').val(gms);
      }); 

      $('.num .jia').on('tap',function(){ 	   
      		var gms=parseInt($('.num .gms').val());
      		console.log(gms);     //注意空值parseInt是nan 但是判断不能直接用nan， 也不能用！gms 因为0是false
      		if (isNaN(gms)) {
      			mui.toast('数量不能为空');
      			return;
      		}
      		gms++;
      		if (gms>r.num) {
      			mui.toast('库存不足');
      			return;
      		}
      		if(gms < 0){
      			mui.toast('数量不能小于0');
      		}   				
      		$('.num .gms').val(gms);
      }); 

      $('.joincart').on('tap',function () {      //加入购物车
      		var gms=parseInt($('.num .gms').val());	
      		if(gms<=0 || gms>r.num || isNaN(gms)){      // 用否定判断的话 判断的宽度广，但是代码逻辑好写(把不要的否掉退出即可)
      			mui.toast('请您输入正确的数量');
      			return;
      		}	
      		if (!chosize) {
      			mui.toast('请您选择尺码');
      			return;
      		}

      		canshu={
      			productId:localparm.productId,
      			num:gms,
      			size:chosize,
      		};
      		$.post('/cart/addCart',canshu,function (r) {        //购物车提交后，后台还有个登陆判断，前端做好数量尺寸的判断提交后，后台再判断登陆，未登录的会返回信息
      			console.log(r);
      			if(r.error){
      				mui.toast(r.message);
      				if(r.error == 400){
	                location.href = '/m/user/login.html' + '?returnUrl=' + location.href;
	                return false;
	      			}
	      		}	
      			if(r.success){
      				 mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function(e) {
                            if (e.index == 0) {
                                location.href = '/m/user/cart.html';
                            } else {
                                //TODO
                            }
                        })
      			}
      		});


      		
      });


})


//区域滚动
  mui('.mui-scroll-wrapper').scroll({
            indicators: false
        });


