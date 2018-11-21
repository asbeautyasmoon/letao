var conthtml=
'		  <div class="panel-heading clearfix">'+
'			<div class="col-xs-2">'+
'				<div class="brand">'+
'					<a href="index.html">ITCAST</a>'+
'				</div>	'+
'			</div>'+
'				<div class=\'out\'>'+
'					<span class="glyphicon glyphicon-log-out"></span>'+
'				</div>'+
'		  </div>'+
'	 '+
'	    <aside class="cebianlan col-xs-2 ">'+
'			 '+
'		    <!--用户-->'+
'		    <div class="user">'+
'		        <img src="images/default.png" alt=""/>'+
'		        <span>超级管理员</span>'+
'		    </div>'+
'		    <!--菜单-->'+
'		    <div class="menu">'+
'		        <ul>'+
'		            <li class="now"><a href="userManage.html"><span class="glyphicon glyphicon-user"></span> 用户管理</a></li>'+
'		            <li class="fl">'+
'		                <a href="javascript:;"><span class="glyphicon glyphicon-list"></span> 分类管理</a>'+
'		                <div class="child" style="display: none">'+
'		                    <a  href="cate.html">一级分类</a>'+
'		                    <a href="catesecond.html">二级分类</a>'+
'		                </div>'+
'		            </li>'+
'		            <li><a href="productManage.html"><span class="glyphicon glyphicon-tags"></span> 商品管理</a></li>'+
'		        </ul>'+
'		    </div>'+
'	    </aside>';

document.getElementsByClassName('panel-primary')[0].innerHTML=conthtml;  //在哪里插入就直接用html就行
//或者用创建元素再添加的方法 不过要多套一层，再或者用jq的append就不需要再添加一层
// div.innerHTML=conthtml;
// document.getElementsByTagName('body')[0].appendChild(div);
// 
// 点击左边菜单添加类
var li=document.querySelectorAll('.menu li');
	for (var i = 0; i < li.length; i++) {
		li[i].onclick=function(e){
		//e.preventDefault();   //阻止跳转
		console.log(this);
		document.querySelector('.menu .now').classList.remove('now');
		this.classList.add('now');

	}
}


//左边菜单二级
// var lia=document.querySelectorAll('.menu .child a');
// 	for (var i = 0; i < lia.length; i++) {
// 		lia[i].onclick=function(e){
// 		e.preventDefault();   //阻止跳转
// 		e.stopPropagation(); 	//阻止冒泡
// 		console.log(this);
// 		document.querySelector('.menu .child .now').classList.remove('now');
// 		this.classList.add('now');

// 	}
// }

