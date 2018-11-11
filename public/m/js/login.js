 

$('.mui-btn-primary').on('click',function () {
	var input=$('#login1').serialize();   //通过jq取表单值 
	//console.log(input);   //注意表单必须要有name
	
	//把url转为json	                   
	 var arrk=input.split('&');  //没有该字符也能直接变为数组
	 var localparm={};
	 for (var i = 0; i < arrk.length; i++) {
	 	 var arrkd=arrk[i].split('=');    //把=两边也分解为数组 
	 	 localparm[arrkd[0]]=decodeURI(arrkd[1]) ;   //  把数组转为对象  对中文的url直接转换 严格点其实还应进行编码判断
	 }
	 console.log(localparm); 


	 //通过后台接口验证
	 $.post('/user/login',localparm,function(r){
	 	console.log(r);
	 	if (r.error) {
	 		mui.toast(r.message);
	 	}
	 	if(r.success){
	 		if(window.location.search.substr(1).indexOf('returnUrl')!=-1){	  //如果地址栏含有returnUrl
	 			//location.href=window.location.search.substr(1).replace('returnUrl=','');
	 				location.href=window.location.search.substr(1).substr(10);
	 		}
	 		else{
	 			location.href='/m/index.html';
	 		}
	 	}
	 })

})

 
