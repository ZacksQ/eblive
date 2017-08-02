		function onConnect() {
		    console.log('连接成功');
		    nim.getChatroomAddress({
			    chatroomId: room_info["chatroomid"],
			    done: getChatroomAddressDone
			});
			// $(".btn-box").show();
		}
		function onWillReconnect(obj) {
		    // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
		    console.log('即将重连');
		    console.log(obj.retryCount);
		    console.log(obj.duration);
		}
		function onDisconnect(error) {
		    // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
		    console.log('丢失连接');
		    console.log(error);
		    if (error) {
		        switch (error.code) {
		        // 账号或者密码错误, 请跳转到登录页面并提示错误
		        case 302:
		            break;
		        // 被踢, 请提示错误后跳转到登录页面
		        case 'kicked':
		            break;
		        default:
		            break;
		        }
		    }
		    show_weui_alert("","服务器受到了莫名力量的干扰，即将返回首页");
		    setTimeout(function(){window.location.href="index.html";},2500);
		}
		function onError(error) {
		    console.log(error);
		}

		function disconnect(){
			nim.disconnect()
		}
		
		var chatroom=null
		function getChatroomAddressDone(error, obj) {
		    // console.log('获取聊天室地址' + (!error?'成功':'失败'), error, obj);
			    chatroom = Chatroom.getInstance({
				    appKey: data.appKey,
				    account: data.account,
				    token: data.token,
				    chatroomId: obj.chatroomId,
				    chatroomAddresses: obj.address,
				    chatroomCustom: data.chatroomCustom,
				    onconnect: onChatroomConnect,
				    onerror: onChatroomError,
				    onwillreconnect: onChatroomWillReconnect,
				    ondisconnect: onChatroomDisconnect,
				    // 消息
				    onmsgs: onChatroomMsgs
				});			
		}
		var mychatroom=null;
		var userlevel=1;
		var levelicon={};
		function onChatroomConnect(chatroom) {
			    // console.log('进入聊天室', chatroom);				
			    mychatroom=chatroom;
			   
			    // console.log("用户level",userlevel["level"]);
			}
			function onChatroomWillReconnect(obj) {
			    // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
			    console.log('即将重连', obj);
			}
			function onChatroomDisconnect(error) {
			    // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
			    console.log('连接断开', error);
			    if (error) {
			        switch (error.code) {
			        // 账号或者密码错误, 请跳转到登录页面并提示错误
			        case 302:
			            break;
			        // 被踢, 请提示错误后跳转到登录页面
			        case 'kicked':
			            break;
			        default:
			            break;
			        }
			    }
			    window.location.href=window.location.href;
			}
			// var viewnum=document.getElementById("viewnum");
			function onChatroomError(error, obj) {
			    console.log('发生错误', error, obj);
			}
			function onChatroomMsgs(msgs) {
			    console.log('收到聊天室消息', msgs);

			    showMsg(msgs[0]);
			}

			function sendChatroomMsgDone(error, msg) {
				console.log('发送聊天室' + msg.type + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient, error, msg);
				document.getElementById("send_msg_text").value="";
				$("body,html").scrollTop(0);
        		$(".video-discuss-tool").show();
        		$(".video-discuss-form").hide();
				showMsg(msg);
			}

			function onSendMsg(){
				var txt=document.getElementById("send_msg_text").value;
				var msg = chatroom.sendText({
				    text: txt,
				    done: sendChatroomMsgDone
				});
				console.log('正在发送聊天室text消息, id=' + msg.idClient);
			}

			function showMsg(msg){
				switch(msg["type"]){	
					case "text":
					     userlevel=msg["fromCustom"];
			    userlevel=eval("("+userlevel+")");
			    userlevel=userlevel["level"];
			    for(var levdis in level_info){
			    	var dis=levdis.split('_');
			    	var min=parseInt(dis[0]);
			    	var max=parseInt(dis[1]);
			    	// console.log(userlevel>=min && userlevel<=max);
			    	if(userlevel>=min && userlevel<=max){
			    		levelicon=level_info[levdis];
			    		// console.log(levelicon);

			    	}
			    }
						var msglist=document.getElementById("video_sms_list");
						var msgli=document.createElement("li");
						// msg["fromCustom"]
						msgli.innerHTML="<span style='background-color:"+levelicon[1]+"'><img src='images/"+levelicon[0]+"'>"+userlevel+"</span> "+"<span>"+msg["fromNick"]+"</span> "+msg["text"];
						msglist.appendChild(msgli);
						$(".msg-box").scrollTop($(".msg-box ul").height());
					break;
					// case "notification":
					// 	switch(msg["attach"]["type"]){
					// 		case "memberExit":								
					// 			if(msg["flow"]=="in"){
					// 				viewnum.innerText=parseInt(viewnum.innerText)-1;
					// 			}else{
					// 				viewnum.innerText=mychatroom["chatroom"]["onlineMemberNum"];
					// 			}
					// 		break;
					// 		case "memberEnter":
					// 			if(msg["flow"]=="in"){
					// 				viewnum.innerText=parseInt(viewnum.innerText)+1;
					// 			}else{
					// 				viewnum.innerText=mychatroom["chatroom"]["onlineMemberNum"];
					// 			}
					// 		break;
					// 	}
					// break;
				}

			}