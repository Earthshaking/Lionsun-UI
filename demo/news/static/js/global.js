/*!
  * Global.js v1.0.0
  * Copyright 2019 The Global Authors 方凌松
  * Licensed under MIT (https://...)
  */

if (typeof jQuery === 'undefined') {
    throw new Error('Global.js 无法找到 jQuery...')
}

+function ($) {
    'use strict';
    var version = $.fn.jquery.split(' ')[0].split('.');
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
        throw new Error('Global.js 依赖于 jQuery version 1.9.1 或者更高版本')
    }
}(jQuery);

var domain = window.location.host;//document.domain;
var pathName = document.location.pathname;
var projectName = pathName.substring(0,pathName.substr(1).indexOf("/")+1);
var basePath = "http://"+domain+projectName+"/";
//console.log("basePath = "+basePath);

/**
 * 关闭iframe层弹窗
 */
function closeParentLayer() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

/**
 * 动态父页面iframe的高度
 * @param iframeID  指定的iframe元素
 */
function setIframeHeight(iframeID) {
    var iframe = document.getElementById(iframeID);
    iframe.height = 0;
    var channelSidebar = $("#channelSidebarBox");
    var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
    if (iframe) {
        if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
            channelSidebar.css("height", iframe.height + "px");
            // if (iframe.height < 500) {
            //     channelSidebar.css("height", "100%");
            // }
        }
    }
}

/**
 * 异步请求后台接口
 * @param type  请求方式 get or post
 * @param url   请求的接口路径
 * @param data  发送的数据
 * @param callback   回调函数
 */
function ajax(type, url, data, callback) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        async: false,
        success: function (result) {
            if (typeof callback == 'function') {
                callback(result);
            }
        },
        error: function (status, data) {
            console.log(status);
        }
    })
}

/**
 * @name errorTips
 * @description 显示layer Tips提示错误的气泡框
 * @param position   气泡框显示的位置 top、bottom、left、right
 * @param obj        定义气泡框吸附的元素  #id or .class
 * @param text       气泡框中显示的文字
 * @param callback   回调函数
 */
function errorTips(position, obj, text, callback) {
    var types; // 显示的方向
    if (position == 'top') {
        types = 1; // 上
    } else if (position == 'bottom') {
        types = 3; // 下
    } else if (position == 'left') {
        types = 4; // 左
    } else {
        types = 2; // 右
    }
    var textdome = "<span style='color: #FF0005;'><i class='fa fa-times-circle s15'></i> " + text + "</span>";
    layer.tips(textdome, $(obj), {
        tips: [types, '#FFFFFF'],
        time: 0,
        tipsMore: true,
        success: function (layero, index) {
            if (typeof callback == 'function') {
                callback(index);
            } else {
                console.log("没有发现回调函数。");
            }
        }
    });
}

/**
 * @name 页面表单校验通用方法
 * @param selector  表单元素
 * @returns {number}
 */
function validateForm(selector) {
    var flag = 0;
    var count = 0;
    $(selector).find('.form-control:not(.select-out)').each(function () {
        if (checkFormContrl($(this)) > 0) {
            flag = 1;
            // alert("1");
        } else {
            flag = 0;
            count++;
            // alert("0")
        }
    });
    if (count > 0) {
        console.log("验证不通过");
        flag = 0;
    }
    return flag;
}

/**
 *
 */
function checkFormContrl(selector) {
    var flag = 0;
    var inputObj = $(selector),             // 当前元素
        datatype = inputObj.attr('data-verify'), // 校验规则
        value = inputObj.val();             // 输入的值

    if (jQuery.Util.verify(datatype, value)) {
        // 校验通过
        console.log("当前元素校验通过！");
        flag += 1;
    } else {
        // 元素属性 data-error-msg 的值为错误提示语
        var msg = inputObj.attr('data-error-msg');
        // 给元素添加淡红背景的Class
        inputObj.addClass('alert-danger');
        // 调用显示提示错误的气泡框
        errorTips('right', inputObj, msg, function (index) {
            // 回调方法
            inputObj.on("change", function () {
                // 当前元素值改变时
                if (inputObj.val() != "") {
                    layer.close(index);      // 关闭当前的tips
                    inputObj.removeClass('alert-danger');
                }
            });
        });
        flag = 0;
    }
    return flag;
}

/**
 * @name templateLoad
 * @description 基于 artTemplate.js 实现的组件调用方法
 * @param url
 * @param json
 * @param selector
 * @param callback
 */
function templateLoad(url, json, selector, callback) {
    /*
     * url      页面模版的链接
     * json     需要渲染的数据
     * selector 显示容器
     * callback 回调函数
     */
    jQuery.get(url, function (data) {

        // 渲染数据
        var render = template.compile(data),
            html = render({navbar: json});

        // 加载显示到页面中
        selector.html(html);
        // 判断 callback 是否为函数
        if (typeof callback === 'function') {
            callback()
        }
    });
}

/**
 * 加载公用模版
 * @param searchElement
 * @param url
 */
function LoadGlobalModule(searchElement, url) {
    jQuery.get(url, function (data) {
    	console.log(data+"  sdddddddddddddddddddddd");
        $(searchElement).html(data);
    });
}

/**
 * 页面滚动时执行，如果滚动到底部了则触发回调
 * @param callback
 */
function ScrollBottom(callback) {
    window.onscroll = function () {
        var marginBot = 0;
        if (document.documentElement.scrollTop) {
            marginBot = document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.body.scrollTop) - document.documentElement.clientHeight;
        } else {
            marginBot = document.body.scrollHeight - document.body.scrollTop - document.body.clientHeight;
        }
        if (marginBot <= 0) {
            //do something
            console.log("已滚动页面底部");
            callback();
        }
    }
}

/**
 * 滚动到指定元素时执行，用于实现滚动到底部加载数据
 * @param selector   指定元素
 * @param callback   回调函数
 */
function listenerScroll(selector, callback) {
    $(window).scroll(function () {
        // 获取页面可视区域的高度 （不滚动的情况下）
        var documentHeight = document.documentElement.clientHeight || window.innerHeight;
        // 指定元素到页面可见区域顶端的距离
        var htmlElementTop = document.getElementById(selector).getBoundingClientRect().top;
        var offsetTop = htmlElementTop + 50;
        // 当指定元素进入网页可视区域，执行回调
        if (documentHeight >= offsetTop) {
            x++;
            console.log("滚动到" + selector + ", 执行第" + x + "次");
            // 先判断传进来是否为一个函数
            if (typeof callback == 'function') {
                callback(selector);
                // callback(selector);
            }
        }
    });
}

/**
 * @description: 直接显示弹窗
 * @param area
 * @param html
 * @param callback
 * @returns: obj
 */
function showModal(area, html, callback) {
    layer.config({
        extend: 'custom/style.css',
        skin: 'layer-ext-custom'
    });
    layer.open({
        id: 'layerModal',
        type: 1,
        content: html,
        area: area,
        title: false,
        // shade: 0.3,
        resize: false,
        closeBtn: false,
        scrollbar: false,
        maxmin: false,
        success: function (layero, index) {
            // 判断callback是否为一个函数
            if (typeof callback == "function") {
                // 如果是，则立即执行
                callback(index);
            }
            layero.find(".closeButton").on("click", function () {
                layer.close(index);
            });
        },
        cancel: function (index, layero) {

        },
        end: function () {

        }
    });
}

/**
 * @description: 显示iframe内嵌页面弹窗
 * @param area
 * @param url
 * @param callback
 * @returns: obj
 */
function showIframeModal(area, url, callback) {
    layer.config({
        extend: 'custom/style.css',
        skin: 'layer-ext-custom'
    });

    layer.open({
        id: 'layerModal',
        type: 2,
        content: url,
        area: area,
        title: false,
        resize: false,
        closeBtn: false,
        maxmin: false,
        success: function (layero, index) {
            // 判断callback是否为一个函数
            if (typeof callback == "function") {
                // 如果是，则立即执行
                callback(index);
            }
            layero.find(".closeButton").on("click", function () {
                layer.close(index);
            });
        },
        cancel: function (index, layero) {

        },
        end: function () {

        }
    });
}

/**
 * 文件大小 单位换算
 * @param bytes
 * @returns {string}
 */
function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

/**
 *
 * @param myhash
 * @param callback
 * @returns {simpleRouter}
 */
function simpleRouter(myhash, callback) {
    var hashStrings = (window.location.hash.length > 0 ? window.location.hash.substring(1) : "");

    // 判断是否传入了指定的hash值需进行对比
    if (myhash != "" && myhash != undefined) {
        // 如果实际的hash值等于指定的hash值则执行回调
        if (hashStrings == myhash) {
            if (typeof callback == 'function') {
                callback();
            }
        } else {
            console.error("传入的hash值与实际的hash值不符");
        }
    } else {
        // 如果实际的hash值不等于指定的hash值
        if (typeof callback == 'function') {
            var theHash = '#' + hashStrings;
            callback(theHash);
        }
    }
}

/**
 * 初始化ueditor
 * @param EditorElement
 */
function initEditor(EditorElement) {
    // var editor;
    // KindEditor.ready(function (K) {
    //     editor = K.create(EditorElement, {
    //         resizeType: 1,
    //         allowPreviewEmoticons: false,
    //         allowImageUpload: false,
    //         items: [
    //             'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
    //             'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
    //             'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
    //             'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '|',
    //             'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
    //             'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
    //             'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
    //             'anchor', 'link', 'unlink', '|', 'about']
    //     });
    // });
    return UE.getEditor(EditorElement);
}

/**
 * 获取datatables表格语言配置
 * @returns {{sSearch: string, oPaginate: {sPrevious: string, sLast: string, sFirst: string, sNext: string}, zeroRecords: string, infoEmpty: string, infoFiltered: string, lengthMenu: string, sZeroRecords: string, info: string}}
 */
function getTableLanguage() {
    return {
        "lengthMenu": "每页 _MENU_ 条记录",
        "zeroRecords": "没有找到记录",
        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
        "infoEmpty": "无数据",
        "infoFiltered": "(从 _MAX_ 条记录过滤)",
        "sZeroRecords": "无数据",
        "sSearch": "搜索:",
        "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "上一页",
            "sNext": "下一页",
            "sLast": "尾页"
        }
    };
}

/**
 * 发送手机验证码
 * @returns {boolean}
 */
function sendSms(){
	var mobile = jQuery("#mobile").val();
	if(mobile==""){
		alert("请输入手机号！");
		return false;
	}else{
	    jQuery.post(basePath+"sendsms.htm",{"mobile":mobile},function(data){
	    	alertModal(1,"发送成功！",function (index) {
                layer.close(index);
            });
	    });
    }
}

/**
 * 测试 查看返回的json数据
 */
function LogJson(title, data) {
    var value = eval(data);

    var titles = title || "返回的数据";

    // layer 全局配置
    layer.config({
        extend: 'custom/style.css',
        skin: 'layer-ext-custom'
    });

    layer.open({
        type: 1,
        content: '<pre id="json-renderer" style="padding:15px 25px;height:676px;width: 100%;border-radius: 0"></pre>',
        shade: 0,
        maxmin: true,
        title: titles,
        area: ["600px", "720px"],
        success: function (layero, index) {
            layero.find('#json-renderer').jsonViewer(value, {
                collapsed: false,
                withQuotes: false
            });
        }
    })
}

/**
 * vue加载html模版
 */
function vueTemplate(url, element) {
    jQuery.get(url, function (data) {
        new Vue({
            el: element,
            data: {
                message: data
            }
        })
    });
}

// 审核表单提交之前
function formSubmitBefore() {
    $("#reviewForm").submit();
    setTimeout(function () {
        layer.closeAll();
    }, 500);
}

function toggleText(obj) {
    var acceptreason = $("#acceptreason");
    if ($(obj).val() == 1) {
        acceptreason.removeClass('disabled').removeAttr('disabled').focus();
    } else if ($(obj).val() == 2 || $(obj).val() <= 0) {
        acceptreason.val("").addClass('disabled').attr('disabled', 'disabled');
    }
}

/* ========================================================================
 * 名称: Global Navbar
 * 详细描述: 页面顶部导航栏
 * ======================================================================== */

+function ($) {

    'use strict';

    /**
     * 首页导航栏
     * @returns {Navbar}
     * @constructor
     */
    function IndexNavbar() {
        /**
         * 导航栏数据
         * @type {String}
         */
        this.defaults = {
            title: "亲，欢迎来到智脑！",
            login: {
                title: '登录',
                url: 'user/login.htm'
            },
            register: {
                title: '注册',
                url: 'register.htm'
            },
            indexpage: {
                title: '首页',
                url: '/zhinao/index.htm',
            },
            member: {
                title: '会员中心',
                url: 'member/memberSpace.htm',
                /* child: [
                     {title: '链接1', url: '#'},
                     {title: '链接2', url: '#'},
                     {title: '链接3', url: '#'}
                 ]*/
            },
            channel: {
                title: '频道中心',
                url: 'seller/index.htm',
                /*child: [
                    {title: '链接1', url: '#'},
                    {title: '链接2', url: '#'},
                    {title: '链接3', url: '#'}
                ]*/
            },
            collection: {
                title: '收藏夹',
                url: 'member/collection.htm'
            },
            help: {
                title: '帮助中心',
                url: 'articlelist_help.htm'
            }
        };
        return this;
    }

    /**
     * 页面顶部导航栏
     * @returns {Navbar}
     * @constructor
     */
    function Navbar() {
        /**
         * 导航栏数据
         * @type {String}
         */
        this.defaults = {
            title: "亲，欢迎来到智脑！",
            login: {
                title: '登录',
                url: 'user/login.htm'
            },
            register: {
                title: '注册',
                url: 'register.htm'
            },
            indexpage: {
                title: '首页',
                url: '/zhinao/index.htm',
            },
            member: {
                title: '会员中心',
                url: 'member/memberSpace.htm',
                /* child: [
                     {title: '链接1', url: '#'},
                     {title: '链接2', url: '#'},
                     {title: '链接3', url: '#'}
                 ]*/
            },
            channel: {
                title: '频道中心',
                url: 'seller/index.htm',
                /*child: [
                    {title: '链接1', url: '#'},
                    {title: '链接2', url: '#'},
                    {title: '链接3', url: '#'}
                ]*/
            },
            collection: {
                title: '收藏夹',
                url: 'member/collection.htm'
            },
            help: {
                title: '帮助中心',
                url: 'articlelist_help.htm'
            }
        };
        return this;
    }

    /**
     * 页面顶部导航栏初始化方法
     * @protected
     */
    Navbar.prototype._init = function () {
        templateLoad("/zhinao/top.htm", this.defaults, $("#header"), function () {
            // alert("导航栏加载成功。")
        });
    };

    IndexNavbar.prototype._init = function () {
        templateLoad("/zhinao/indextop.htm", this.defaults, $("#indexheader"), function () {
            // alert("导航栏加载成功。")
        });
    };

    /**
     * 会员空间页面顶部导航栏
     * @constructor
     */
    function MemberNavbar() {
        this.defaults = {
            title: "亲，欢迎来到智脑！",
            login: {
                title: '登录',
                url: 'user/login.htm'
            },
            register: {
                title: '注册',
                url: 'register.htm'
            },
            indexpage: {
                title: '首页',
                url: '/zhinao/index.htm',
            },
            member: {
                title: '会员中心',
                url: 'memberSpace.htm',
                /* child: [
                     {title: '链接1', url: '#'},
                     {title: '链接2', url: '#'},
                     {title: '链接3', url: '#'}
                 ]*/
            },
            channel: {
                title: '频道中心',
                url: '../seller/index.htm',
                /* child: [
                     {title: '链接1', url: '#'},
                     {title: '链接2', url: '#'},
                     {title: '链接3', url: '#'}
                 ]*/
            },
            collection: {
                title: '收藏夹',
                url: '../member/collection.htm'
            },
            help: {
                title: '帮助中心',
                url: '../articlelist_help.htm'
            }
        };
        return this;
    }

    MemberNavbar.prototype._init = function () {
        templateLoad("../tepl/memberNavbar.html", this.defaults, $("#memberHeader"), function () {
        });
    };


    /**
     * 会员主页页面顶部导航栏
     * @constructor
     */
    function MemberSpaceNavbar() {
        this.defaults = {
            title: "亲，欢迎来到智脑！",
            login: {
                title: '登录',
                url: 'user/login.htm'
            },
            register: {
                title: '注册',
                url: 'user/register.htm'
            },
            indexpage: {
                title: '首页',
                url: '/zhinao/index.htm',
            },
            member: {
                title: '会员中心',
                url: '../member/memberSpace.htm',
                /* child: [
                     {title: '链接1', url: '#'},
                     {title: '链接2', url: '#'},
                     {title: '链接3', url: '#'}
                 ]*/
            },
            channel: {
                title: '频道中心',
                url: '../seller/index.htm',
                /* child: [
                     {title: '链接1', url: '#'},
                     {title: '链接2', url: '#'},
                     {title: '链接3', url: '#'}
                 ]*/
            },
            collection: {
                title: '收藏夹',
                url: '../member/collection.htm'
            },
            help: {
                title: '帮助中心',
                url: '../articlelist_help.htm'
            }
        };
        return this;
    }

    MemberSpaceNavbar.prototype._init = function () {
        templateLoad("../tepl/memberNavbar.html", this.defaults, $("#memberSpaceHeader"), function () {
        });
    };

    /*频道中心顶部导航*/
    function channelNavbar() {
        this.defaults = {
            title: "亲，欢迎来到智脑！",
            login: {
                title: '登录',
                url: '../user/login.htm'
            },
            register: {
                title: '注册',
                url: '../user/register.htm'
            },
            indexpage: {
                title: '首页',
                url: '/zhinao/index.htm',
            },
            member: {
                title: '会员中心',
                url: '../member/memberSpace.htm',
                /* child: [
                     {title: '链接1', url: '#'},
                     {title: '链接2', url: '#'},
                     {title: '链接3', url: '#'}
                 ]*/
            },
            channel: {
                title: '频道中心',
                url: 'index.htm',
                /* child: [
                     {title: '链接1', url: '#'},
                     {title: '链接2', url: '#'},
                     {title: '链接3', url: '#'}
                 ]*/
            },
            collection: {
                title: '收藏夹',
                url: '../member/collection.htm'
            },
            help: {
                title: '帮助中心',
                url: '../articlelist_help.htm'
            }
        };
        return this;
    }

    channelNavbar.prototype._init = function () {
        templateLoad("channelNavbar.html", this.defaults, $("#channelHeader"), function () {
        });
    };

    var navbar = new Navbar();
    var memberNavbar = new MemberNavbar();
    var memberSpaceNavbar = new MemberSpaceNavbar();
    var channelNavbar = new channelNavbar();
    var indexNavbar = new IndexNavbar();

    navbar._init();
    indexNavbar._init();
    memberNavbar._init();
    memberSpaceNavbar._init();
    channelNavbar._init();

    /* ========================================================================
     * 名称: Global Method
     * 详细描述: 页面公用方法
     * ======================================================================== */

    /**
     * 公用方法集合
     * @constructor
     */
    function Global() {

        // 加载搜索模块
        this.loadSearch = function () {
            // 公用搜索框
            var SearchBox = $("#globalBox"),
                url = SearchBox.attr("data-url");
           LoadGlobalModule(SearchBox, url);
        };

        this.initScroll = function () {
            $(".area").perfectScrollbar();
        };

        this.loadSidebar = function () {

            var prefix = '';
            var storeId = null;
            storeId = $.query.get("storeId");

            // 发布文章成功后 storeId值丢失  在此处重新赋值
            if (storeId == null || storeId == '') {
                storeId = jQuery("#storeId").val();
                prefix = '../seller/';
            }

            var sidebarJson = {
                channelOverview:{
                    title: '频道概况',
                    target: 'channelframe',
                    img: '../resources/mystyle/static/images/center/overview.png',
                    imgb: '../resources/mystyle/static/images/center/overview-b.png',
                    url: prefix + 'channelOverview.htm?storeId=' + storeId +"#overview",
                    token: 'overview',
                    hash: "overview"
                },
                channelManager: {
                    title: '频道设置',
                    img: '../resources/mystyle/static/images/center/setting.png',
                    imgb: '../resources/mystyle/static/images/center/setting-b.png',
                    childs: [
                        {
                            title: '我的频道',
                            target: '_blank',
                            url: prefix + '../store.htm?id=' + storeId,
                            token: 'setting',
                            hash: "others"
                        },
                        {
                            title: '频道设置',
                            target: 'channelframe',
                            url: prefix + 'channelSetting.htm?storeId=' + storeId + "#setting",
                            token: 'setting',
                            hash: "#setting"
                        },
                      //  {
                        //    title: '主题设置',
                         //   target: 'channelframe',
                         //   url: prefix + 'themsSetting.htm?storeId=' + storeId + "#theme",
                         //   token: 'theme',
                         //   hash: "#theme"
                       // },
                        // {title: '导航设置', url: prefix + 'navbarManager.htm?storeId=' + storeId, token: 'navbar'},
                        {
                            title: '友情链接',
                            target: 'channelframe',
                            url: prefix + 'friendLink.htm?storeId=' + storeId + "#friend",
                            token: 'friend',
                            hash: "#friend"
                        },
                    ]
                },
                articleManage: {
                    title: '内容管理',
                    img: '../resources/mystyle/static/images/center/content.png',
                    imgb: '../resources/mystyle/static/images/center/content-b.png',
                    childs: [
                        {
                            title: '内容审核',
                            target: 'channelframe',
                            url: prefix + 'goods_auditing.htm?storeId=' + storeId + "#audit",
                            hash: "#audit"
                        },
                        {
                            title: '频道内容',
                            target: 'channelframe',
                            url: prefix + 'goods_all.htm?storeId=' + storeId + "#alls",
                            token: 'alls',
                            hash: "#alls"
                        },
                        {
                            title: '移除内容',
                            target: 'channelframe',
                            url: prefix + 'goods_delelist.htm?storeId=' + storeId + "#delete",
                            token: 'delete',
                            hash: "#delete"
                        },
                        // {
                        //     title: '文章发布',
                        //     target: 'channelframe',
                        //     url: prefix + 'channel_article_add.htm?storeId=' + storeId + "#send",
                        //     token: 'send',
                        //     hash: "#send"
                        // },
                        {
                            title: '内容分类',
                            target: 'channelframe',
                            url: prefix + 'articleClass.htm?storeId=' + storeId + "#classes",
                            token: 'classes',
                            hash: "#classes"
                        }
                    ]
                },
                tradingManager: {
                    title: '交易管理',
                    img: '../resources/mystyle/static/images/center/jiaoyi.png',
                    imgb: '../resources/mystyle/static/images/center/jiaoyi-b.png',
                    childs: [
                        {
                            title: '交易订单',
                            target: 'channelframe',
                            url: prefix + 'orderManager.htm?storeId=' + storeId + "#order",
                            token: 'order',
                            hash: "#order"
                        }
                        // {
                        //     title: '收支明细',
                        //     target: 'channelframe',
                        //     url: prefix + 'paymentDetails.htm?storeId=' + storeId + "#payment",
                        //     token: 'payment',
                        //     hash: "#payment"
                        // }
                    ]
                },
                // customerService: {
                //     title: '客户服务',
                //     img: '../resources/mystyle/static/images/khfw.png',
                //     childs: [
                //         {
                //             title: '投诉管理',
                //             target: 'channelframe',
                //             url: prefix + 'complaintManager.htm?storeId=' + storeId + "#complaint",
                //             token: 'complaint',
                //             hash: "#complaint"
                //         },
                //         {title: '关注的人',target:'channelframe', url: prefix + 'focusPerson.htm#focused', token: 'focused',hash:"#focused"}
                //     ]
                // },
                customerService: {
                    title: '关注的人',
                    target: 'channelframe',
                    img: '../resources/mystyle/static/images/center/focus.png',
                    imgb: '../resources/mystyle/static/images/center/focus-b.png',
                    url: prefix + 'focusPerson.htm?storeId='+ storeId +'#focused',
                    token: 'focused',
                    hash: "#focused"
                }
            };

            templateLoad("channelSidebar.htm", sidebarJson, $("#channelSidebarBox"), function () {
                simpleRouter("", function (hash) {
                    var thisHash = hash.substr(1);
                    // $("[data-name=" + thisHash + "]").addClass('active');
                });
            });

            templateLoad("/zhinao/seller/channelSidebar.htm", sidebarJson, $("#channelSidebarBox1"), function () {
                simpleRouter("", function (hash) {
                    var thisHash1 = hash.substr(1);
                    // $("[data-name=" + thisHash1 + "]").addClass('active');
                });
            });

        };
        return this;
    }

    // 提供全局变量
    window.global = new Global();
    global.initScroll();

    /* ========================================================================
     * 名称: Global Alert Modal
     * 详细描述: 页面所以弹出层
     * ======================================================================== */

    function Golbalmodal() {
        this.path = '';
    }

    Golbalmodal.prototype.loadhtml = function (path, callback) {
        $.get(path, function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        });
    };

    window.GolbalModal = new Golbalmodal();

    /* ========================================================================
     * 名称: 搜索-文章-列表
     * 对应页面: result.html
     * ======================================================================== */

    /**
     * 实例对象
     * @returns {Result}
     * @constructor
     */
    function Result() {
        this.listElement = $("#resultBox");
        return this;
    }

    /**
     * 功能初始化
     */
    Result.prototype.init = function () {
        // 点击切换布局
        $("[data-toggle='resultLayout']").on("click", function () {
            var toggleType = $(this).data('to');

            ToggleLayout(toggleType, result.listElement);  // 切换显示布局

            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings('button').removeClass('active');
            }
        });
    };

    // 切换布局
    function ToggleLayout(type, selector) {
        if (type === "grid") {
            selector.hide().removeClass('list').addClass('grid').fadeIn().parent('.content-body').addClass('row');
        } else if (type === "list") {
            selector.hide().removeClass('grid').addClass('list').fadeIn().parent('.content-body').removeClass('row');
        }
    }

    var result = new Result();
    result.init();

    /* ========================================================================
     * 名称: 搜索-频道页
     * 对应页面: channel.html
     * ======================================================================== */

    /**
     * 文章轮播
     * @returns {Channel}
     * @constructor
     */
    function Channel(selector) {
        this.channelBox = selector;
        return this;
    }

    Channel.prototype.init = function () {
        $(this.channelBox).bxSlider({
            minSlides: 2,
            maxSlides: 3,
            moveSlides: 1,
            pager: false
        });
    };

    window.channel = new Channel('.channel-auto');


    /* ========================================================================
     * 名称: 阅读页-文章
     * 对应页面: article.html
     * ======================================================================== */

    'use strict';

    function Article() {


        return this;
    }

    // 初始化
    Article.prototype._init = function () {

        // 点击按钮显示输入评论的表单
        $("[data-toggle='reply']").on("click", function (e) {
            if ($("#comments-form-sub").length >= 1) {
                return false;
            } else {
                article.addReply($(this));
                e.preventDefault();
            }
        });

        $("[data-toggle='layer']").on("click", function (e) {

            // 获取路径
            var url = $(this).attr('href');

            jQuery.get(url, function (data) {
                showModal(['610px', '660px'], data, function (index) {
                    initMoneyContrl();
                    $("#nextRechargeBtn").on("click", function (e) {
                        layer.close(index);
                        var url = $(this).attr('href');
                        setTimeout(function () {
                            jQuery.get(url, function (data) {
                                showModal(['610px', '660px'], data, function () {

                                    $(".money-item").on("click", function () {
                                        if (!$(this).hasClass('active')) {
                                            $(this).addClass('active').siblings('.money-item').removeClass('active');
                                        }
                                    });

                                    $(".pay-item").on("click", function () {
                                        if (!$(this).hasClass('active')) {
                                            $(this).addClass('active').siblings('.pay-item').removeClass('active');
                                        }
                                    });


                                    initMoneyContrl();
                                });
                            });
                        },500);
                        e.preventDefault();
                    });
                });
            });

            e.preventDefault();
        });

    };

    // 添加回复 && 回复评论
    Article.prototype.addReply = function (element) {
        var $this = $(element);
        var logincheck = getUser($this.data('logincheck'));
        var formDemo = getReplyFormElement($this.data('action'));

        $this.after(formDemo);
        // $this.after(logincheck);
        initContrl();
    };

    // 取消回复 && 取消评论
    Article.prototype.cancelReply = function (element) {
        var $this = $(element).parents('.reply-form');
        $this.remove();
    };

    // 实时换算金额对应阅币
    Article.prototype.totalCount = function (selector) {
        var value = $(selector).val();
        var count = 0;
        if (value === "") {
            count = 0;
        } else {
            count = parseInt(value) * 100;
        }
        $("#yueCount").html(count);
    };

    // 初始化功能
    function initContrl() {
        $(".editorReply").on("focus", function () {
            $(this).parent('.reply-form').addClass('currentFocus');
        }).on("blur", function () {
            $(this).parent('.reply-form').removeClass('currentFocus');
        });
    }

    // 检查用户是否登录
    function getUser(logincheck) {

        if (!logincheck) {
            window.location.href = "user/login.htm";
        }

    }

    // 生成需要添加的评论表单元素
    function getReplyFormElement(action) {
        return `<form action="${action}" class="reply-form" method="post" id="comments-form-sub">
                       <textarea name="keyword" class="editorReply form-control" maxlength="200"></textarea>
                       <div class="text-right pt10 pb5">
                           <button class="btn bg-white border btn-sm cancelReply" type="button" onclick="article.cancelReply(this)">取消</button>
                           <button class="btn btn-info btn-sm" type="button" onclick="sendComment2()">回复</button>
                       </div>
                 </form>`;
    }

    // 初始化文章赞赏功能
    function initMoneyContrl() {
        $(".money-item").on("click", function () {
            if ($(this).find("input[name='money']").is(":checked")) {
                $(this).addClass('active').siblings('.money-item').removeClass('active');
            }
        });
        $(".pay-item").on("click", function () {
            if ($(this).find("input[name='pay']").is(":checked")) {
                $(this).addClass('active').siblings('.pay-item').removeClass('active');
            }
        });

        $(".moneyInput").focus(function () {
            // $("#otherMonery").prop('checked', 'checked');
            $(this).parents('.money-item').click();
        });
    }

    // 获取需要支付的金额数量
    function getMoney() {
        var result;
        var money = $("input[name='money']:checked").val();
        if (money == 0) {
            result = $("input[name='enterMoney']").val();
        } else {
            result = money;
        }
        console.log(result);
        return result;
    }

    Article.prototype.aritclePayGold = function(articleId,type){
    	var money;
        if(type=="1"){
            money = $("#money").val();
        }else if(type=="2"){
            money = getMoney();
        }
    	$.post(basePath+'/member/goldPay.htm',{goodsId:articleId,type:type,price:money}, function (data) {
            //showModal(['420px', '430px'], data, function () {
            //    setMoneyCount(money);
            //});
    		console.log(data);
    		var d = eval("("+data+")");
            console.log(d);
            if (d.msg == "金币不足") {
                alertModal(2,d.msg+"",function (index) {
                    layer.close(index);
                });
            }else{
                alertModal(1, d.msg + "", function (index) {
                    layer.close(index);
                    setTimeout(function () {
                        window.location.reload();
                    },1000);
                });
            }
            //
    		// layer.alert(d.msg,{},function(){
    		// 	layer.closeAll();
    		// 	window.location = window.location;
    		// });
    		//
    		//toggleText(data.msg);
        });

    }

    // 打开扫码支付
    Article.prototype.openPay = function (articleId,type) {

        var money = getMoney();
        // type = 1 支付宝   type = 2 微信
        var type = $("input[name='pay']:checked").val();
        if (type == 1) {
            layer.closeAll();

            setTimeout(function () {
                $.get('../tepl/Alipay.html', function (data) {
                    showModal(['420px', '430px'], data, function () {
                        setMoneyCount(money);
                    });
                });
            }, 500);

        } else {
            layer.closeAll();
            setTimeout(function () {
                $.get('../tepl/Wechat.html', function (data) {
                    showModal(['420px', '430px'], data, function () {
                        setMoneyCount(money);
                    });
                });
            }, 500);
        }
    };

    // 获取需要支付的金额数量显示到页面上
    function setMoneyCount(money) {
        $("#moneyCount").html("￥" + money);
    }

    window.article = new Article();


    /* ========================================================================
     * 名称: 文章管理 && 新增文章
     * 对应页面: articleManager.html && newArticle.html
     * ======================================================================== */

    function ArticleManager() {
        this.uploadFile = $("#imgFile");            // 上传图片组件
        this.holder = $("#hoder-img");           // 图片上传预览区域
        return this;
    }

    // 清空input file的值
    function resetFileInput(file) {
        $(file).after($(file).clone().val(""));
        $(file).remove();
    }

    /**
     * 图片预览功能
     */
    ArticleManager.prototype.initUploadImg = function () {
        var uploadFile = $(this.uploadFile);
        uploadFile.on('change', function () {
            var fileSize = $(this)[0].files[0].size;
            if (fileSize > (2 * 1024 * 1024)) {
                var index = layer.alert("标题图大小不能超过3MB！", {}, function () {
                    resetFileInput(uploadFile);
                    image_holder.attr('src', 'static/images/upload_IMG.png');
                    layer.close(index);
                });
                return false;
            } else {
                if (typeof (FileReader) != "undefined") {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        image_holder.attr('src', e.target.result);
                    };
                    image_holder.show();
                    reader.readAsDataURL($(this)[0].files[0]);
                } else {
                    layer.alert("你的浏览器不支持上传图片预览.");
                }
            }
        });
    };

    window.articleManager = new ArticleManager();


    /* ========================================================================
     * 名称: 我的账户 - 个人资料
     * 对应页面: personal.html
     * ======================================================================== */

    function Personal() {
        this.editor = 'textarea[name="content"]';   // 编辑器
        this.uploadFile = $("#headImg");            // 上传图片组件
        this.holder = $("#img-holder");           // 图片上传预览区域
        return this;
    }

    Personal.prototype.portraitHolder = function () {
        var image_holder = $(this.holder);
        var uploadFile = $(this.uploadFile);
        uploadFile.on('change', function () {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    image_holder.attr('src', e.target.result);
                };
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[0]);
            } else {
                layer.alert("你的浏览器不支持上传图片预览.");
            }
        });
    }

    window.personal = new Personal();

}(jQuery);




