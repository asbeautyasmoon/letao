
 $.get('/address/queryAddress',{},function(r) {
 	if(r.error==400){
 		//window.stop();
 		location.href = '/m/user/login.html' + '?returnUrl=' + location.href;
 		
 	}
 	else{
 		//console.log(location.href.search());
 		if(location.search.indexOf('id')!= -1){
 			//console.log(location.search.substr(3));
 			var id= parseInt(location.search.substr(4));
 			$('h1').text('编辑收货地址');

 			console.log(r);
 //后台居然不能根据id来查询??
            for (var i = 0; i < r.length; i++) {
            	 // console.log(r[i].id);
            	 // console.log(id);
            	 if (r[i].id==id) {
            	 	
            	 	$('.name textarea').val(r[i].recipients);
            	 	$('.mobl textarea').val(r[i].mobile);
            	 	$('.mail textarea').val(r[i].postCode);
            	 	$('.city textarea').val(r[i].address);
            	 	$('.adr textarea').val(r[i].addressDetail);
            	 }
            	 $('.zs').css('display','none');	
 		   }
 		
 		   $('.save').on("click",function (e) {
 		   		  e.preventDefault();    //阻止默认提交
 		   	     var adss=$('form').serialize();
 		   	     //console.log(adss);

 		   	     //转为json
 		   	     var arrk=adss.split('&');  //没有该字符也能直接变为数组
				 var localparm={};
				 for (var i = 0; i < arrk.length; i++) {
				 	 var arrkd=arrk[i].split('=');    //把=两边也分解为数组 
				 	 localparm[arrkd[0]]=decodeURI(arrkd[1]) ;   //  把数组转为对象  对中文的url直接转换 严格点其实还应进行编码判断
				 }
				 console.log(localparm);

				 $.post('/address/updateAddress',{      //这里电话没有提供修改接口
				 	'id':id,

					address:localparm.city,
					addressDetail:localparm.adr,
					recipients:localparm.name,
					postcode:localparm.mail,
				 },function(j){
				 	console.log(j);
				 	if (j.success) {
				 		mui.toast('修改成功');
				 		location.href='adress.html';
				 	}
				 	if (r.error==400) {
				 		location.href = '/m/user/login.html' + '?returnUrl=' + location.href;
				 	}
				 	else{
				 		mui.toast('修改失败');
				 	}

				 });



 		   });



 		}

 		else{
 			
 			$('h1').text('添加新地址');
 			$('.zs').css('display','none');
 			
 			 $('.save').on("click",function (e) {
 		   		  e.preventDefault();    //阻止默认提交
 		   	     var adss=$('form').serialize();
 		   	     //console.log(adss);

 		   	     //转为json
 		   	     var arrk=adss.split('&');  //没有该字符也能直接变为数组
				 var localparm={};
				 for (var i = 0; i < arrk.length; i++) {
				 	 var arrkd=arrk[i].split('=');    //把=两边也分解为数组 
				 	 localparm[arrkd[0]]=decodeURI(arrkd[1]) ;   //  把数组转为对象  对中文的url直接转换 严格点其实还应进行编码判断
				 }
				 console.log(localparm);

				 $.post('/address/addAddress',{      //这里电话没有提供修改接口
				 	'id':id,

					address:localparm.city,
					addressDetail:localparm.adr,
					recipients:localparm.name,
					postcode:localparm.mail,
				 },function(j){
				 	if (j.success) {
				 		mui.toast('增加成功');
				 		location.href='adress.html';

				 	}
				 	if (r.error==400) {
				 		location.href = '/m/user/login.html' + '?returnUrl=' + location.href;
				 	}
				 	else{
				 		mui.toast('增加失败');
				 	}
				 });



 		   });


 			
 		 }
 		

  	}

 });

console.log($('form').serialize());