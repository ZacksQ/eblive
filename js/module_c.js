"use strict";

/*
	module.js 模块集成
	by zq 2016.12.29
*/
// alert(typeof(easemob)); 
//控制处理模块

var handleControl = function () {
	var player = document.createElement("video");
	var playprop = {
		"width": window.innerWidth, "height": window.innerHeight
	};
	var showEmoji = function showEmoji() {
		$(".discuss-input-pannel").toggleClass("showemoji");
		// console.log(emoji);
	};

	var showhistorytop10 = function showhistorytop10() {
		if ($(".discuss-pannel").scrollTop() <= 43) {
			document.querySelector(".discuss-pannel").removeEventListener("scroll", handleControl.showhistorytop10, false);
			xtAPI.showhistory();
		}
	};

	var countdown = function countdown() {
		console.log("countdown");
	};

	var getRequest = function getRequest() {
		var url = location.search;
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			// var str = url.substr(1);
			var strs = url.substr(1).split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
			}
		}
		return theRequest;
	};

	var rollQT = function rollQT() {
		var qt = $(".questionnaire");
		var distance = 25;
		if (qt.scrollTop() >= qt.height()) {
			qt.animate({ "scrollTop": 0 });
		} else {
			qt.animate({ "scrollTop": qt.scrollTop() + distance });
		}
	};

	var formatSeconds = function formatSeconds(value) {
		//倒计时处理
		var countdown_timer = null;

		var countdown_timer = setInterval(function () {
			if (value == 0) {
				clearInterval(countdown_timer);
				handleControl.showPlayer();
				return false;
			}
			var second = parseInt(value),
			    minute = 0,
			    hour = 0,
			    day = 0; // 小时 
			if (second > 60) {
				minute = parseInt(second / 60);
				second = parseInt(second % 60);
				if (minute > 60) {
					hour = parseInt(minute / 60);
					minute = parseInt(minute % 60);
				}
				if (hour > 24) {
					day = parseInt(hour / 24);
					hour = parseInt(hour % 24);
				}
			}
			second = "0" + second, minute = "0" + minute, hour = "0" + hour, day = "0" + day;
			second = second.substring(second.length - 2);
			// $(".countdown .num").eq(5).text(second[1]);
			// $(".countdown .num").eq(4).text(second[0]);
			if (minute > 0) {
				minute = minute.substring(minute.length - 2);
				// console.log(minute[1])
				// $(".countdown .num").eq(3).text(minute[1]);
				// $(".countdown .num").eq(2).text(minute[0]);
			}
			if (hour > 0) {
				hour = hour.substring(hour.length - 2);
				// $(".countdown .num").eq(1).text(hour[1]);
				// $(".countdown .num").eq(0).text(hour[0]);
			}
			$(".countdownv2 span").text(day + "天" + hour + ":" + minute + ":" + second);
			value--;
			// console.log("second",hour+' '+minute+''+second)
		}, 1000);
	};

	var showPlayer = function showPlayer() {
		// $(".countdown-wrapper").hide();
		$("#player").css("display", "flex");

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
		player.setAttribute("src", xtAPI.liveInfo["data"]["liveopen"] ? 'http://27046.hlsplay.aodianyun.com/devnewlive2016/' + xtAPI.liveInfo["data"]["stream"] + '.m3u8' : xtAPI.liveInfo["data"]["m3u8"]);
		player.style.background = "url(" + xtAPI.liveInfo["data"]["bakimg"] + ") no-repeat center";
		// player.style.backgroundColor = "#000"
		player.style.backgroundSize = "cover";
		player.setAttribute("playsinline", true);
		// player.setAttribute("controls", "controls");
		player.setAttribute("webkit-playsinline", true);
		// player.setAttribute("x5-video-player-fullscreen",false);
		player.setAttribute("x-webkit-airplay", true);
		player.setAttribute("x5-video-player-type", true);
		// player.setAttribute("width","100%");
		document.getElementById("player").appendChild(player);
		document.querySelector("#player video").setAttribute("x5-video-player-type", "h5");
		var isAndroid = /Android/i.test(navigator.userAgent);
		$(".playbtn").click(function(){
			$(this).hide();
			player.play();
		});
		//安卓全屏模拟
		if (isAndroid) {
			document.querySelector("#player video").setAttribute("x5-video-player-fullscreen", true);
			window.onresize = function () {
				player.style.width = window.innerWidth + "px";
				player.style.height = window.innerHeight + "px";
				// player.style["object-position"]= "0px 0px";				
			};
			player.addEventListener("x5videoenterfullscreen", function () {				
				$("body").addClass("androidfull androidpo");
				player.style.background = "#000";
			});
			player.addEventListener("x5videoexitfullscreen", function () {
				$(".playbtn").show();
				$("body").removeClass("androidpo");
				player.style["object-position"] = "0px 0px";
			});
		} else {
			document.querySelector("#player video").setAttribute("x5-video-player-fullscreen", false);
		}
		applicationInit.resizePlayer();
		var isWeixin = /MicroMessenger/i.test(navigator.userAgent);
		if (isWeixin) {
			document.querySelector("video").addEventListener("loadedmetadata", function () {
				//safari中直接执行
				$(".player-wrapper").css("height", "auto");
				// alert(document.querySelector("video").style.width)
				// alert(document.querySelector("video").style.height)
			}, false);
		} else {
			document.querySelector("video").addEventListener("play", function () {
				$(".player-wrapper").css("height", "auto");
			}, false);
		}

		applicationInit.scrollIntoView();
	};

	return {
		showEmoji: showEmoji,
		getRequest: getRequest,
		formatSeconds: formatSeconds,
		showPlayer: showPlayer,
		player: player,
		playprop: playprop,
		rollQT: rollQT,
		showhistorytop10: showhistorytop10
	};
}();

//应用初始化模块
var applicationInit = function () {

	var _live_hd_classname = '';

	//初始化
	var init = function init() {

		// $('body').on('touchmove', function (event) {
		//     event.preventDefault();
		// });				
		// resizePlayer();
		// scrollIntoView();
		$(".discuss-input-pannel").show();
		$(".redpacked-xll-bottom").each(function () {
			$(this).attr("href", "withdraw.html?liveid=" + handleControl.getRequest()["liveid"]);
		});
		$("#gotocenter a").attr("href", "usercenter.html?liveid=" + handleControl.getRequest()["liveid"]);
		xtAPI.getWxsign();
		// xtAPI.invite();
	};

	//表情初始化
	var initEmoji = function initEmoji() {

		var facelist = $("#facelist ul");
		if (!facelist.html()) {
			var emoji = WebIM.Emoji.map;
			for (var faceitem in emoji) {
				facelist.append("<li><img data-text='" + faceitem + "' src='" + WebIM.Emoji.path + emoji[faceitem] + "'/></li>");
			}
			// }
		}
		// for(var l = 0; l < $("#facelist ul li").length; l++ ){
		// 	$("#facelist ul li")[l].addEventListener("click", function (e) {
		// 		// console.log($(this).find("img").attr("data-text"));
		// 		var _this = $($("#facelist ul li")[l]);
		// 		$("#msg-input").val($("#msg-input").val() + _this.find("img").attr("data-text"));
		// 		e.stopPropagation();
		// 	},false);
		// }
		facelist.find("li").on("touchend", function (e) {
			// console.log($(this).find("img").attr("data-text"));
			var _this = $(this);
			$("#msg-input").val($("#msg-input").val() + _this.find("img").attr("data-text"));
			e.stopPropagation();
		});
		document.querySelector(".facebtn").addEventListener("touchend", function (e) {
			handleControl.showEmoji();
			e.stopPropagation();
		}, false);
		document.querySelector("body").addEventListener("touchend", function () {
			$(".discuss-input-pannel").removeClass("showemoji");
		}, false);
	};

	var tabInit = function tabInit() {
		// alert($(".live-items .hd").children().length)
		var _live_items_classname = '';
		switch ($(".live-items .hd").children().length) {
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
				break;
		}
		$(".live-items .hd").addClass(_live_items_classname);

		$(".hd li").on('touchstart mousedown', function (e) {
			e.preventDefault();
			$(".hd li.active").removeClass('active');
			$(this).addClass('active');
			tabsSwiper.slideTo($(this).index());
		});

		$(".hd li").click(function (e) {
			e.preventDefault();
		});

		var rank_tabsSwiper = new Swiper('#rank-container', {
			speed: 500,
			noSwiping: true,
			onSlideChangeStart: function onSlideChangeStart() {
				$(".rank-hd li.active").removeClass('active');
				$(".rank-hd li").eq(rank_tabsSwiper.activeIndex).addClass('active');
			}
		});

		$(".rank-hd li").on('touchstart mousedown', function (e) {
			e.preventDefault();
			$(".rank-hd li.active").removeClass('active');
			$(this).addClass('active');
			rank_tabsSwiper.slideTo($(this).index());
		});

		$(".rank-hd li").click(function (e) {
			e.preventDefault();
		});
	};

	//容器尺寸控制
	var resizePlayer = function resizePlayer() {
		// alert(window.innerWidth)
		$("#player video").css("width", window.innerWidth);
		// $("#player video").css("height", $(window).height() + 'px');
	};

	var scrollIntoView = function scrollIntoView() {
		document.getElementById("sth").scrollIntoView();
	};

	return {
		init: init,
		scrollIntoView: scrollIntoView,
		resizePlayer: resizePlayer,
		tabInit: tabInit
	};
}();

//应用初始化模块
var xtAPI = function () {

	var commonUrl = 'http://jcs.xiangtazhibo.com/';

	var appid = 'wx9e47b80badd07ab2';

	var request = handleControl.getRequest();

	var user = {}; //用户信息对象

	var loaditem = {}; //首页加载项

	var liveInfo = {}; //直播加载信息

	var share = {
		tit: "",
		des: "我正在象塔看直播",
		timelinesharecontent: "我正在象塔看直播",
		img: commonUrl + "newliveshop/web/images/sharelogo.png",
		link: commonUrl + "newliveshop/eblive/index.html?liveid=" + request["liveid"]
	};
	var from = 1;

	var wechatlogin = function wechatlogin() {

		var isMobile = /Mobile/i.test(navigator.userAgent);
		var ispcterminal = /pcvideo/i.test(window.location.pathname);

		if(!isMobile){
			window.location.href="pcvideo.html?liveid=" + xtAPI.request["liveid"];
		}
		// else{
		// 	if(localStorage.getItem("isChooseLogined")==1){
		// 		window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newliveshop/eblive/index.html?liveid=" + xtAPI.request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=" + xtAPI.from + "#wechat_redirect";
		// 	}else{
		// 		window.location.href="index.html?liveid=" + xtAPI.request["liveid"]
		// 	}
		// }

		Date.prototype.Format = function (fmt) {
			//日期格式化处理
			//author: meizz 
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
			for (var k in o) {
				if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}return fmt;
		};

		$.smartScroll = function (container, selectorScrollable) {
			// 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
			if (!selectorScrollable || container.data('isBindScroll')) {
				return;
			}

			// 是否是搓浏览器
			// 自己在这里添加判断和筛选
			var isSBBrowser;

			var data = {
				posY: 0,
				maxscroll: 0
			};

			// 事件处理
			container.on({
				touchstart: function touchstart(event) {
					// var events = event;
					var events = event.originalEvent.touches[0] || event;

					// 先求得是不是滚动元素或者滚动元素的子元素
					var elTarget = $(event.target);

					if (!elTarget.length) {
						return;
					}

					var elScroll;

					// 获取标记的滚动元素，自身或子元素皆可
					if (elTarget.is(selectorScrollable)) {
						elScroll = elTarget;
					} else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
						elScroll = null;
					}

					if (!elScroll) {
						return;
					}

					// 当前滚动元素标记
					data.elScroll = elScroll;

					// 垂直位置标记
					data.posY = events.pageY;
					data.scrollY = elScroll.scrollTop();
					// 是否可以滚动
					data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
				},
				touchmove: function touchmove() {
					// 如果不足于滚动，则禁止触发整个窗体元素的滚动
					if (data.maxscroll <= 0 || isSBBrowser) {
						// 禁止滚动
						event.preventDefault();
					}
					// 滚动元素
					var elScroll = data.elScroll;
					// 当前的滚动高度
					var scrollTop = elScroll.scrollTop();

					// 现在移动的垂直位置，用来判断是往上移动还是往下
					var events = event.touches[0] || event;
					// 移动距离
					var distanceY = events.pageY - data.posY;

					if (isSBBrowser) {
						elScroll.scrollTop(data.scrollY - distanceY);
						elScroll.trigger('scroll');
						return;
					}

					// 上下边缘检测
					if (distanceY > 0 && scrollTop == 0) {
						// 往上滑，并且到头
						// 禁止滚动的默认行为
						event.preventDefault();
						return;
					}

					// 下边缘检测
					if (distanceY < 0 && scrollTop + 1 >= data.maxscroll) {
						// 往下滑，并且到头
						// 禁止滚动的默认行为
						event.preventDefault();
						return;
					}
				},
				touchend: function touchend() {
					data.maxscroll = 0;
				}
			});

			// 防止多次重复绑定
			container.data('isBindScroll', true);
		};

		var postdata = {};
		if (request["code"]) {
			postdata.code = request["code"];
			if (request["state"] != "STATE" && request["state"] != "") {
				postdata.inviter = request["state"];
				postdata.liveid = request["liveid"];
			}
			this.from = request["from"];
			switch (this.from) {
				case "singlemessage":
					this.from = 3;
					break;
				case "timeline":
					this.from = 2;
					break;
				default:
					this.from = 1;
					break;
			}

			$.ajax({
				url: commonUrl + 'newliveshop/tUser/wxWeblogin.do',
				type: 'post',
				dataType: 'json',
				data: postdata,
				success: function success(d) {

					if (d["success"] == true /*|| localStorage.getItem("userid") != null*/) {
							xtAPI.user = d["data"];
							// alert(d["data"]["usercode"])
							// resolve(xtAPI.user);
							Promise.all([xtAPI.liveInfo()]).then(function (result) {
								console.log("result:", result); //用户信息返回
								// var user = result[0],
								var watchtype = result[0]["auth"]["authwatch"];
								var defaultmask = 'images/authbg.png';

								if (watchtype == 0) {
									if (result[0]["auth"]["leaderimgOpen"] != 0) {
										//欢迎页
										$(".welcome").css("backgroundImage", "url(" + result[0]["auth"]["leaderimg"] + ")").show();
										$(".welcome .skip span").click(function () {
											$(".welcome").fadeOut(1000);
										});
										var welcome_countdown = null,
										    welcome_second = 3;
										var welcome_countdown = setInterval(function () {
											if (welcome_second > 0) {
												$(".welcome .skip span").text(--welcome_second);
											} else {
												clearInterval(welcome_countdown);
											}
										}, 1000);
										setTimeout(function () {
											$(".welcome").fadeOut(1000);
										}, 3000);
									}
									initLiving();
								} else {
									if (result[0]["auth"]["leaderimgOpen"] != 0) {
										$(".auth-mask").css("backgroundImage", "url(" + result[0]["auth"]["leaderimg"] + ")");
									} else {
										$(".auth-mask").css("backgroundImage", "url(" + defaultmask + ")");
									}

									console.log('showmodel'); //授权观看
									$(".auth-model-text").text(result[0]["auth"]["authtitle"]);
									var ajaxurl = '';
									postdata = { liveid: request["liveid"] };
									var count_down, tsetcountd;

									(function () {
										$(".loading").fadeOut();
										switch (watchtype) {
											case 1:
												$(".auth-model-body").prepend('<div>' + '<input type="text" placeholder="请输入直播密码" name="password">' + '</div>');
												ajaxurl = 'newliveshop/tLivechannel/loadChannelByPwd.do';

												break;
											case 2:
												$(".auth-model-body").prepend('<div>' + '<input type="tel" placeholder="输入你的手机号" name="telphone">' + '</div>' + '<div>' + '<input type="text" id="code" placeholder="输入短信验证码"><button class="btn-default getcode">获取验证码</button>' + '</div>');
												count_down = 50;
												tsetcountd = null;

												// function countDownSendCode(){
												//   if(count_down>0){
												//     $(".getcode").text("重发("+count_down+"s)");
												//     count_down--;
												//   }else{
												//     clearInterval(tsetcountd);
												//     $(".getcode").text("获取验证码");
												//     $(".getcode").bind("click",sendCode);     
												//     count_down=50;   
												//   }
												// }

												var sendCode = function sendCode() {
													var phone = $("input[name=telphone]").val();
													layui.use(['layer'], function () {
														var rg = new RegExp(/^[1]+[3,4,5,7,8]+\d{9}$/);
														if (!rg.test(phone)) {
															layer.msg("请输入正确的手机号");
															return false;
														}
														$(".getcode").unbind("click");

														$.ajax({
															url: xtAPI.commonUrl + 'newliveshop/tLivechannel/sendCodeBeforeLoad.do',
															type: 'post',
															data: { liveid: request["liveid"], phone: phone },
															dataType: 'json',
															success: function success(d) {
																if (d["success"]) {
																	layer.msg("验证码已发送");
																	tsetcountd = setInterval(function () {
																		if (count_down > 0) {
																			$(".getcode").text("重发(" + count_down + "s)");
																			count_down--;
																		} else {
																			clearInterval(tsetcountd);
																			$(".getcode").text("获取验证码");
																			$(".getcode").bind("click", sendCode);
																			count_down = 50;
																		}
																	}, 1000);
																} else {
																	layer.msg("验证码发送失败，请稍后再试");
																	$(".getcode").bind("click", sendCode);
																}
															}
														});
													});
												};

												$(".getcode").bind("click", sendCode);
												ajaxurl = 'newliveshop/tLivechannel/loadChannelByPhone.do';

												break;
											case 3:
												$(".auth-model-body").prepend('<div class="redtip">' + '本次直播需支付' + (result[0]["auth"]["paymoneyint"] / 100).toFixed(2) + '元' + '</div>');
												$(".watchlive").text("付费观看");
												break;

										}
										var liveinfo = result[0]["data"];
										share.tit = liveinfo["sharetitle"] ? liveinfo["sharetitle"] : liveinfo["channelname"];
										share.des = liveinfo["sharecontent"] ? liveinfo["sharecontent"] : share.des;
										share.timelinesharecontent = liveinfo["timelinesharecontent"] ? liveinfo["timelinesharecontent"] : share.timelinesharecontent;
										if (liveinfo["shareimg"]) {
											share.img = liveinfo["shareimg"];
											// $(".anchorheadimg").html(`<img src="${indexitem["logo"]["logoimg"]}" alt="" class="response">`);
										}
										xtAPI.getWxsign();
									})();

									$(".auth-model-tit").text(result[0]["auth"]["authtitle"]);
									$("#auth-wrapper").show();
									if (watchtype == 4) {
										$("#auth-wrapper").hide();
										if (result[0]["auth"]["leaderimgOpen"] != 0) {
											//欢迎页
											$(".welcome").css("backgroundImage", "url(" + result[0]["auth"]["leaderimg"] + ")").show();
											$(".welcome .skip span").click(function () {
												$(".welcome").fadeOut(1000);
											});
											var welcome_countdown = null,
											    welcome_second = 3;
											var welcome_countdown = setInterval(function () {
												if (welcome_second > 0) {
													$(".welcome .skip span").text(--welcome_second);
												} else {
													clearInterval(welcome_countdown);
												}
											}, 1000);
											setTimeout(function () {
												$(".welcome").fadeOut(1000);
											}, 3000);
										}
										xtAPI.liveInfo = result[0];
										initLiving();
									}
									$(".watchlive").click(function () {
										if (watchtype == 3) {
											//付费观看预支付
											$.ajax({
												url: xtAPI.commonUrl + 'newliveshop/tLivechannel/buyChannelBefore.do',
												dataType: 'json',
												type: 'post',
												data: { liveId: request["liveid"] },
												success: function success(d) {
													var jsondata = d["data"];
													wxPay.brandwcpayrequest["package"] = jsondata["package"];
													wxPay.brandwcpayrequest["paySign"] = jsondata["paySign"];
													wxPay.brandwcpayrequest["timeStamp"] = jsondata["timeStamp"];
													wxPay.brandwcpayrequest["nonceStr"] = jsondata["nonceStr"];
													WeixinJSBridge.invoke('getBrandWCPayRequest', wxPay.brandwcpayrequest, function (res) {
														// alert(res.err_msg)
														// if (res.errMsg == "getBrandWCPayRequest:fail,没有此SDK或暂不支持此SDK模拟") {
														if (res.err_msg == "get_brand_wcpay_request:ok") {
															$.ajax({
																url: xtAPI.commonUrl + 'newliveshop/tLivechannel/loadChannelByFee.do',
																dataType: 'json',
																type: 'post',
																data: postdata,
																success: function success(d) {
																	if (d["success"]) {
																		$("#auth-wrapper").hide();
																		xtAPI.liveInfo = d;
																		initLiving();
																	} else {
																		layui.use(['layer'], function () {
																			layer.msg("验证失败");
																		});
																	}
																}
															});
														} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
													});
												}
											});
										} else {
											postdata.code = $("#code").val();
											postdata.watchpwd = $("input[name=password]").val();
											$.ajax({
												url: xtAPI.commonUrl + ajaxurl,
												dataType: 'json',
												type: 'post',
												data: postdata,
												success: function success(d) {
													if (d["success"]) {
														$("#auth-wrapper").hide();
														xtAPI.liveInfo = d;
														initLiving();
													} else {
														layui.use(['layer'], function () {
															layer.msg("验证失败");
														});
													}
												}
											});
										}
									});
								}

								function initLiving() {
									localStorage.setItem("isChooseLogined", 1);//跳转成功后再标记
									Promise.all([xtAPI.loadindexitem(), xtAPI.giftlist(), easemob]).then(function (result) {
										var liveinfo = xtAPI.liveInfo["data"],
										    indexitem = result[0],
										    giftlist = result[1],
										    easemob = result[2];
										// loadhistorymsg = result[4];
										$(".loading").fadeOut();

										var _request = xtAPI.request;
										$(".headimg").attr("href", "https://h5.youzan.com/v2/showcase/homepage?kdt_id="+liveinfo["shop_youzan_id"])
										share.tit = liveinfo["sharetitle"] ? liveinfo["sharetitle"] : liveinfo["channelname"];
										document.title = liveinfo["channelname"];
										$(".livename").text(liveinfo["channelname"]);
										var $body = $('body');
										var $iframe = $('<iframe style="display:none" src="images/sharelogo.png"></iframe>');
										$iframe.on('load', function () {
											setTimeout(function () {
												$iframe.off('load').remove();
											}, 0);
										}).appendTo($body);
										share.des = liveinfo["sharecontent"] ? liveinfo["sharecontent"] : share.des;
										share.timelinesharecontent = liveinfo["timelinesharecontent"] ? liveinfo["timelinesharecontent"] : share.timelinesharecontent;
										// share.img = liveinfo["shareimg"];
										applicationInit.init();
										handleControl.playprop.width = liveinfo["width"];
										handleControl.playprop.height = liveinfo["height"];
										// alert("user",user)
										if (xtAPI.user) {
											localStorage.setItem("nickname", xtAPI.user["nickname"]);
											localStorage.setItem("headimg", xtAPI.user["headimg"]);
											localStorage.setItem("usercode", xtAPI.user["usercode"]);
											localStorage.setItem("password", xtAPI.user["password"]);
											localStorage.setItem("userid", xtAPI.user["userid"]);
										}

										// if(liveinfo["logoopen"]){
										if (indexitem["logo"]["logoimg"]) {
											$(".anchorheadimg").html('<img src="' + indexitem["logo"]["logoimg"] + '" alt="" class="response">');
											share.img = indexitem["logo"]["logoimg"];
											// $(".anchorheadimg").html(`<img src="${indexitem["logo"]["logoimg"]}" alt="" class="response">`);
										}
										// }


										if (liveinfo["advopen"] && indexitem["adv"].length != 0) {
											$(".adv").html('<a href="' + indexitem["adv"][0]["advurl"] + '"><img src="' + indexitem["adv"][0]["advtitle"] + '" class="response" alt=""></a>');
										} else {
											$(".adv").remove();
										}
										if (liveinfo["chatcheck"] == 1) {
											chatCheck = true;
											$(".discuss-input #msg-input").attr({ "readonly": false, "placeholder": '弹幕审核已开启' });
										}
										if (liveinfo["chatopen"] == 0) {
											chatOpen = false;
											$(".discuss-input #msg-input").attr({ "readonly": true, "placeholder": '全员禁言中' });
										}
										$(".live-items .hd li:first").addClass("active");

										applicationInit.resizePlayer();
										$.smartScroll($("#top"), '.scollelement');
										$(".player-wrapper").css("backgroundImage", "url(" + liveinfo["bakimg"] + ")");
										handleControl.showPlayer();
										var timecountend = indexitem["timer"]["timecountend"];
										if (liveinfo["liveopen"] == 0 && liveinfo["videoopen"] == 0) {
											$(".countdown-label").hide();
											$(".countdown-label").text("直播已结束");
											if (liveinfo["timecountopen"] != 1) {
												$(".countdown-wrapper").hide();
											} else {
												if (timecountend > 0) handleControl.formatSeconds(timecountend);
											}
										} else {
											if (liveinfo["timecountopen"] != 1 || timecountend < 0) {
												handleControl.showPlayer();
												// $(".countdown").hide();
											} else {
												// console.log("调用倒计时");									
												handleControl.formatSeconds(timecountend);
												// setInterval(function(){										
												// },1000);
											}
										}
										if(giftlist.length > 0){
											$(".recommend_product").attr("href",giftlist[0]["detail_url"]);
											$(".recommend_product").html('<div class="proimg">'+
								                '<img src="' + giftlist[0]["img_url"] + '" alt="">'+
								            '</div>'+
								            '<div class="proinfo">'+
								                '<div class="tit">' + giftlist[0]["shop_name"] + '</div>'+
								                '<div class="price">¥' +  Number(giftlist[0]["price"]).toFixed(2) + '</div>'+
								            '</div>');
										for (var i = 0, giftlist_length = giftlist.length; i < giftlist_length; i++) {
											$(".prolist-wrapper ul").append('<li>'+
					                        '<div class="proimg">'+
					                            '<img src="' + giftlist[i]["img_url"] + '" class="" alt="">'+
					                        '</div>'+
					                        '<div class="proinfo">'+
					                            '<div class="tit">' + giftlist[i]["shop_name"] + '</div>'+
					                            '<div class="pn">'+
					                                '<span class="price">¥ ' + Number(giftlist[i]["price"]).toFixed(2) + '</span>'+
					                                '<div class="ctrlnums">'+
					                                    '<a href="' + giftlist[i]["detail_url"] + '" class="btn btn-buy">马上购买</a>'+
					                                '</div>'+
					                            '</div>'+
					                        '</div>'+
					                    '</li>');
										}
									}else{
										$(".recommend_product").remove();
									}

									$(".ctrlnums a").click(function(e){
										e.preventDefault();
										var _this = $(this)
										easemob.sendMsg('在购买的路上',function(){
											window.location.href=_this.attr("href");
										});
										
									})
										$(".money-choose li:first").addClass("money-selected");

										$(".money-choose li").click(function () {
											var _this = $(this);
											$(".money-choose li[class=money-selected]").removeClass("money-selected");
											_this.addClass("money-selected");
											if (_this.attr("data-gift-id") == 6) {
												$(".redpacked-xll-body").addClass("showcustom");
											}
										});

										$(".sendbtn").click(function () {
											easemob.sendToAPI($("#msg-input").val(), 1);
											// easemob.sendMsg($("#msg-input").val());
										});

										// $(".generate-card").attr("href", "invite.html?liveid=" + _request["liveid"]);

										$(".numcount").text(liveinfo["uv"] + '人');
										$(".anchorheadimg img").attr("src", indexitem["logo"]["logoimg"]);
										// $(".adv img").attr("src",indexitem["adv"][0]["advurl"]);
										// try{
										easemob.roomId = liveinfo["chatroomid"];
										easemob.options.user = localStorage.getItem("usercode");
										easemob.options.pwd = localStorage.getItem("password");

										$.post(commonUrl + "newliveshop/im/getoldMsg.do", { "chatroomid": easemob.roomId, "perNumber": 10, "createtime": new Date().Format("yyyy-MM-dd hh:mm:ss") }, function (d) {
											// console.log(d)
											if (d["success"] == true) {
												for (var _i = d["data"]["historylist"].length - 1; _i >= 0; _i--) {
													easemob.appendMsg(d["data"]["historylist"][_i], 'txt');
												}
											}
											easemob.initWEBIM();
										});

										var functions = indexitem["function"];
										for (var i = 0; i < functions.length; i++) {
											switch (functions[i]["functiontype"]) {
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

										//检查上传的照片格式是否正确
										function checkFileType(dom) {
											var rt = false;
											layui.use(['layer'], function () {
												var layer = layui.layer;
												var filePath = dom.value;
												if (filePath) {
													var extname = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length).toLowerCase();
													if (extname != "bmp" && extname != "jpg" && extname != "gif" && extname != "png" && extname != "jpeg") {
														layer.msg("只能上传照片");
														rt = false;
													} else {
														if (dom.files[0].size / 1024 > 15000) {
															layer.msg("图片不能大于15M");
															rt = false;
														}
														rt = true;
													}
												} else {
													//     //layer.msg("请上传照片");
													rt = false;
												}
											});
											return rt;
										}

										$("input[name='sendpic']").change(function () {
											var pic = $("input[name='sendpic']");
											if (checkFileType(pic[0])) {
												layui.use(['layer'], function () {
													layer.open({
														title: '发送图片',
														area: ['80%', '80%'],
														content: '<div style="justify-content: center;display: flex;align-items: center;height: 100%; margin-bottom:0"><img src="" id="previewsend" /></div>'
														// ,content: `<div style="justify-content: center;display: flex;align-items: center;height: 100%; margin-bottom:0"><img src="" id="previewsend" /></div>`
														, closeBtn: 0,
														btn: ['发送', '取消'],
														yes: function yes(index, layero) {
															layer.close(index);
														}
													});
												});
												var oFile = pic[0].files[0];
												var oReader = new FileReader();
												oReader.onload = function (e) {
													$("#previewsend").attr("src", e.target.result);
												};
												oReader.readAsDataURL(oFile);
											}
										});
										$(".tocustomer").click(function () {
											$(".moneysum").val('');
											$(".redpacked-xll-body").removeClass("showcustom");
											$("#redpacket-dialog").addClass('show');
										});

										$(".redpacket-l").click(function () {
											$("#redpacket-dialog-to-customer").addClass("show");
										});

										document.querySelector(".discuss-pannel").addEventListener("scroll", handleControl.showhistorytop10, false);

										var getoken = new Promise(function (resolve) {
											$.post(xtAPI.commonUrl + "newliveshop/mImhistory/getImgUptoken.do", function (d) {
												qiniu_token = d["data"]["uptoken"];
												var uploader = Qiniu.uploader({
													runtimes: 'html5,flash,html4', // 上传模式,依次退化
													browse_button: 'pickfiles', // 上传选择的点选按钮，**必需**
													// 在初始化时，uptoken, uptoken_url, uptoken_func 三个参数中必须有一个被设置
													// 切如果提供了多个，其优先级为 uptoken > uptoken_url > uptoken_func
													// 其中 uptoken 是直接提供上传凭证，uptoken_url 是提供了获取上传凭证的地址，如果需要定制获取 uptoken 的过程则可以设置 uptoken_func
													uptoken: qiniu_token, // uptoken 是上传凭证，由其他程序生成
													// uptoken_url: '/uptoken',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
													// uptoken_func: function(file){    // 在需要获取 uptoken 时，该方法会被调用
													//    // do something
													//    return uptoken;
													// },
													get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的 uptoken
													// downtoken_url: '/downtoken',
													// Ajax请求downToken的Url，私有空间时使用,JS-SDK 将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
													unique_names: true, // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
													// save_key: true,                  // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
													domain: 'http://img.xiangtazhibo.com/', // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
													// container: 'container',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
													max_file_size: '100mb', // 最大文件体积限制
													flash_swf_url: 'path/of/plupload/Moxie.swf', //引入 flash,相对路径
													max_retries: 3, // 上传失败最大重试次数
													dragdrop: false, // 开启可拖曳上传
													drop_element: 'container', // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
													chunk_size: '4mb', // 分块上传时，每块的体积
													auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
													multi_selection: false,
													//x_vars : {
													//    自定义变量，参考http://developer.qiniu.com/docs/v6/api/overview/up/response/vars.html
													//    'time' : function(up,file) {
													//        var time = (new Date()).getTime();
													// do something with 'time'
													//        return time;
													//    },
													//    'size' : function(up,file) {
													//        var size = file.size;
													// do something with 'size'
													//        return size;
													//    }
													//},
													init: {
														'FilesAdded': function FilesAdded(up, files) {
															plupload.each(files, function (file) {
																// 文件添加进队列后,处理相关的事情
															});
														},
														'BeforeUpload': function BeforeUpload(up, file) {
															// 每个文件上传前,处理相关的事情
														},
														'UploadProgress': function UploadProgress(up, file) {
															// 每个文件上传时,处理相关的事情
														},
														'FileUploaded': function FileUploaded(up, file, info) {
															// 每个文件上传成功后,处理相关的事情
															// 其中 info 是文件上传成功后，服务端返回的json，形式如
															// {
															//    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
															//    "key": "gogopher.jpg"
															//  }
															// 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

															var domain = up.getOption('domain');
															var res = $.parseJSON(info);
															var sourceLink = domain + res.key; //获取上传成功后的文件的Url
															easemob.sendToAPI(sourceLink, 7);
															$(".function-menu").removeClass("showfuntion");
														},
														'Error': function Error(up, err, errTip) {
															//上传出错时,处理相关的事情
														},
														'UploadComplete': function UploadComplete() {
															//队列文件处理完毕后,处理相关的事情
														}
													}
												});
											});
										});
									});
								}
								//promise end
							});
						} else {
						// resolve(false);
						window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newliveshop/eblive/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=" + from + "#wechat_redirect";
					}
				}
			});
		} else {
			var isWeixin = /MicroMessenger/i.test(navigator.userAgent);
			// $(".callfunctionbtn").hide();
			if (localStorage.getItem("isChooseLogined") && isWeixin) {
				window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newliveshop/eblive/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=" + from + "#wechat_redirect";
				return;
			}
			 
			$.ajax({
				url: commonUrl + 'newliveshop/stemp/getChannelAuth.do',
				type: 'post',
				dataType: "json",
				data: { liveId: request["liveid"] },
				success: function success(d) {
					if (d["data"]["authwatch"] != 0) {
						window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newliveshop/eblive/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=" + from + "#wechat_redirect";
					} else {
						if (d["data"]["leaderimgOpen"] != 0) {
							//欢迎页
							$(".welcome").css("backgroundImage", "url(" + d["data"]["leaderimg"] + ")").show();
							$(".welcome .skip").click(function () {
								$(".welcome").fadeOut(1000);
							});
							var welcome_countdown = null,
							    welcome_second = 3;

							var welcome_countdown = setInterval(function () {
								if (welcome_second > 0) {
									$(".welcome .skip span").text(--welcome_second);
								} else {
									clearInterval(welcome_countdown);
								}
							}, 1000);
							setTimeout(function () {
								$(".welcome").fadeOut(1000);
							}, 3000);
						}
						Promise.all([xtAPI.getChannelInfo(), xtAPI.loadindexitem(),xtAPI.giftlist()]).then(function (result) {
							var liveinfo = xtAPI.liveInfo["data"] = result[0],
							    indexitem = result[1],giftlist = result[2];
							$(".loading").fadeOut();
							$(".headimg").attr("href", "https://h5.youzan.com/v2/showcase/homepage?kdt_id="+liveinfo["shop_youzan_id"])
							var _request = xtAPI.request;

							share.tit = liveinfo["sharetitle"] ? liveinfo["sharetitle"] : liveinfo["channelname"];
							document.title = liveinfo["channelname"];
							$(".livename").text(liveinfo["channelname"]);
							share.des = liveinfo["sharecontent"] ? liveinfo["sharecontent"] : share.des;
							share.timelinesharecontent = liveinfo["timelinesharecontent"] ? liveinfo["timelinesharecontent"] : share.timelinesharecontent;
							handleControl.playprop.width = liveinfo["width"];
							handleControl.playprop.height = liveinfo["height"];
							if (liveinfo["advopen"] && indexitem["adv"].length != 0) {
								$(".adv").html('<a href="' + indexitem["adv"][0]["advurl"] + '"><img src="' + indexitem["adv"][0]["advtitle"] + '" class="response" alt=""></a>');
							} else {
								$(".adv").remove();
							}
							if (liveinfo["chatcheck"] == 1) {
								chatCheck = true;
								$(".discuss-input #msg-input").attr({ "readonly": false, "placeholder": '弹幕审核已开启' });
							}
							if (liveinfo["chatopen"] == 0) {
								chatOpen = false;
								$(".discuss-input #msg-input").attr({ "readonly": true, "placeholder": '全员禁言中' });
							}
							applicationInit.init();

							$(".live-items .hd li:first").addClass("active");
							if (liveinfo["questopen"]) {
								$(".questionnaire").show().append("<div class='qtitems'> <p><img src='images/questionnarieicon.png' />" + liveinfo["questtitle"] + "</p><a href='" + liveinfo["questUrl"] + "' class='fr'>点击进入</a></div>");
							}
							if (liveinfo["voteopen"]) {
								$(".questionnaire").show().append("<div class='qtitems v'> <p><img src='images/questionnarieicon.png' />" + liveinfo["votename"] + "</p><a href='javascript:;' class='fr'>点击进入</a></div>");
							}

							setInterval(handleControl.rollQT, 5000);

							if (indexitem["logo"]["logoimg"]) {
								$(".anchorheadimg").html('<img src="' + indexitem["logo"]["logoimg"] + '" alt="" class="response">');
								share.img = indexitem["logo"]["logoimg"];
								// $(".anchorheadimg").html(`<img src="${indexitem["logo"]["logoimg"]}" alt="" class="response">`);
							}

							var timecountend = indexitem["timer"]["timecountend"];
							handleControl.showPlayer();
							if (liveinfo["liveopen"] == 0 && liveinfo["videoopen"] == 0) {
								$(".countdown-label").hide();
								$(".countdown-label").text("直播已结束");
								if (liveinfo["timecountopen"] != 1) {
									$(".countdown-wrapper").hide();
								} else {
									if (timecountend > 0) handleControl.formatSeconds(timecountend);
								}
							} else {
								if (liveinfo["timecountopen"] != 1 || timecountend < 0) {
									handleControl.showPlayer();
									// $(".countdown").hide();
								} else {
									// console.log("调用倒计时");									
									handleControl.formatSeconds(timecountend);
									// setInterval(function(){										
									// },1000);
								}
							}

							if(giftlist.length > 0){
											$(".recommend_product").attr("href",giftlist[0]["detail_url"]);
											$(".recommend_product").html('<div class="proimg">'+
								                '<img src="' + giftlist[0]["img_url"] + '" alt="">'+
								            '</div>'+
								            '<div class="proinfo">'+
								                '<div class="tit">' + giftlist[0]["shop_name"] + '</div>'+
								                '<div class="price">¥' +  Number(giftlist[0]["price"]).toFixed(2) + '</div>'+
								            '</div>');
										for (var i = 0, giftlist_length = giftlist.length; i < giftlist_length; i++) {
											$(".prolist-wrapper ul").append('<li>'+
					                        '<div class="proimg">'+
					                            '<img src="' + giftlist[i]["img_url"] + '" class="" alt="">'+
					                        '</div>'+
					                        '<div class="proinfo">'+
					                            '<div class="tit">' + giftlist[i]["shop_name"] + '</div>'+
					                            '<div class="pn">'+
					                                '<span class="price">¥ ' + Number(giftlist[i]["price"]).toFixed(2) + '</span>'+
					                                '<div class="ctrlnums">'+
					                                    '<a href="' + giftlist[i]["detail_url"] + '" class="btn btn-buy">马上购买</a>'+
					                                '</div>'+
					                            '</div>'+
					                        '</div>'+
					                    '</li>');
										}
									}else{
										$(".recommend_product").remove();
									}
							// $(".numcount").text('1154人');
							$(".numcount").text(liveinfo["uv"] + '人');
							$(".anchorheadimg img").attr("src", indexitem["logo"]["logoimg"]);

							$.smartScroll($("#top"), '.discuss-pannel');
							applicationInit.resizePlayer();
							$(".player-wrapper").css("backgroundImage", "url(" + liveinfo["bakimg"] + ")");
							$(".numcount").text(liveinfo["uv"] + '人');

							easemob.roomId = liveinfo["chatroomid"];
							easemob.options.user = '9a088d3826ae45cfbc7099857f487b8f';
							easemob.options.pwd = '9a088d3826ae45cfbc7099857f487b8f';

							$.post(commonUrl + "newliveshop/im/getoldMsg.do", { "chatroomid": easemob.roomId, "perNumber": 10, "createtime": new Date().Format("yyyy-MM-dd hh:mm:ss") }, function (d) {
								// console.log(d)
								if (d["success"] == true) {
									for (var _i = d["data"]["historylist"].length - 1; _i >= 0; _i--) {
										easemob.appendMsg(d["data"]["historylist"][_i], 'txt');
									}
								}
								easemob.initWEBIM();
							});

							var functions = indexitem["function"];
							for (var i = 0; i < functions.length; i++) {
								switch (functions[i]["functiontype"]) {
									case 1:
										$(".tocustomer").show();
										break;
									case 3:
										$(".redpacket-l").show();
										break;
								}
							}

							document.querySelector(".discuss-pannel").addEventListener("scroll", handleControl.showhistorytop10, false);

							$(".sendbtn,.generate-card,.tocustomer,.redpacket-l,.qtitems.v a,#pickfiles").click(function () {
								$("#iosDialog1").fadeIn(200);
							});
							$(".weui-dialog__btn_default").click(function () {
								$("#iosDialog1").fadeOut(200);
							});
							$(".weui-dialog__btn_primary").click(function () {
								
								if(!isWeixin){
								 	layui.use(['layer'], function () {
										layer.msg("请在微信中打开授权");
									});
								 	// return;
								 }else{
								 	localStorage.setItem("isChooseLogined", 1);
								window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newlive/web/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
								 }
							});
						});
					}
				}
			});
		}

		// }
		// });
	};

	var liveInfo = function liveInfo() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newliveshop/tLivechannel/loadChannel.do',
				type: 'post',
				dataType: 'json',
				data: { "liveid": request["liveid"], "userOrigin": xtAPI.from },
				success: function success(d) {
					// checkSession(d["code"]);
					if (d["code"] == 1013) {
						window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newliveshop/eblive/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
					} else {
						xtAPI.liveInfo = d["data"];
						resolve(xtAPI.liveInfo);
					}
				}
				// ,error:function(){
				// 	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa5af90cb393880b6&redirect_uri=http://www.xiangtazhibo.com/newliveshop/web/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				// }
			});
		});
	};

	var getChannelInfo = function getChannelInfo() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newliveshop/stemp/getChannelInfo.do',
				type: 'post',
				dataType: 'json',
				data: { "liveId": request["liveid"], "userOrigin": xtAPI.from },
				success: function success(d) {
					// checkSession(d["code"]);
					if (d["code"] == 1013) {
						window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newliveshop/eblive/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
					} else {
						xtAPI.liveInfo = d["data"];
						resolve(xtAPI.liveInfo);
					}
				}
				// ,error:function(){
				// 	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa5af90cb393880b6&redirect_uri=http://www.xiangtazhibo.com/newliveshop/web/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				// }
			});
		});
	};

	var giftlist = function giftlist() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newliveshop/tGoods/getGoodsList.do',
				type: 'post',
				dataType: 'json',
				data: { "liveId": request["liveid"] },
				success: function success(d) {
					resolve(d["data"]["list"]);
				}
			});
		});
	};

	var showhistory = function showhistory() {
		var topli = document.querySelector(".message-list li[data-createtime]");
		$.post(commonUrl + "newliveshop/im/getoldMsg.do", { "chatroomid": easemob.roomId, "perNumber": 10, "createtime": topli.getAttribute("data-createtime") }, function (d) {
			var historylist = d["data"]["historylist"];
			if (d["success"] == true && historylist.length > 0) {
				for (var _i = 0; _i < historylist.length; _i++) {
					easemob.appendMsg(historylist[_i], 'txt', false);
				}
			}
			// console.log(topli.attr("data-createtime"))
			topli.scrollIntoView();
			document.querySelector(".discuss-pannel").addEventListener("scroll", handleControl.showhistorytop10, false);
		});
	};

	var loadindexitem = function loadindexitem() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newliveshop/tLivechannel/getLoaditems.do',
				type: 'post',
				dataType: 'json',
				data: { "liveid": request["liveid"], types: "1,2,3,4,5,6,7" },
				success: function success(d) {
					if (d["success"] == true) {
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var loadhistorymsg = function loadhistorymsg() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newliveshop/im/getHistoryMsg.do',
				type: 'post',
				dataType: 'json',
				data: { "groupid": easemob.roomId, "startnum": 0, "pernum": 10 },
				success: function success(d) {
					if (d["success"] == true) {
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var getredpacket = function getredpacket(rpid) {
		$("#getredpacket .desc").html('');
		$.ajax({
			url: commonUrl + 'newliveshop/tHongbao/grapHongbao.do',
			type: 'post',
			dataType: 'json',
			data: { 'liveid': request["liveid"], 'hongbaoid': rpid },
			success: function success(d) {
				if (d["success"]) {
					var getmoney = parseInt(d["data"]["getMoney"]);
					if (getmoney > 0) {
						$("#getredpacket .desc").html("<p>恭喜您获得" + (getmoney / 100).toFixed(2) + "元红包</p><p>红包直接发送到您的账户中，请注意查收</p>");
					} else {
						$("#getredpacket .desc").html("<p>红包已经被抢光了</p><p></p>");
					}
					$("#getredpacket").addClass("show");
				} else {
					$("#getredpacket .desc").html("<p>" + d.msg + "</p><p></p>");
					$("#getredpacket").addClass("show");
				}
			}
		});
	};

	var accountmoney = function accountmoney() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newliveshop/tAccount/getAccountMoney.do',
				type: 'post',
				dataType: 'json',
				success: function success(d) {
					if (d["code"] == 1013) {
						resolve(false);
					} else {
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var getPhoneUserAccount = function getPhoneUserAccount() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newliveshop/tUser/getPhoneUserAccount.do',
				type: 'post',
				dataType: 'json',
				success: function success(d) {
					if (d["code"] == 1013) {
						resolve(false);
					} else {
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var withdraw = function withdraw() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newliveshop/tAccount/getDrawedRecords.do',
				type: 'post',
				dataType: 'json',
				success: function success(d) {
					resolve(d["data"]);
				}
			});
		});
	};

	var getAccountRecord = function getAccountRecord() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newliveshop/tAccountrecord/getAccountRecord.do',
				type: 'post',
				data: { userType: 2, type: 2 },
				dataType: 'json',
				success: function success(d) {
					resolve(d["data"]);
				}
			});
		});
	};

	var webGetChannels = function webGetChannels() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newliveshop/tLivechannel/webGetChannels.do',
				type: 'post',
				dataType: 'json',
				data: { liveid: request["liveid"] },
				success: function success(d) {
					if (d["code"] == 1013) {
						resolve(false);
					} else {
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var webGetCases = function webGetCases() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newliveshop/tLivechannel/getRecommendLiveChannels.do',
				type: 'post',
				dataType: 'json',
				data: { liveid: request["liveid"] },
				success: function success(d) {
					if (d["code"] == 1013) {
						resolve(false);
					} else {
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var applicationmoney = function applicationmoney() {
		$.ajax({
			url: commonUrl + 'newliveshop/tAccount/drawMoney.do',
			data: { "money": Number($("#withdrawmoney").val()).toFixed(2) }, //Number后NaN判断下呢？！
			dataType: 'json',
			type: 'post',
			success: function success(d) {
				// if(d["code"]==1901){}
				// console.log(accountmoney)
				var withdrawpic = '';
				switch (d["code"]) {
					case 1901:
						withdrawpic = 'images/accountsuccess.png';
						break;
					case 1507:
						withdrawpic = 'images/nomoney.png';
						break;
					default:
						withdrawpic = 'images/withdrawerror.png';
						break;
				}
				$(".redpacket-wrapper img").attr("src", withdrawpic);
				// $(".account").text(accountmoney["[[PromiseValue]]"]);
				// Promise.all([accountmoney]).then(function(result){
				// 	$(".account").text(result[0]);
				// });

				$.ajax({
					url: commonUrl + 'newliveshop/tAccount/getAccountMoney.do',
					type: 'post',
					dataType: 'json',
					success: function success(d) {
						$(".account").text(d["data"]["money"]);
					}
				});

				$(".returnmessgae").text(d["msg"]);
				$("#withdrawmoney").val('');
				$("#redpacket-dialog").addClass("show");
			}
		});
	};

	var anchor_applicationmoney = function anchor_applicationmoney() {
		$.ajax({
			url: commonUrl + 'newliveshop/tAccount/drawMoneyPhoneUser.do',
			data: { "money": Number($("#withdrawmoney").val()).toFixed(2) }, //Number后NaN判断下呢？！ 我就不判断~
			dataType: 'json',
			type: 'post',
			success: function success(d) {
				// if(d["code"]==1901){}
				// console.log(accountmoney)
				var withdrawpic = '';
				switch (d["code"]) {
					case 1901:
						withdrawpic = 'images/accountsuccess.png';
						break;
					case 1507:
						withdrawpic = 'images/nomoney.png';
						break;
					default:
						withdrawpic = 'images/withdrawerror.png';
						break;
				}
				$(".redpacket-wrapper img").attr("src", withdrawpic);

				$.ajax({
					url: commonUrl + 'newliveshop/tUser/getPhoneUserAccount.do',
					type: 'post',
					dataType: 'json',
					success: function success(d) {
						$(".account").text(d["data"]["money"]);
					}
				});

				$(".returnmessgae").text(d["msg"]);
				$("#withdrawmoney").val('');
				$("#redpacket-dialog").addClass("show");
			}
		});
	};

	var getWxsign = function getWxsign() {
		$.ajax({
			url: commonUrl + "newliveshop/wechat/getWxSign.do",
			type: "post",
			dataType: "json",
			data: {
				url: window.location.href
			},
			success: function success(data) {
				// alert(data["data"]["signature"]);
				if (data["success"] == true) {
					wx.config({
						debug: false,
						appId: xtAPI.appid,
						timestamp: data["data"]["timestamp"],
						nonceStr: data["data"]["nonceStr"],
						signature: data["data"]["signature"],
						jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
					});

					wx.ready(function () {
						wx.onMenuShareTimeline({
							title: share.timelinesharecontent, /*分享标题*/
							link: share.link, /*分享链接*/
							imgUrl: share.img, /*分享图标*/
							success: function success() {
								// show_weui_alert("","分享成功");
							},
							cancel: function cancel() {
								// show_weui_alert("","分享已取消");
							},
							fail: function fail() {
								// show_weui_alert("","分享失败");
							}
						});

						wx.onMenuShareAppMessage({
							title: share.tit, /*分享标题*/
							desc: share.des, // 分享描述
							link: share.link, /*分享链接*/
							imgUrl: share.img, /*分享图标*/
							success: function success() {
								// show_weui_alert("","分享成功");
							},
							cancel: function cancel() {
								// show_weui_alert("","分享已取消");
							},
							fail: function fail() {
								// show_weui_alert("","分享失败");
							}

						});
					});
				}
			}
		});
	};

	var invite = function invite() {
		$("#invite-dialog").html("<img src='" + commonUrl + "newliveshop/tLivechannel/makeQrcode.do?liveid=" + request["liveid"] + "'/>");
	};

	return {
		request: request,
		commonUrl: commonUrl,
		appid: appid,
		user: user,
		wechatlogin: wechatlogin,
		liveInfo: liveInfo,
		loadindexitem: loadindexitem,
		invite: invite,
		giftlist: giftlist,
		withdraw: withdraw,
		getredpacket: getredpacket,
		accountmoney: accountmoney,
		applicationmoney: applicationmoney,
		getWxsign: getWxsign,
		webGetChannels: webGetChannels,
		share: share,
		getPhoneUserAccount: getPhoneUserAccount,
		anchor_applicationmoney: anchor_applicationmoney,
		getAccountRecord: getAccountRecord,
		from: from,
		webGetCases: webGetCases,
		getChannelInfo: getChannelInfo,
		showhistory: showhistory
	};
}();

var wxPay = function () {

	var brandwcpayrequest = {
		"appId": xtAPI.appid,
		"timeStamp": "",
		"nonceStr": "",
		"package": "",
		"signType": "MD5",
		"paySign": ""
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
	var onBridgeReady = function onBridgeReady(type, giftid, sendmoney) {
		$.ajax({
			type: "post",
			url: xtAPI.commonUrl + "newliveshop/tGiftrecord/getWxPayidForgift.do",
			data: { "type": type, "liveid": xtAPI.request["liveid"], "giftid": giftid, besenderid: "f44aa085334c47b899597d5441f293f5", "sendmoney": sendmoney },
			datatype: "json",
			success: function success(data) {
				var jsondata = data["data"];
				brandwcpayrequest["package"] = jsondata["package"];
				brandwcpayrequest["paySign"] = jsondata["paySign"];
				brandwcpayrequest["timeStamp"] = jsondata["timeStamp"];
				brandwcpayrequest["nonceStr"] = jsondata["nonceStr"];
				WeixinJSBridge.invoke('getBrandWCPayRequest', brandwcpayrequest, function (res) {
					$(".ctdialog").removeClass("show");
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						$(".ctdialog").removeClass("show");

						$.ajax({
							url: xtAPI.commonUrl + 'newliveshop/tLivechannel/getLoaditems.do',
							type: 'post',
							dataType: 'json',
							data: { "liveid": xtAPI.request["liveid"], types: 6 },
							success: function success(d) {
								if (d["success"] == true) {
									var rewardlist = d["data"]["rewardlist"],
									    rewardlistlength = rewardlist.length;
									$("#payrank").html('');
									for (var i = 0; i < rewardlistlength; i++) {
										var uname = rewardlist[i]["sendername"];
										$("#payrank").append('<li>' + '<img src="' + rewardlist[i]["headimg"] + '" alt="" class="headimg fl">' + 'No.' + (i + 1) + ' ' + (uname.length > 6 ? uname.substring(0, 6) + '...' : uname) + '<span class="fr">打赏' + rewardlist[i]["total"] + '元</span></li>');
									}
								}
							}
						});
					} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
				});
			},
			error: function error() {
				alert("请求异常");
			}
		});
	};

	var sendtocustomer = function sendtocustomer(money, hongbaotype, sendtxt, detailnum) {
		if (parseFloat(money / detailnum) >= 0.01) {
			$.ajax({
				type: "post",
				url: xtAPI.commonUrl + "newliveshop/tHongbao/sendHongbao.do",
				data: { "money": money, "liveid": xtAPI.request["liveid"], "hongbaotype": hongbaotype, sendtxt: sendtxt, "detailnum": detailnum },
				datatype: "json",
				success: function success(data) {
					var jsondata = data["data"];
					brandwcpayrequest["package"] = jsondata["package"];
					brandwcpayrequest["paySign"] = jsondata["paySign"];
					brandwcpayrequest["timeStamp"] = jsondata["timeStamp"];
					brandwcpayrequest["nonceStr"] = jsondata["nonceStr"];
					WeixinJSBridge.invoke('getBrandWCPayRequest', brandwcpayrequest, function (res) {
						$(".ctdialog").removeClass("show");
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							$(".ctdialog").removeClass("show");
						} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
					});
				},
				error: function error() {
					alert("请求异常");
				}
			});
		} else {
			layui.use(['layer'], function () {
				layer.msg("红包数值填写的不正确");
			});
		}
	};

	return {
		onBridgeReady: onBridgeReady,
		sendtocustomer: sendtocustomer,
		brandwcpayrequest: brandwcpayrequest
	};
}();
