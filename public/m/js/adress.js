 $.get('/address/queryAddress',{},function(rd) {
 	if(rd.error==400){
 		//window.stop();
 		location.href = '/m/user/login.html' + '?returnUrl=' + location.href;
 		
 	}
 	else{
 		//这个地址需要遍历：
 		$('.name span').text(rd[0].recipients);
 		$('.mail span').text(rd[0].postCode);
 		$('.city span').text(rd[0].address);
 		$('.adr span').text(rd[0].addressDetail);


 		 window.onload=function () {       //如果用js生成的话就不用onlaod了         
 		 	$('.zs').css('display','none');
 			console.log(rd);
 		 }
 		 
 	}
 });