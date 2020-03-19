/// 基类 调度
class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        // 根元素渲染页面
        if (this.$el) {
            /* 
             * 数据劫持 => Object.defineProperty('a', 'name', {
             *     set(),
             *     get()
             * })
             * 把数据全部转换成 Object.defineProperty来定义
             */
            new Observer(this.$data);
            // 渲染DOM
            new Compiler(this.$el, this);
        }
    }
}
/// 编译模板类
class Compiler {
    constructor(el, vm) {
        // 判断el类型
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        // 获取当前节点中的元素
        let fragment = this.node2Fragment(this.el);
        // 替换节点内容
        // 编译模板
        this.compile(fragment);
        // 渲染页面
        this.el.appendChild(fragment);
    }
    // 编译内存中的DOM节点
    compile(node) {
        let childNodes = node.childNodes;
        console.log(childNodes);
        [...childNodes].forEach(child => {
            if (this.isElementNode(child)) {
                this.compileElement(child);
                // 如果是元素的话，需要把自己传进去，再次遍历子节点
                this.compile(child);
            } else {
                this.compileText(child);
            }
        });
    }
    // 判断指令
    isDirective(attrName) {
        return attrName.startsWith('v-');
    }
    // 编译DOM
    compileElement(node) {
        let attrs = node.attributes; // 类数组
        [...attrs].forEach(attr => { /// key="value"
            let { name, value: expr } = attr;
            if (this.isDirective(name)) {
                let [, directive] = name.split('-');
                // 需要调用不同指令来处理
                CompileUtils[directive](node, expr, this.vm);
            }
        })
    }
    // 编译文本 查找文本节点中内容是否包含{{}}
    compileText(node) {
        let content = node.textContent;
        if (/\{\{(.+?)\}\}/.test(content)) {
            /// 找到所有文本
            CompileUtils['text'](node, content, this.vm)
        }
    }
    // 把节点移动到内存中
    node2Fragment(node) {
        // 创建一个文档碎片
        let fragment = document.createDocumentFragment();
        let firstChild;
        while (firstChild = node.firstChild) {
            // appendChild
            fragment.appendChild(firstChild)
        }
        return fragment;
    }
    // 是否元素节点
    isElementNode(node) {
        return node.nodeType === 1;
    }
}
CompileUtils = {
    /* 
     * @params
     * node 当前元素
     * expr 表达式
     * vm 当前实例
     */
    model(node, expr, vm) {
        let fn = this.updater['modelUpdater'];
        let value = this.getVal(vm, expr);
        fn(node, value);
    },
    html() {

    },
    text(node, expr, vm) {
        let fn = this.updater['textUpdater'];
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1])
        });
        fn(node, content);
    },
    // 根据表达式获取到对应的数据
    getVal(vm, expr) {
        return expr.split('.').reduce((data, current) => {
            return data[current]
        }, vm.$data);
    },
    updater: {
        modelUpdater(node, value) {
            node.value = value;
        },
        htmlUpdater() {

        },
        textUpdater(node, content) {
            node.textContent = content
        }
    }
}
// 实现数据劫持功能
class Observer {
    constructor(data) {
        this.observer(data)
    }
    observer(data) {
        // 如果是对象才观察
        if (data && typeof data === 'object') {
            for (let key in data) {
                this.defineReactive(data, key, data[key])
            }
        }
    }
    defineReactive(obj, key, value) {
        this.observer(value);
        Object.defineProperty(obj, key, {
            get() {
                return value;
            },
            set: newVal => {
                if (newVal != value) {
                    this.observer(newVal);
                    value = newVal;
                }
            }
        })
    }
}