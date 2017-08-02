/*
	module.js 模块集成
	by zq 2016.12.29
*/
//控制处理模块
var handleControl = (function(){	
	var player = document.createElement("video");
	var playprop = {
		"width" : window.innerWidth,
		"height" : window.innerHeight
	}
	var showEmoji = function(){				
		$(".discuss-input-pannel").toggleClass("showemoji");
		// console.log(emoji);
	};

	var countdown = function(){
		console.log("countdown");
	};

	var getRequest = function(){
      var url = location.search;
       var theRequest = new Object();
       if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          strs = str.split("&");
          for(var i = 0; i < strs.length; i ++) {
             theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
          }
       }
       return theRequest;
    };

    var formatSeconds = function (value) {
    	var countdown_timer = null; 
    	
    	var countdown_timer = setInterval(function(){
    		if(value == 0){
    			clearInterval(countdown_timer);
    			handleControl.showPlayer();
    			return false;
    		}
    		var second = parseInt(value),
    			minute = 0,
    			hour = 0;// 小时 
			if(second > 60) { 
				minute = parseInt(second/60); 
				second = parseInt(second%60); 
				if(minute > 60) { 
					hour = parseInt(minute/60); 
					minute = parseInt(minute%60); 
				} 
			} 
			second = "0" + second, minute = "0" + minute, hour = "0" + hour; 
			second = second.substring(second.length - 2); 
			$(".countdown .num").eq(5).text(second[1]);
			$(".countdown .num").eq(4).text(second[0]);
			if(minute > 0) { 
				minute = minute.substring(minute.length - 2); 
				// console.log(minute[1])
				$(".countdown .num").eq(3).text(minute[1]);
				$(".countdown .num").eq(2).text(minute[0]);
			} 
			if(hour > 0) { 
				hour = hour.substring(hour.length - 2); 
				$(".countdown .num").eq(1).text(hour[1]);
				$(".countdown .num").eq(0).text(hour[0]);
			} 
			value--;
			// console.log("second",hour+' '+minute+''+second)
    	},1000);
		

	};

	var showPlayer = function(){
		$(".countdown-wrapper").hide();
		$("#player").css("display","flex");

		// var objectPlayer=new aodianPlayer({
	 //        container:'player',//播放器容器ID，必要参数
	 //        rtmpUrl: xtAPI.liveInfo["stream"],//控制台开通的APP rtmp地址，必要参数
	 //        hlsUrl: 'http://27046.hlsplay.aodianyun.com/newlive2016/'+xtAPI.liveInfo["stream"]+'.m3u8',//控制台开通的APP hls地址，必要参数
	 //        /* 以下为可选参数*/
	 //        width: '100%',//播放器宽度，可用数字、百分比等
	 //        // height: '480',//播放器高度，可用数字、百分比等
	 //        autostart: true,//是否自动播放，默认为false
	 //        bufferlength: '1',//视频缓冲时间，默认为3秒。hls不支持！手机端不支持
	 //        maxbufferlength: '2',//最大视频缓冲时间，默认为2秒。hls不支持！手机端不支持
	 //        stretching: '3',//设置全屏模式,1代表按比例撑满至全屏,2代表铺满全屏,3代表视频原始大小,默认值为1。hls初始设置不支持，手机端不支持
	 //        controlbardisplay: 'enable',//是否显示控制栏，值为：disable、enable默认为disable。
	 //        adveDeAddr: xtAPI.liveInfo["coverimg"],//封面图片链接
	 //        adveWidth: '100%',//封面图宽度
	 //        //adveHeight: 240,//封面图高度
	 //        //adveReAddr: '',//封面图点击链接
	 //        //isclickplay: false,//是否单击播放，默认为false
	 //        isfullscreen: true//是否双击全屏，默认为true
	 //    });
		// player = document.createElement("video");
		player.setAttribute("src",(xtAPI.liveInfo["liveopen"]?('http://27046.hlsplay.aodianyun.com/newlive2016/'+xtAPI.liveInfo["stream"]+'.m3u8'):xtAPI.liveInfo["m3u8"]));
		player.style.background="url("+xtAPI.liveInfo["bakimg"]+") no-repeat center";
		player.style.backgroundSize="cover";
		player.setAttribute("playsinline",true);
		player.setAttribute("controls","controls");
		player.setAttribute("webkit-playsinline",true);
		// player.setAttribute("x5-video-player-fullscreen",false);
		player.setAttribute("x-webkit-airplay",true);
		player.setAttribute("x5-video-player-type",true);
		// player.setAttribute("width","100%");
		document.getElementById("player").appendChild(player);
		document.querySelector("#player video").setAttribute("x5-video-player-type","h5");
		var isAndroid = /Android/i.test(navigator.userAgent);
		if(isAndroid){
			document.querySelector("#player video").setAttribute("x5-video-player-fullscreen",true);
			window.onresize = function(){
				player.style.width = window.innerWidth + "px";
				player.style.height =window.innerHeight + "px";
				// player.style["object-position"]= "0px 0px";				
			} 	
			player.addEventListener("x5videoenterfullscreen", function(){
				// alert("player enterfullscreen"); 

				player.style["object-position"]= "0px 78px";
				$("body").addClass("androidfull androidpo");
				player.style.background="#000";
			});
			player.addEventListener("x5videoexitfullscreen", function(){
				// player.style.width = window.innerWidth + "px";
				// player.style.height = handleControl.playprop.width/window.innerWidth*handleControl.playprop.height + "px"; 
				$("body").removeClass("androidpo");
				player.style["object-position"]= "0px 0px";
				player.style.background="url("+xtAPI.liveInfo["bakimg"]+") no-repeat center";
			});			
		}else{
			document.querySelector("#player video").setAttribute("x5-video-player-fullscreen",false);	
		}
		
		// var canvas = document.createElement("canvas");
		// canvas.setAttribute("id","liveCanvas");
		// document.getElementById("player").appendChild(canvas);
		//  //获取video
		//     var oLiveVideo=document.querySelector("#player video");
		//     //获取canvas画布
		//     var oLiveCanvas=document.getElementById("liveCanvas");
		//     //设置画布
		//     var oLiveCanvas2D=oLiveCanvas.getContext('2d');
		//     //设置setinterval定时器
		//     var bLiveVideoTimer=null;
		//     //监听播放
		//     oLiveVideo.addEventListener('play',function() {
		//         bLiveVideoTimer=setInterval(function() {
		//             oLiveCanvas2D.drawImage(myPlayer,0,0,640,320);
		//         },20);
		//     },false);
		//     //监听暂停
		//     oLiveVideo.addEventListener('pause',function() {
		//         clearInterval(bLiveVideoTimer);
		//     },false);
		//     //监听结束
		//     oLiveVideo.addEventListener('ended',function() {
		//         clearInterval(bLiveVideoTimer);
		//     },false);
		
		
		$(".player-wrapper").css("height","auto");
				$("video").click(function(){
					document.querySelector("#player video").play();
				});
				$("#tabs-container").css("height" , parseInt($(window).height()) - parseInt($(".hd").height()) - parseInt($(".player-wrapper").height()) - /*parseInt($(".adv").height())*/35 - parseInt($(".discuss-input-pannel").height()));	
				player.onplaying=function(){
					// alert("op")
				$("#tabs-container").css("height" , parseInt($(window).height()) - parseInt($(".hd").height()) - parseInt($(".player-wrapper").height()) - /*parseInt($(".adv").height())*/35 - parseInt($(".discuss-input-pannel").height()));	
					applicationInit.scrollIntoView();
				}
				applicationInit.scrollIntoView();
			}

	return {		
		showEmoji : showEmoji,
		getRequest : getRequest,
		formatSeconds : formatSeconds,
		showPlayer : showPlayer,
		player : player,
		playprop : playprop
	}

})();

//应用初始化模块
var applicationInit = (function(){

	var _live_hd_classname='';

	//初始化
	var init = function(){

		// $('body').on('touchmove', function (event) {
		//     event.preventDefault();
		// });				
		  // resizePlayer();
		  // scrollIntoView();
		  initEmoji();
		  $(".redpacked-xll-bottom").each(function(){
		  	$(this).attr("href","withdraw.html?liveid="+handleControl.getRequest()["liveid"]);
		  });

		  xtAPI.getWxsign();
		  // xtAPI.invite();
	};

	//表情初始化
	var initEmoji = function(){

		var facelist = $("#facelist ul");
		if(!facelist.html()){
			var emoji = WebIM.Emoji.map;
			for(var faceitem in emoji){
				facelist.append("<li><img data-text='" + faceitem + "' src='"+ WebIM.Emoji.path + emoji[faceitem] +"'/></li>");
			}
		// }
		}
		facelist.find('li').click(function(){
			// console.log($(this).find("img").attr("data-text"));
			var _this=$(this);
			$("#msg-input").val($("#msg-input").val()+_this.find("img").attr("data-text"));
		});
	};

	var tabInit = function(){
		// alert($(".live-items .hd").children().length)
		switch($(".live-items .hd").children().length){
			case 2:
				_live_items_classname = 'twoitems';
			break;
			case 3:
				_live_items_classname = 'threeitems';
			break;
			case 4:
				_live_items_classname = 'fouritems';
			break;
			default:
				_live_items_classname = '';
			break
		}
		$(".live-items .hd").addClass(_live_items_classname);

		var tabsSwiper = new Swiper('#tabs-container',{
		    speed:500,
		    noSwiping : true,
		    onSlideChangeStart: function(){
		      $(".hd li.active").removeClass('active')
		      $(".hd li").eq(tabsSwiper.activeIndex).addClass('active')  
		    }
		  });

		 $(".hd li").on('touchstart mousedown',function(e){
		    e.preventDefault()
		    $(".hd li.active").removeClass('active')
		    $(this).addClass('active')
		    tabsSwiper.slideTo($(this).index());
		  });

		  $(".hd li").click(function(e){
		    e.preventDefault()
		  });

		  var rank_tabsSwiper = new Swiper('#rank-container',{
		    speed:500,
		    noSwiping : true,
		    onSlideChangeStart: function(){
		      $(".rank-hd li.active").removeClass('active')
		      $(".rank-hd li").eq(rank_tabsSwiper.activeIndex).addClass('active')  
		    }
		  });

		  $(".rank-hd li").on('touchstart mousedown',function(e){
		    e.preventDefault()
		    $(".rank-hd li.active").removeClass('active')
		    $(this).addClass('active')
		    rank_tabsSwiper.slideTo($(this).index());
		  });

		  $(".rank-hd li").click(function(e){
		    e.preventDefault()
		  });
	};

	//容器尺寸控制
	var resizePlayer = function(){
		$(".player-wrapper").css("height",$(window).width()*6/9);
		// $(".player-wrapper").css("height",$(window).width()*4/5);
		// console.log(parseInt($(window).height()) , parseInt($(".hd").height()) , parseInt($(".player-wrapper").height()) , parseInt($(".adv").height()) , parseInt($(".discuss-input-pannel").height()));
		$("#tabs-container").css("height" , parseInt($(window).height()) - parseInt($(".hd").height()) - parseInt($(".player-wrapper").height()) - /*parseInt($(".adv").height())*/35 - parseInt($(".discuss-input-pannel").height()));			
	};

	var scrollIntoView = function(){
		if($(".discuss-pannel").parent().hasClass("swiper-slide-active")){
			document.getElementById("sth").scrollIntoView();
		}
	};

	return {
		init : init,
		scrollIntoView : scrollIntoView,
		resizePlayer : resizePlayer,
		tabInit : tabInit
	}

})();

//应用初始化模块
var xtAPI = (function(){

	var commonUrl = 'http://www.xiangtazhibo.com/';

	var request = handleControl.getRequest();

	var user = {};//用户信息对象

	var loaditem = {};//首页加载项

	var liveInfo = {};//直播加载信息

	var share={
	    tit:"",
	    des:"我正在象塔看直播",
	    img:"http://www.xiangtazhibo.com/newlive/web/images/sharelogo.png"
	};

	var wechatlogin = function(){

		Date.prototype.Format = function (fmt) { //author: meizz 
		    var o = {
		        "M+": this.getMonth() + 1, //月份 
		        "d+": this.getDate(), //日 
		        "h+": this.getHours(), //小时 
		        "m+": this.getMinutes(), //分 
		        "s+": this.getSeconds(), //秒 
		        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		        "S": this.getMilliseconds() //毫秒 
		    };
		    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (var k in o)
		    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    return fmt;
		}

		var postdata = {"code" : request["code"]};
		if(request["state"]!="STATE"&&request["state"]!=""){
			postdata.inviter=request["state"];
			postdata.liveid=request["liveid"];
		}
		$.ajax({
			url : commonUrl + 'newlive/tUser/wxWeblogin.do',
			type : 'post',
			dataType : 'json',
			data : postdata,
			success : function(d){

				if(d["success"]==true || localStorage.getItem("password") != null){
					xtAPI.user = d["data"];
					// alert(d["data"]["usercode"])
					// resolve(xtAPI.user);
					Promise.all([/*xtAPI.wechatlogin,*/xtAPI.liveInfo(),xtAPI.loadindexitem(),xtAPI.giftlist(),easemob/*,xtAPI.loadhistorymsg()*/]).then(function(result){
						console.log("result:",result);//用户信息返回
						// var user = result[0],
						var liveinfo = result[0],
							indexitem = result[1],
							giftlist = result[2],
							easemob = result[3];
							// loadhistorymsg = result[4];
							
						var _request = xtAPI.request;

						share.tit = liveinfo["channelname"];
						handleControl.playprop.width = liveinfo["width"];
						handleControl.playprop.height = liveinfo["height"];
						// alert("user",user)
						if(xtAPI.user){
							localStorage.setItem("nickname",xtAPI.user["nickname"]);
							localStorage.setItem("headimg",xtAPI.user["headimg"]);
							localStorage.setItem("usercode",xtAPI.user["usercode"]);
							localStorage.setItem("password",xtAPI.user["password"]);
							localStorage.setItem("userid",xtAPI.user["userid"]);
						}
						// else{
						// 	window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa5af90cb393880b6&redirect_uri=http://www.xiangtazhibo.com/newlive/web/index.html?liveid="+_request["liveid"]+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
						// 	return false;
						// }
						// debugger;

						// if(/*liveinfo == false ||*/ localStorage.getItem("password") == null){		
						// 	window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa5af90cb393880b6&redirect_uri=http://www.xiangtazhibo.com/newlive/web/index.html?liveid="+_request["liveid"]+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
						// 	return false;
						// }		

						for(var i = 0, menu_length = indexitem["menu"].length; i < menu_length; i++){
							var menutype = indexitem["menu"][i]["menutype"];
							$(".live-items .hd").append("<li>" + indexitem["menu"][i]["menuname"] + "</li>");

							var swcontent = '<div class="swiper-slide swiper-no-swiping">';
							switch(menutype){
								case 6:
									swcontent += '<div class="content-slide" style="text-align:center"><img src="'+indexitem["menu"][i]["menucontent"] +'"/></div>';
								break;
								case 4:
									swcontent += '<div class="content-slide discuss-pannel">'+
													'<ul class="message-list">'+
														'<li>'+
															// '<img src="http://wx.qlogo.cn/mmopen/dH8QVxmk2IXOezlo6KALUQqHlicM2xJoczZrLxib1fzGUN42e5FEibeKNeiccmRrs3ibM1xsszibPKSgiaruXibODZWpow/0" alt="" class="headimg fl">'+
						        	// 						'<div class="message fl robredpacket">'+
						        	// 							'<div class="rptxt"><p>恭喜发财.大吉大利</p><p>领取红包</p></div>'+
						        	// 					'<img src="images/redpacket-xl.png" class="response" />'+
						        	// 				'</div>'+
														'</li>'+
													'</ul>'+
													'<div id="sth"></div>'+
												'</div>';
								break;
								case 5:
									swcontent += '<div class="content-slide rank-wrapper">'+
													'<ul class="rank-hd"><li class="active">打赏榜</li><li>邀请榜</li></ul>'+
													'<div id="rank-container" class="swiper-container">'+
													    '<div class="swiper-wrapper">'+
													      '<div class="swiper-slide swiper-no-swiping">'+
																'<ul class="ranklist" id="payrank">'+
																'</ul>'+												
														  '</div>'+
													   '<div class="swiper-slide swiper-no-swiping">'+
													        
													'<a href="javascript:;" class="generate-card">点击生成我的邀请卡</a>'+
													'<ul class="ranklist" id="inviterank">'+
													'</ul>'+
													'</div>'+
													 '</div>'+
													'</div>'+
												'</div>';
								break;
								default:
									swcontent += '<div class="content-slide">'+
													 indexitem["menu"][i]["menucontent"] +
												 '</div>';
								break;
							}
							swcontent += '</div>';
							$(".swiper-wrapper").append(swcontent);
						}
						// alert($(".swiper-wrapper").html())
						// alert(liveinfo["chatroomid"]);
						// alert(typeof(easemob))
						
						// if(liveinfo["logoopen"]){
						if(indexitem["logo"]["logoimg"]){
							$(".anchorheadimg").html('<img src="'+indexitem["logo"]["logoimg"]+'" alt="" class="response">');
							// $(".anchorheadimg").html(`<img src="${indexitem["logo"]["logoimg"]}" alt="" class="response">`);
						}
						// }
						

						if(liveinfo["advopen"]){
							$(".adv").html('<a href="'+indexitem["adv"][0]["advurl"]+'"><img src="'+indexitem["adv"][0]["advtitle"]+'" class="response" alt=""></a>')
							// $(".adv").html(`<a href="${indexitem["adv"][0]["advurl"]}"><img src="${indexitem["adv"][0]["advtitle"]}" class="response" alt=""></a>`)
						}else{
							$(".adv").remove();
						}
						if(liveinfo["chatopen"]==0){
							$(".discuss-input #msg-input").attr({"readonly": true, "placeholder": '全员禁言中'});
						}
						$(".live-items .hd li:first").addClass("active");

						applicationInit.tabInit();
						applicationInit.resizePlayer();
						$(".player-wrapper").css("backgroundImage","url("+liveinfo["bakimg"]+")");
						var timecountend = indexitem["timer"]["timecountend"];
						if(liveinfo["liveopen"] == 0 && liveinfo["videoopen"] == 0){
							$(".countdown-label").text("直播已结束");
						}else{
							if(liveinfo["timecountopen"] != 1 || timecountend < 0){
									handleControl.showPlayer();
								}else{
									// console.log("调用倒计时");									
									handleControl.formatSeconds(timecountend);								
									// setInterval(function(){										
									// },1000);
								}
						}
						
						for(var i = 0, giftlist_length = giftlist.length; i < giftlist_length; i++){
							$(".money-choose").append("<li data-gift-id=" + giftlist[i]["id"] + ">" + giftlist[i]["giftname"] + "</li>")
						}
						
						$(".money-choose li:first").addClass("money-selected");

						$(".money-choose li").click(function(){
							var _this = $(this);
							$(".money-choose li[class=money-selected]").removeClass("money-selected");
							_this.addClass("money-selected");
							if(_this.attr("data-gift-id") == 6){
								$(".redpacked-xll-body").addClass("showcustom");
							}
						});

						$(".sendbtn").click(function(){
							easemob.sendToAPI($("#msg-input").val(),1);
							// easemob.sendMsg($("#msg-input").val());
						});

						$(".generate-card").attr("href","invite.html?liveid="+_request["liveid"]);

						var rewardlist = indexitem["rewardlist"],invitelist = indexitem["invitelist"],rewardlistlength = rewardlist.length,invitelistlength = invitelist.length;

						for(var i = 0; i < rewardlistlength; i++){
							$("#payrank").prepend('<li>' +
						         			'<img src="' + rewardlist[i]["headimg"] + '" alt="" class="headimg fl">' +
						         			'No.'+ (rewardlistlength - i) + ' ' + rewardlist[i]["sendername"] +
						         		'</li>');
						}

						for(var i = 0; i < invitelistlength; i++){
							$("#inviterank").prepend('<li>' +
						         			'<img src="' + invitelist[i]["headimg"] + '" alt="" class="headimg fl">' +
						         			'No.'+ (invitelistlength - i) + ' ' + invitelist[i]["username"] +
						         		'</li>');
						}

						// $(".numcount").text('1154人');
						$(".numcount").text(liveinfo["uv"] + '人');
						$(".anchorheadimg img").attr("src",indexitem["logo"]["logoimg"]);
						// $(".adv img").attr("src",indexitem["adv"][0]["advurl"]);
						// try{
							easemob.roomId = liveinfo["chatroomid"];						
							easemob.options.user = localStorage.getItem("usercode");						
							easemob.options.pwd = localStorage.getItem("password");

							$.post(commonUrl + "newlive/im/getoldMsg.do",{"chatroomid":easemob.roomId,"perNumber":10,"createtime":(new Date()).Format("yyyy-MM-dd hh:mm:ss")},function(d){
									// console.log(d)
									if(d["success"]==true){
										for(let i = d["data"]["historylist"].length -1 ; i >= 0;i--){
											easemob.appendMsg(d["data"]["historylist"][i],'txt');
										}
									}
									easemob.initWEBIM();	
								});
							var functions = indexitem["function"];
							for(var i=0;i<functions.length;i++){
								switch(functions[i]["functiontype"]){
									case 1:
										$(".tocustomer").show();
									break;
									case 3:
										$(".redpacket-l").show();
									break;
								}
							}
						// }
						// catch(e){
							// alert(e)
						// }
					});
						
				}else{
					// resolve(false);
					window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa5af90cb393880b6&redirect_uri=http://www.xiangtazhibo.com/newlive/web/index.html?liveid="+request["liveid"]+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				}				
			}
		});
	};

	var liveInfo = function(){
		return new Promise(function(resolve){
			$.ajax({
				url : commonUrl + 'newlive/tLivechannel/loadChannel.do',
				type : 'post',
				dataType : 'json',
				data : {"liveid" : request["liveid"]},
				success : function(d){
					// checkSession(d["code"]);
					if(d["code"]==1013){
						window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa5af90cb393880b6&redirect_uri=http://www.xiangtazhibo.com/newlive/web/index.html?liveid="+request["liveid"]+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
					}else{
						xtAPI.liveInfo = d["data"];
						resolve(xtAPI.liveInfo);
					}
				}
			});
		});
	}

	var giftlist = function(){
		return new Promise(function(resolve){
			$.ajax({
				url : commonUrl + 'newlive/tGift/getGifts.do',
				type : 'post',
				dataType : 'json',
				data : {"type" : 2},
				success : function(d){
					resolve(d["data"]);
				}
			});
		}); 
	}

	var loadindexitem =  function(){
		return new Promise(function(resolve){
			$.ajax({
				url : commonUrl + 'newlive/tLivechannel/getLoaditems.do',
				type : 'post',
				dataType : 'json',
				data : {"liveid" : request["liveid"], types : "1,2,3,4,5,6,7"},
				success : function(d){
					if(d["success"]==true){
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var loadhistorymsg = function(){
		return new Promise(function(resolve){
			$.ajax({
				url : commonUrl + 'newlive/im/getHistoryMsg.do',
				type: 'post',
				dataType : 'json',
				data : {"groupid" : easemob.roomId, "startnum" : 0 , "pernum" : 10},
				success : function(d){
					if(d["success"] == true){
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var getredpacket = function(rpid){
		$("#getredpacket .desc").html('');
		$.ajax({
			url : commonUrl + 'newlive/tHongbao/grapHongbao.do',
			type : 'post',
			dataType : 'json',
			data : {'liveid' : request["liveid"], 'hongbaoid' : rpid},
			success : function(d){
				var getmoney = parseInt(d["data"]["getMoney"]);
				if(getmoney>0){
					$("#getredpacket .desc").html("<p>恭喜您获得"+getmoney+"元红包</p><p>红包直接发送到您的账户中，请注意查收</p>");
				}else{
					$("#getredpacket .desc").html("<p>红包已经被抢光了</p><p></p>");
				}
				$("#getredpacket").addClass("show");
			}
		});
	};

	var accountmoney = function(){
		return new Promise(function(resolve){
			$.ajax({
				url : commonUrl + 'newlive/tAccount/getAccountMoney.do',
				type : 'post',
				dataType : 'json',
				success : function(d){
					if(d["code"]==1013){
						resolve(false);
					}else{
						resolve(d["data"]["money"]);
					}
				}
			});
		});
	}

	var withdraw = function(){
		return new Promise(function(resolve){
			$.ajax({
				url : commonUrl + 'newlive/tAccount/getDrawedRecords.do',
				type : 'post',
				dataType : 'json',
				success : function(d){
					resolve(d["data"]);
				}
			});
		});
	}

	var applicationmoney = function(){
		$.ajax({
			url : commonUrl + 'newlive/tAccount/drawMoney.do',
			data : {"money" : Number($("#withdrawmoney").val()).toFixed(2)}, //Number后NaN判断下呢？！
			dataType : 'json',
			type : 'post',
			success : function(d){
				// if(d["code"]==1901){}
				// console.log(accountmoney)
				var withdrawpic='';
				switch(d["code"]){
					case 1901:
						withdrawpic='images/withdrawicon.png';
					break;
					case 1507:
						withdrawpic='images/nomoney.png';
					break;
					default:
						withdrawpic='images/withdrawerror.png';
					break
				}
				$(".redpacket-wrapper img").attr("src",withdrawpic);
				// $(".account").text(accountmoney["[[PromiseValue]]"]);
				// Promise.all([accountmoney]).then(function(result){
				// 	$(".account").text(result[0]);
				// });

					$.ajax({
						url : commonUrl + 'newlive/tAccount/getAccountMoney.do',
						type : 'post',
						dataType : 'json',
						success : function(d){
								$(".account").text(d["data"]["money"]);
						}
					});

				$(".returnmessgae").text(d["msg"]);
				$("#withdrawmoney").val('');
				$("#redpacket-dialog").addClass("show");
			}
		});
	};

	var getWxsign = function(){
        $.ajax({
            url: commonUrl + "newlive/wechat/getWxSign.do",
            type:"post",
            dataType:"json",
            data:{
                url:window.location.href
            },
            success:function(data){
                // alert(data["data"]["signature"]);
                if(data["success"]==true){
                    wx.config({
                      debug: false,
                      appId: 'wxa5af90cb393880b6',
                      timestamp: data["data"]["timestamp"],
                      nonceStr: data["data"]["nonceStr"],
                      signature: data["data"]["signature"],
                      jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                      ]
                  });

                      wx.ready(function(){
                            wx.onMenuShareTimeline({
                                title: share.des, /*分享标题*/
                                link: window.location.href, /*分享链接*/
                                imgUrl: share.img,  /*分享图标*/
                                success: function () { 
                                    // show_weui_alert("","分享成功");
                                },
                                cancel: function () { 
                                    // show_weui_alert("","分享已取消");
                                },
                                fail:function(){
                                    // show_weui_alert("","分享失败");
                               }
                            });
                            
                            wx.onMenuShareAppMessage({
                                title: share.tit, /*分享标题*/
                                desc:  share.des, // 分享描述
                                link: window.location.href, /*分享链接*/
                                imgUrl: share.img,  /*分享图标*/
                                success: function () { 
                                    // show_weui_alert("","分享成功");
                                },
                                cancel: function () { 
                                    // show_weui_alert("","分享已取消");
                                },
                                fail:function(){
                                    // show_weui_alert("","分享失败");
                               }
                               
                            });
                      });
                }
            }
        });
	};

	var invite = function(){
		$("#invite-dialog").html("<img src='"+commonUrl+"newlive/tLivechannel/makeQrcode.do?liveid="+request["liveid"]+"'/>");		
	};

	return {
		request : request,
		commonUrl : commonUrl,
		user : user,
		wechatlogin : wechatlogin,
		liveInfo : liveInfo,
		loadindexitem : loadindexitem,
		invite : invite,
		giftlist : giftlist,
		withdraw : withdraw,
		getredpacket : getredpacket,
		accountmoney : accountmoney,
		applicationmoney : applicationmoney,
		getWxsign : getWxsign
	}

})();

var wxPay = (function(){

	var brandwcpayrequest = {
		"appId":"wxa5af90cb393880b6",
		"timeStamp":"",
		"nonceStr":"",
		"package":"",
		"signType":"MD5",
		"paySign":""
	};

	// var init = function(){
	// 	if (typeof WeixinJSBridge == "undefined"){
	// 	   if( document.addEventListener ){
	// 	       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	// 	   }else if (document.attachEvent){
	// 	       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	// 	       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	// 	   }
	// 	}
	// };

	 //调用微信JS api 支付
	var onBridgeReady = function (type,giftid,sendmoney){
			  $.ajax({
		          type: "post",
		          url: xtAPI.commonUrl + "newlive/tGiftrecord/getWxPayidForgift.do",
		          data: {"type":type,"liveid":xtAPI.request["liveid"],"giftid":giftid,besenderid
		:"f44aa085334c47b899597d5441f293f5","sendmoney":sendmoney},
		          datatype: "json",
		          success: function (data) {
		              var jsondata = data["data"];
		              brandwcpayrequest["package"] = jsondata["package"];
		              brandwcpayrequest["paySign"] = jsondata["paySign"];
		              brandwcpayrequest["timeStamp"] = jsondata["timeStamp"];
		              brandwcpayrequest["nonceStr"] = jsondata["nonceStr"];
		              WeixinJSBridge.invoke(
				       'getBrandWCPayRequest', brandwcpayrequest,
				       function(res){   
				       		$(".ctdialog").removeClass("show");
				           if(res.err_msg == "get_brand_wcpay_request：ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
				       }
				   );
		          },
		          error: function () {
		              alert("请求异常");
		          }
		      });
	};

	var sendtocustomer = function (money,hongbaotype,sendtxt,detailnum){
			  $.ajax({
		          type: "post",
		          url: xtAPI.commonUrl + "newlive/tHongbao/sendHongbao.do",
		          data: {"money":money,"liveid":xtAPI.request["liveid"],"hongbaotype":hongbaotype,sendtxt
		:sendtxt,"detailnum":detailnum},
		          datatype: "json",
		          success: function (data) {
		              var jsondata = data["data"];
		              brandwcpayrequest["package"] = jsondata["package"];
		              brandwcpayrequest["paySign"] = jsondata["paySign"];
		              brandwcpayrequest["timeStamp"] = jsondata["timeStamp"];
		              brandwcpayrequest["nonceStr"] = jsondata["nonceStr"];
		              WeixinJSBridge.invoke(
				       'getBrandWCPayRequest', brandwcpayrequest,
				       function(res){   
				       		$(".ctdialog").removeClass("show");
				           if(res.err_msg == "get_brand_wcpay_request：ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
				       }
				   );
		          },
		          error: function () {
		              alert("请求异常");
		          }
		      });
	};

	return {
		onBridgeReady : onBridgeReady,
		sendtocustomer : sendtocustomer
	}	
})();