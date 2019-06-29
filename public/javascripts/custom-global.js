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
        $(obj).data("status","open");
    }
    
    /**
     * 关闭侧边栏
     * @param obj{element} 触发事件的按钮
     * @private
     */
    function _close(obj) {
        $this.removeClass('open');
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
