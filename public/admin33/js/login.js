$(function () {
    /*初始化校验插件*/
    /*1.是form表单结构 并且有一个提交按钮*/
    /*2.折插件就是jquery插件 样式和bootstrap风格一致*/
    $('#login').bootstrapValidator({
        /*配置校验的不同状态下显示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*需要校验的表单元素 通过名称 name*/
        fields: {
            /*对应表单元素的name*/
            username: {
                /*校验规则 多个校验规则*/
                validators: {
                    notEmpty: {
                        message: '请输入用户名'
                    },
                    /*配置一个校验规则*/
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '请输入密码'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码必须是6-18个字符'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        /*校验成功的时候出发*/
        /*组织表单的默认提交  使用ajax提交*/
        e.preventDefault();
        /*后台校验用户名和密码*/
        var $form = $(e.target);
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            dataType:'json',
            success:function (data) {
                /*业务成功*/
                if(data.success == true){
                    /*跳转后台的首页*/
                    location.href = '/admin33/';
                }
                /*业务失败*/
                else {
                    if(data.error == 1000){
                        /*用户名错误*/
                        /*设置用户名这个表单元素的校验状态为失败*/
                        /*NOT_VALIDATED 还没校验, VALIDATING 校验中, INVALID 失败 or VALID 成功*/
                        /*1.获取校验组件*/
                        /*2.调研更改状态的函数*/
                        /*3.校验的表单，改成什么状态，使用哪个校验规则*/
                        $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                    }else if(data.error == 1001){
                        /*密码错误*/
                        $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                    }
                }
            }
        });
    });
});