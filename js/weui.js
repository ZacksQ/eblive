function show_weui_alert (tit,con) {
    var alt=$(".weui_dialog_alert");
    if(tit==""){
        tit="象塔提示";
    }
    alt.find(".weui_dialog_title").text(tit);
    alt.find(".weui_dialog_bd").text(con);
    alt.show();
    alt.find(".primary").bind("click",function(){
        hide_dialog(alt);
    })
}


function show_weui_confirm (tit,con,callback) {
    var alt=$(".weui_dialog_confirm");
    if(tit==""){
        tit="象塔提示";
    }
    alt.find(".weui_dialog_title").text(tit);
    alt.find(".weui_dialog_bd").text(con);
    alt.show();
    alt.find(".default").bind("click",function(){
        hide_dialog(alt);
    })
    alt.find(".primary").bind("click",function(){
        hide_dialog(alt);
        callback();
    })
}

function hide_dialog(obj){
    obj.hide();
}
