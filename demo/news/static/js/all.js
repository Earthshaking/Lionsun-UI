
/*
* @description 订单管理   orderManager.html
* @function 表单提交 
*/
$(function(){

  $("#orderstatus").change(function(e){

    jQuery("#ListForm").submit(); 
  });


  $("#paytype").change(function(e){

    jQuery("#ListForm").submit(); 
  });


});



 /**
* @description 频道设置 channelSetting.html
* @function 频道封面上传 
* @param 图像对象obj
*/
function holderImg(obj) {
  var fileInput = $(obj);
  var image_holder = fileInput.prev('.bannerPlaceholder');
  image_holder.empty();
  if (typeof (FileReader) != "undefined") {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("<img />", {
        "src": e.target.result,
        "class": "placeholderImg"
      }).appendTo(image_holder);
    };
    image_holder.show();
    reader.readAsDataURL(fileInput[0].files[0]);
  } else {
    layer.alert("你的浏览器不支持上传图片预览.");
  }
}

 /**
* @description 频道设置 channelSetting.html
* @function 频道logo上传 
* @param 图像对象obj
*/
function holderLogo(obj) {
  var fileInput = $(obj);
  var image_holder = $("#logoHolder")
  if (typeof (FileReader) != "undefined") {
    var reader = new FileReader();
    reader.onload = function (e) {
      image_holder.attr('src', e.target.result);
    };
    image_holder.show();
    reader.readAsDataURL(fileInput[0].files[0]);
  } else {
    layer.alert("你的浏览器不支持上传图片预览.");
  }
} 

 /**
* @description 消息数量点击后清零，并跳转至消息列表页面
* @param 用户id   uid
*/
function messageList(uid){
 $(".tag").html("0");
 $.ajax({
  type:"POST",
  url:"mesStatusChange.htm",
  data:null,
  success:function(data){
    if (data==false) {
      alert("系统错误");
      return false;
    }
  }
});
 window.open("member/memberSpace.htm?uid="+uid+"#mymsg");
        // $('#messageVal').html('0');
      }

      function memberMessageList(uid){
       $(".tag").html("0");
       $.ajax({
        type:"POST",
        url:"../mesStatusChange.htm",
        data:null,
        success:function(data){
          if (data==false) {
            alert("系统错误");
            return false;
          }
        }
      });
       window.parent.myframe.location.href="messages.htm?uid="+uid+"#mymsg";

        // $('#messageVal').html('0');

      }  

      function channelMessageList(uid){
       $(".tag").html("0");
       $.ajax({
        type:"POST",
        url:"../mesStatusChange.htm",
        data:null,
        success:function(data){
          if (data==false) {
            alert("系统错误");
            return false;
          }
        }
      });
       window.open("../member/memberSpace.htm?uid="+uid+"#mymsg");

        // $('#messageVal').html('0');

      }
      
      function personMessageList(uid){
          $(".tag").html("0");
          $.ajax({
           type:"POST",
           url:"../mesStatusChange.htm",
           data:null,
           success:function(data){
             if (data==false) {
               alert("系统错误");
               return false;
             }
           }
         });
          window.open("../member/memberSpace.htm?uid="+uid+"#mymsg");

           // $('#messageVal').html('0');
         }


   /* jQuery("#messageVal").click(function(){
        alert("0");
      })*/

 /**
* @description 关注用户
* @param 被关注用户user_id  关注用户curUserId  未登录跳转url   
*/
      function getattention(user_id,curUserId,url,obj){

        if (curUserId==0) {
            alertModal(2, "请先登录", function (index) {
                layer.close(index);
            });
          window.location.href="user/login.htm";
          return false;
        }

        if(curUserId==user_id){
            alertModal(2, "自己不能关注自己", function (index) {
                layer.close(index);
            });
        }else{
          jQuery.ajax({
            type:'POST',
            url:url,
            data:{"user_id":user_id},
            beforeSend:function(){
            },
            success:function(data){
             if(data){
                 $(obj).html("√ 已关注").addClass('dised');
                 alertModal(1, "关注成功", function (index) {
                     layer.close(index);
                 });
             }else{
                 alertModal(2, "关注失败", function (index) {
                     layer.close(index);
                 });
             }    
           }
         });
        }
      }

 /**
* @description 第三方分享
* @param 分享平台选择 type
*/
      function shareTo(type){
      
        // 文章标题
        var title = $('#articleTitle').text();
        var img = $('#img').val();
        var goods_summary = $('#goods_summary').val();

        // qq分享
        if (type=='qzone') {
          window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+document.location.href+'?sharesource=qzone&title='+title+'&pics='+img+'&summary='+goods_summary);
        }
        // 新浪微博分享
        if (type=='sina') {
          window.open('https://service.weibo.com/share.php?url='+document.location.href+'?sharesource=weibo&title='+title+'&pic='+img+'&appkey=2706825840');
        }


        if (type='wechat') {
          window.open('https://zixuephp.net/inc/qrcode_img.php?url=http://zixuephp.net/article');
        }
  }


 /**
* @description 投递页面弹窗
* @param 用户id--curID
*/
    function submitArticle(curID){
     showIframeModal(['680px', '720px'], '../seller/article_show.htm?type=0&curID='+curID, function () {

     });
    }

/*function kk(){

  $.ajax({
     type:"POST",
    url:"getfavoriteList.htm",
})
}*/



