class CusTEvent {
    constructor() {}
    addEv(ele, type, handler) {
        if (ele.addEventListener) {
            ele.addEventListener(type, handler, false);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + type, () => {
                /// this重新指向
                handler.call(ele);
            })
        } else {
            ele['on' + type] = handler;
        }
    }
    removeEv(ele, type, handler) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, handler, false);
        } else if (ele.detachEvent) {
            ele.detachEvent('on' + type, handler);
        } else {
            ele['on' + type] = null;
        }
    }
}
