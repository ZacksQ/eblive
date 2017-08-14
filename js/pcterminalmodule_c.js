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
		SewisePlayer.setup({
			server: "live",
			type: "rtmp",
			// videourl: 'http://27046.hlsplay.aodianyun.com/newlive2016/'+liveconfig["stream"]+'.m3u8',
			streamurl: 'rtmp://27046.lssplay.aodianyun.com/devnewlive2016/' + xtAPI.liveInfo["data"]["stream"],
			skin: "liveWhite",
			title: xtAPI.liveInfo["data"]["channelname"],
			lang: 'zh_CN',
			poster: xtAPI.liveInfo["data"]["bakimg"],
			topbardisplay: "disable",
			autostart: "false",
			timedisplay: "disable"
		});
		$(".handleqr").click(function(){
			$(".wim").toggle();
		})
		$(".wim").html('<img src="' + xtAPI.commonUrl + 'newliveshop/im/makeQrcode.do?content=' + xtAPI.commonUrl + 'newliveshop/eblive/index.html?liveid=' + xtAPI.request["liveid"] +'" />');

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
		$("#player video").css("height", $(window).height() + 'px');
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

		if(isMobile){
			window.location.href="index.html?liveid=" + xtAPI.request["liveid"];
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
				postdata.liveid = request["liveid"];
				postdata.type = "webapp";

			$.ajax({
				url: commonUrl + 'newliveshop/tUser/wxWeblogin.do',
				type: 'post',
				dataType: 'json',
				data: postdata,
				success: function success(d) {

					// if (d["success"] == true) {
							xtAPI.user = d["data"];
							// alert(d["data"]["usercode"])
							// resolve(xtAPI.user);
							Promise.all([xtAPI.liveInfo()]).then(function (result) {
								console.log("result:", result); //用户信息返回
										initLiving()
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
										// $.smartScroll($(".container"), '.content-slide');
										$(".player-wrapper").css("backgroundImage", "url(" + liveinfo["bakimg"] + ")");
										
										if(giftlist.length > 0){
											
										for (var i = 0, giftlist_length = giftlist.length; i < giftlist_length; i++) {
											$(".product-list").append(
							                    '<div class="product-item">'+
							                        '<div class="product-img">'+
							                            '<img src="' + giftlist[i]["img_url"] + '" alt="">'+
							                        '</div>'+
							                        '<div class="product-tit">'+
							                             giftlist[i]["shop_name"] + 
							                        '</div>'+
							                        '<div class="product-pn">'+
							                            '<span class="product-price">¥ ' + Number(giftlist[i]["price"]).toFixed(2) + '</span>'+
							                            '<div class="choose-num">'+
							                                '<a href="' + giftlist[i]["detail_url"] + '" class="btn btn-cost">马上购买</a>'+
							                            '</div>'+
							                        '</div>'+
							                    '</div>');
										}
									}

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
									
										document.querySelector(".discuss-pannel").addEventListener("scroll", handleControl.showhistorytop10, false);

						
									});
								}
								//promise end
							});
						// } 
				}
			});
		} else {
			// $(".callfunctionbtn").hide();
			// if (localStorage.getItem("isChooseLogined")) {
			// 	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newliveshop/eblive/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=" + from + "#wechat_redirect";
			// 	return;
			// }
			$(".wechatlogin").attr("href","https://open.weixin.qq.com/connect/qrconnect?appid=wx374982dd7f263bc0&redirect_uri=" + xtAPI.commonUrl + "newliveshop/eblive/pcvideo.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect");
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

							var _request = xtAPI.request;
							$(".date .d").text(indexitem["timer"]["timecountendStr"]);
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
										for (var i = 0, giftlist_length = giftlist.length; i < giftlist_length; i++) {
											$(".product-list").append('<div class="product-item">'+
							                        '<div class="product-img">'+
							                            '<img src="' + giftlist[i]["img_url"] + '" alt="">'+
							                        '</div>'+
							                        '<div class="product-tit">'+
							                             giftlist[i]["shop_name"] + 
							                        '</div>'+
							                        '<div class="product-pn">'+
							                            '<span class="product-price">¥ ' + Number(giftlist[i]["price"]).toFixed(2) + '</span>'+
							                            '<div class="choose-num">'+
							                                '<a href="' + giftlist[i]["detail_url"] + '" class="btn btn-cost">马上购买</a>'+
							                            '</div>'+
							                        '</div>'+
							                    '</div>');
										}
									}
							// $(".numcount").text('1154人');
							$(".numcount").text(liveinfo["uv"] + '人');
							$(".anchorheadimg img").attr("src", indexitem["logo"]["logoimg"]);

							$.smartScroll($(".container"), '.content-slide');
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
								
								window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newliveshop/eblive/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
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
