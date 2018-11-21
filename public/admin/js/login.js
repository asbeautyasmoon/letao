//表单验证插件：
//配置规则：
//			notEmpty：非空验证；
// 			stringLength：字符串长度验证；
// 			regexp：正则表达式验证；
// 			emailAddress：邮箱地址验证（都不用我们去写邮箱的正则了~~
// 			base64：64位编码验证；
// 			between：验证输入值必须在某一个范围值以内，比如大于10小于100；
// 			creditCard：身份证验证；
// 			date：日期验证；
// 			ip：IP地址验证；
// 			numeric：数值验证；
// 			phone：电话号码验证；
// 			uri：url验证；
// 			callback:自定义的错误名称，好像用随意的名称不行
//
//常用事件：
//重置某一单一验证字段验证规则 $(formName).data(“bootstrapValidator”).updateStatus("fieldName",  状态,  规则 ); ---/*NOT_VALIDATED 还没校验, VALIDATING 校验中, INVALID 失败 or VALID 成功*/
//手动触发表单验证 $(formName).data(“bootstrapValidator”).validateField('fieldName');
//如果不用按钮禁用，单纯想在验证成功后才触发事件：var bootstrapValidator = form.data('bootstrapValidator');
												// bootstrapValidator.on('success.form.bv', function (e) {  或者直接在 $('form').bootstrapValidator(）.on('success.form.bv', function (e))
    								// 				e.preventDefault();
   									// 							 //提交逻辑
												// 				});
//方法：手动验证表单：  $("form").bootstrapValidator('validate');  //提交验证
//		验证是否通过  .isValid()) 
//		/重置  $("#form1").data('bootstrapValidator').resetForm();   /
	 $(function () {
        $('form').bootstrapValidator({
        	live: 'enabled',//验证时机，enabled是内容有变化就验证（默认），disabled和submitted是提交再验证
            excluded: [':disabled', ':hidden', ':not(:visible)'],//排除无需验证的控件，比如被禁用的或者被隐藏的
            submitButtons: '.dl',//指定提交按钮 这个就是说如果验证不通过会把这个按钮变灰
            message: '通用的验证失败消息',//?未触发
			feedbackIcons: {
                　　　　　　　　valid: 'glyphicon glyphicon-ok',
                　　　　　　　　invalid: 'glyphicon glyphicon-remove',
                　　　　　　　　validating: 'glyphicon glyphicon-refresh'
            　　　　　　　　   },
            fields: {
                name: {                    //input的name
                  
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        regexp: {//正则验证
                                regexp: /^[a-zA-Z0-9_\.]+$/,
                                message: '所输入的字符不符要求'
                            },
				        stringLength: {//检测长度
				                min: 1,
				                max: 10,
				                message: '长度必须在1-10之间'
				            },    	
				        callback:{
				        	 message: '用户名错误',
				        }   	
                    }
                },
                pasw: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
  						regexp: {//正则验证
                                regexp: /^[a-zA-Z0-9_\.]+$/,
                                message: '所输入的字符不符要求'
                            },
				        stringLength: {//检测长度
				                min: 1,
				                max: 10,
				                message: '长度必须在1-10之间'
				            },    
				         callback:{
				        	 message: '密码错误',
				        },     

                    }
                }
            }
        });
    });







//点击登陆
$('.dl').on('click',function(){
	 $("form").bootstrapValidator('validate');  //提交验证
	 if ($("form").data('bootstrapValidator').isValid()) {
	 	var input=$('form').serialize();
		//把url转为json	                   
		 var arrk=input.split('&');  
		 var localparm={};
		 for (var i = 0; i < arrk.length; i++) {
		 	 var arrkd=arrk[i].split('=');     
		 	 localparm[arrkd[0]]=decodeURI(arrkd[1]) ;    
		 }

		//注意，jq的ajax 可以直接传入.serialize()的内容，通过查看，可以看到他已经自动转为inputname：value   inputname：value的格式了

		$.post('/employee/employeeLogin',{username:localparm.name,password:localparm.pasw},function(r){
			console.log(r);
			if (r.error==1000) {  //服务器返回错误1000是用户名错误 
				$('form').data('bootstrapValidator').updateStatus("name",  "INVALID",'callback');

			}
			else if (r.error==1001) { 
				$('form').data('bootstrapValidator').updateStatus("pasw",  "INVALID",'callback');
			}
			else if (r.success){
				//location.href='index.html?username='+localparm.name+'&password='+localparm.pasw; //跳转时不能明文
				 location.href='index.html';
			}


		});
	 }
	 
})