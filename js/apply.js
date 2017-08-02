//提交主播申请资料
function applyAnchroForm(nickname,school,name,sex,qq,password){
	var fd = new FormData();
	fd.append("userinfo.nikename",nickname);
	fd.append("userinfo.school",school);
	fd.append("userinfo.studentName",name);
	fd.append("vvsex",sex);
	fd.append("userinfo.qq",qq);
	fd.append("userinfo.password",password);
	fd.append("vstudentimg", $("#file").get(0).files[0]);
	$.ajax({
		type:"post",
		url:"userinfo/applyAnchorJson.do",
		dataType:"json",
		processData: false,
		contentType: false,
		data:fd,
		success:function(data){
			if(data["message"] == "success"){
				alert("申请成功！跳转到个人界面");
				location.pathname = "club/mymsg/myMsgAction.do";
				
			}else{
				alert("亲，登陆失效了。请重新登陆！")
			}
		}
	})
}

$(function(){
	
    //检查上传的照片格式是否正确
    function checkFileType(dom){
        var filePath = dom.value;
        if( filePath ){
            var extname = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length).toLowerCase();
            if(extname!= "bmp" && extname!= "jpg" && extname!= "gif" && extname!= "png"&& extname!= "jpeg" ){
                _PAGE.alert("只能上传照片");
                return false;
            }else{
                if( dom.files[0].size/1024 > 15000 ){
                    _PAGE.alert("图片不能大于15M");
                    return false;
                }
                return true;
            }
        }else{
            _PAGE.alert("请上传照片");
            return false;
        }
    }

    //文件事件
    $("#file").bind("change",function(){
        if(checkFileType( $("#file")[0])){
        	
            function fileSelected(newDiv)
            {
                var oFile = document.getElementById(newDiv.id).files[0];
                var oReader = new FileReader();
                oReader.onload = function(e){
                    appendDom( e.target.result );
                    $("#file").data("src",e.target.result );
                };
                oReader.readAsDataURL(oFile);
            }

            function appendDom( src ){
                $("#photo").css("background","url("+src+") #666  no-repeat center");
                $("#photo").css("background-size","contain");
            }
            fileSelected($("#file")[0]);

            $("#photo").css("display","block");
        }
        event.preventDefault();
    });

    //按钮:添加图片
    $("#btn_add").click(function(){
        $("#file").click();
        event.preventDefault();
    });

    //按钮:是否同意协议
    $("#checkbox").bind("click",function(){
    	
        if(   $(this).parent().attr("class") == "ok" )
        {
            $(this).parent().attr("class","no");
        }
        else
        {
            $(this).parent().attr("class","ok");
        }
        event.preventDefault();
    });

    //按钮:提交
    $("#submit").bind("click",function(event){
        var nickname = $("#nickname").val().replace(/\s/g,"");
        if( nickname=="" )
        {
            _PAGE.alert("请输入昵称");
            return;
        }
        var school = $("#school").val().replace(/\s/g,"");
        if( !school.match( /^[\u4E00-\u9FA5]{2,30}(?:·[\u4E00-\u9FA5]{2,30})*$/))
        {
            _PAGE.alert("请输入学校");
            return;
        }
        var name = $("#name").val().replace(/\s/g,"");
        if( !name.match( /^[\u4E00-\u9FA5]{2,7}(?:·[\u4E00-\u9FA5]{2,7})*$/ ) )
        {
            _PAGE.alert("请输入正确的姓名");
            return;
        }
        // var sex = $("#sex").val().replace(/\s/g,"");
        // if( sex=="")
        // {
        //     _PAGE.alert("请输入性别");
        //     return;
        // }else  if( sex!="男" && sex!="女" )
        // {
        //     _PAGE.alert("请输入正确的性别");
        //     return;
        // }
        var qq = $("#QQ").val().replace(/\s/g,"");
        if( qq == "" )
        {
            _PAGE.alert("请输入正确的QQ或微信号");
            return;
        }
        if(  !$("#file").data("src") )
        {
            _PAGE.alert("请上传学生证");
            return;
        }
        var phone = $("#phone").val().replace(/\s/g,"");
        if( !phone.match( /^[1]+[3,4,5,7,8]+\d{9}/) )
        {
            _PAGE.alert("请输入正确的手机号");
            return;
        }
        var code = $("#code").val().replace(/\s/g,"");
        if( code == "" )
        {
            _PAGE.alert("请输入正确的验证码");
            return;
        }
        var password = $("#password").val().replace(/\s/g,"");
        if( password == "" )
        {
            _PAGE.alert("请输入密码");
            return;
        }
        var repassword = $("#repassword").val().replace(/\s/g,"");
        if( password != repassword )
        {
            _PAGE.alert("两次密码不一致");
            return;
        }

        if(    $("#checkbox").parent().attr("class") != "ok"  )
        {
            _PAGE.alert("请同意协议");
            return;
        }
        //这里是接口，向后台提交表单
        event.preventDefault();  
        $.ajax({
    		type:"post",
    		url:"userinfo/checkCodeJson.do",
    		dataType:"json",
    		data:{
    			"vcode":code
    		},
    		success:function(data){
    			if(data["message"] == "success"){
    				applyAnchroForm(nickname,school,name,sex,qq,password);
    			}else if(data["message"] == "codeError"){
    				alert("验证码错误！");
    			}else if(data["message"] == "codelose"){
    				alert("验证码已失效！");
    			}else{
    				alert("亲,登陆失效了！请重新登陆");
    			}
    		}		
    	})
        
    	
    });

    
    //发送验证码
    $("#btn_send").bind("click",function(event){
    	event.preventDefault();
    	
        var phone = $("#phone").val().replace(/\s/g,"");
        if( !phone.match( /^[1]+[3,4,5,7,8]+\d{9}/) )
        {
            _PAGE.alert("请输入正确的手机号");
            return;
        }
        
        
        //发送验证码
        $.ajax({
        	type:"post",
        	url:"userinfo/sendSmsJson.do",
        	dataType:"json",
        	data:{
        		"vphone":phone,
        	},
        	success:function(data){
        		alert(data["message"]);
        	}
        });
    })
    
});







