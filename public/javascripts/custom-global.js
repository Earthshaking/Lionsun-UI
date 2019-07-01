"use strict";


/**
 * 侧边栏
 * @param options
 * @constructor
 */
$.fn.Sidebar = function (options) {
    
    var $this = this;
    
    /**
     * 打开侧边栏
     * @param obj{element} 触发事件的按钮
     * @private
     */
    function _open(obj) {
        $this.addClass('open');
        $this.attr("data-status", "open");
        $(obj).data("status", "open");
    }
    
    /**
     * 关闭侧边栏
     * @param obj{element} 触发事件的按钮
     * @private
     */
    function _close(obj) {
        $this.removeClass('open');
        $this.attr("data-status", "close");
        $(obj).data("status", "close");
        
    }
    
    this.open = function (obj) {
        _open(obj)
    };
    
    
    this.close = function (obj) {
        _close(obj)
    };
    
    return this;
};

/**
 * 获取 Codemirror 插件的 option 配置选项
 * @returns {{mode: {name: string, globalVars: boolean}, foldGutter: boolean, lineNumbers: boolean, smartIndent: boolean, indentUnit: number, autoCloseBrackets: boolean, extraKeys: {"Ctrl-Space": string}, gutters: string[], theme: string, matchBrackets: boolean, autoCloseTags: boolean, lineWrapping: boolean}}
 */
function getCodemirrorConfig() {
    return {
        mode: {name: "htmlmixed", globalVars: true},
        lineNumbers: true,
        lineWrapping: true,
        smartIndent: true,
        indentUnit: 4,
        foldGutter: true,
        extraKeys: {"Ctrl-Space": "autocomplete"},
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        matchBrackets: true, // 括号匹配
        autoCloseBrackets: true,
        autoCloseTags: true,
        theme: "material",
    };
}

/**
 * 初始化 Codemirror 编辑器插件
 * @param id{number} 需要初始化的文本域元素ID
 */
function initCodemirror(id) {
    CodeMirror.fromTextArea(document.getElementById(id), getCodemirrorConfig());
}

/**
 * 初始化自定义滚动条
 * @param element{string} 需要添加滚动条的元素ID或元素class
 */
function initScrollbar(element) {
    var ids = element || "";
    var Scrollbar;
    if (ids == "body") {
        Scrollbar = new GeminiScrollbar({
            element: document.body
        }).create();
    } else {
        Scrollbar = new GeminiScrollbar({
            element: document.querySelector(element),
        }).create();
    }
    return Scrollbar;
}


