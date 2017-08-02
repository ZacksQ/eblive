 function getWxsign(){
        $.ajax({
            url:"/xtlive/tUser/getWxSign.do",
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
                                    show_weui_alert("","分享成功");
                                },
                                cancel: function () { 
                                    show_weui_alert("","分享已取消");
                                },
                                fail:function(){
                                    show_weui_alert("","分享失败");
                               }
                            });
                            
                            wx.onMenuShareAppMessage({
                                title: share.tit, /*分享标题*/
                                desc:  share.des, // 分享描述
                                link: window.location.href, /*分享链接*/
                                imgUrl: share.img,  /*分享图标*/
                                success: function () { 
                                    show_weui_alert("","分享成功");
                                },
                                cancel: function () { 
                                    show_weui_alert("","分享已取消");
                                },
                                fail:function(){
                                    show_weui_alert("","分享失败");
                               }
                               
                            });
                      });
                }
            }
        })
    }