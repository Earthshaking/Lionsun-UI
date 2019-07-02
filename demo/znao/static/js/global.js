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
    $.get(url, function (data) {
        
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
    $.get(url, function (data) {
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
            callback()
        }
    }
}

/**
 * @description: 直接显示弹窗 (不带默认关闭按钮)
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
        // scrollbar: true,
        maxmin: false,
        success: function (layero, index) {
            // 判断callback是否为一个函数
            if (typeof callback == "function") {
                // 如果是，则立即执行
                callback();
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
 * @description: 直接显示弹窗 (带默认关闭按钮)
 * @param area
 * @param html
 * @param title
 * @param callback
 * @returns: obj
 */
function showModal2(area, title, html, callback) {
    layer.config({
        extend: 'custom/style.css',
        skin: 'layer-ext-custom'
    });
    
    layer.open({
        id: 'layerModal',
        type: 1,
        content: html,
        area: area,
        title: title,
        // shade: 0.3,
        resize: false,
        // scrollbar: true,
        maxmin: false,
        success: function (layero, index) {
            // 判断callback是否为一个函数
            if (typeof callback == "function") {
                // 如果是，则立即执行
                callback();
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
    
    var ue = UE.getEditor(EditorElement, {
        "autoHeightEnabled": false,
        //"enableAutoSave": false, //关闭不了，BUG， 需自行修改源代码
        "saveInterval": 60000,
        "elementPathEnabled": false, //元素路径显示关闭
        //"wordCount": true, //字符统计
        "maximumWords": 50000,
        //"toolbars": [['preview', 'attachment', 'forecolor', 'backcolor', 'fullscreen', 'print']]
    });
    
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
    $.get(url, function (data) {
        new Vue({
            el: element,
            data: {
                message: data
            }
        })
    });
}

/* ========================================================================
 * 名称: Global Navbar
 * 详细描述: 页面顶部导航栏
 * ======================================================================== */

+function ($) {
    
    'use strict';
    
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
                url: '../default/login.html'
            },
            register: {
                title: '注册',
                url: '../default/register.html'
            },
            member: {
                title: '会员中心',
                url: '#',
                child: [
                    {title: '链接1', url: '#'},
                    {title: '链接2', url: '#'},
                    {title: '链接3', url: '#'}
                ]
            },
            channel: {
                title: '频道中心',
                url: '#',
                child: [
                    {title: '链接1', url: '#'},
                    {title: '链接2', url: '#'},
                    {title: '链接3', url: '#'}
                ]
            },
            collection: {
                title: '收藏夹',
                url: '#'
            },
            help: {
                title: '帮助中心',
                url: '#'
            }
        };
        return this;
    }
    
    /**
     * 页面顶部导航栏初始化方法
     * @protected
     */
    Navbar.prototype._init = function () {
        templateLoad("../tepl/navbar.html", this.defaults, $("#header"), function () {
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
                url: 'login.html'
            },
            register: {
                title: '注册',
                url: 'register.html'
            },
            member: {
                title: '会员中心',
                url: '#',
                child: [
                    {title: '链接1', url: '#'},
                    {title: '链接2', url: '#'},
                    {title: '链接3', url: '#'}
                ]
            },
            channel: {
                title: '频道中心',
                url: '#',
                child: [
                    {title: '链接1', url: '#'},
                    {title: '链接2', url: '#'},
                    {title: '链接3', url: '#'}
                ]
            },
            collection: {
                title: '收藏夹',
                url: '#'
            },
            help: {
                title: '帮助中心',
                url: '#'
            }
        };
        return this;
    }
    
    MemberNavbar.prototype._init = function () {
        templateLoad("../tepl/memberNavbar.html", this.defaults, $("#memberHeader"), function () {
        });
    };
    
    var navbar = new Navbar();
    var memberNavbar = new MemberNavbar();
    
    navbar._init();
    memberNavbar._init();
    
    
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
            var sidebarJson = {
                channelManager: {
                    title: '频道管理',
                    img: '../../static/images/pdsz.png',
                    childs: [
                        {title: '频道设置', url: 'channelSetting.html', token: 'setting'},
                        {title: '主题设置', url: 'themsSetting.html', token: 'theme'},
                        {title: '导航设置', url: 'navbarManager.html', token: 'navbar'},
                        {title: '友情链接', url: 'friendLink.html', token: 'friend'},
                    ]
                },
                articleManage: {
                    title: '文章管理',
                    img: '../../static/images/wzgl.png',
                    childs: [
                        {title: '文章审核', url: 'articeReview.html', token: 'review'},
                        {title: '全部文章', url: 'allArtice.html', token: 'alls'},
                        {title: '移除文章', url: 'deletelArtice.html', token: 'delete'},
                        {title: '文章发布', url: 'sendArtice.html', token: 'send'},
                        {title: '文章分类', url: 'articleClass.html', token: 'classes'}
                    ]
                },
                tradingManager: {
                    title: '交易管理',
                    img: '../../static/images/jygl.png',
                    childs: [
                        {title: '订单管理', url: 'orderManager.html', token: 'order'},
                        {title: '收支明细', url: 'paymentDetails.html', token: 'payment'},
                    ]
                },
                customerService: {
                    title: '客户服务',
                    img: '../../static/images/khfw.png',
                    childs: [
                        {title: '投诉管理', url: 'complaintManager.html', token: 'complaint'},
                        {title: '关注的人', url: 'focusPerson.html', token: 'focused'}
                    ]
                }
            };
            templateLoad("../tepl/channelSidebar.html", sidebarJson, $("#channelSidebarBox"), function () {
                simpleRouter("", function (hash) {
                    var thisHash = hash.substr(1);
                    $("[data-name=" + thisHash + "]").addClass('active');
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
            article.addReply($(this));
            e.preventDefault();
        });
        $("[data-toggle='layer']").on("click", function (e) {
            // 获取路径
            var url = $(this).attr('href');
            $.get(url, function (data) {
                showModal(['700px', '690px'], data, function () {
                    initMoneyContrl()
                });
            });
            e.preventDefault();
        });
    };
    
    // 添加回复 && 回复评论
    Article.prototype.addReply = function (element) {
        var $this = $(element);
        var formDemo = getReplyFormElement($this.data('action'));
        $this.after(formDemo);
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
    
    // 生成需要添加的评论表单元素
    function getReplyFormElement(action) {
        return `<form action="${action}" class="reply-form">
                       <textarea name="reply" class="editorReply form-control" maxlength="200"></textarea>
                       <div class="text-right pt10 pb5">
                           <button class="btn bg-white border btn-sm cancelReply" type="button" onclick="article.cancelReply(this)">取消</button>
                           <button class="btn btn-info btn-sm" type="submit">回复</button>
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
        return result;
    }
    
    // 打开扫码支付
    Article.prototype.openPay = function () {
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
    };
    
    window.personal = new Personal();
    
}(jQuery);




