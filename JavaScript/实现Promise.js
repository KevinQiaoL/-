const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
function MyPromise(fn) {
    const self = this;
    // 初始化状态
    this.state = PENDING;
    // 保存resolve或者reject传入的值
    this.value = null;
    // 保存resolve的回调
    this.resolveCallbacks = [];
    // 保存reject的回调
    this.rejectCallbacks = [];
    // 执行resolve操作
    function resolve(value) {
        if (value instanceof MyPromise) {
            return value.then(resolve, reject);
        }
        /// 保证代码顺序执行
        setTimeout(() => {
            // 只有状态为pending时才能改变
            if (self.state === PENDING) {
                // 改变状态
                self.state = RESOLVED;
                // 接受传入的value
                self.value = value;
                // 执行回调
                self.resolveCallbacks.forEach(callbacks => callbacks(value));
            }
        }, 0)
    }
    // 执行resolve操作
    function reject(value) {
        setTimeout(() => {
            // 只有状态为pending时才能改变
            if (self.state === PENDING) {
                // 改变状态
                self.state = REJECTED;
                // 接受传入的value
                self.value = value;
                // 执行回调
                self.resolveCallbacks.forEach(callbacks => callbacks(value));
            }
        }, 0)
    }
    // 将两个方法传入
    try {
        fn(resolve, reject);
    } catch (err) {
        reject(err);
    }
}
MyPromise.prototype.then = function(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function'
                    ? onResolved : function (value) {
                        return value;
                    };
    onRejected = typeof onRejected === 'function'
                    ? onRejected : function (value) {
                        throw value;
                    }
    // 如果状态是进行中，则将函数加入对应列表
    if (this.state === PENDING) {
        this.resolveCallbacks.push(onResolved);
        this.rejectCallbacks.push(onRejected);
    }
    // 如果状态已经凝固，则直接执行对应状态的函数
    if (this.state === RESOLVED) {
        onResolved(this.value);
    }

    if (this.state === REJECTED) {
        onRejected(this.value);
    }
}