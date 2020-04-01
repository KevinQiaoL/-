#### 1.单例模式 （Singleton Pattern）
- ##### 表现形式
> ```javascript
> var Obj = {
>     xxx: XXXX,
>     ...
> }
> ```
> 在单例模式中，OBJ不仅仅是对象名，它被称为命名空间[[namespace]], 把描述事务的属性存放到命名空间中，多个命名空间是独立分开的，互不冲突

- ##### 作用
> 把描述同一件事务的属性和特征进行分组，归类（存储在同一个堆内存中），因此避免了全局变量之间的冲突和污染

- ##### 命名由来
> 每一个命名空间都是JS中Object这个内置基类的实例，而实例之间是相互独立互不干扰的，所以称为 单例 => 单独的实例

#### 2.高级单例模式
- 在给命名空间赋值的时候，不是直接赋值一个对象，而是先执行匿名函数，形成一个私有作用域AA（不销毁的占内存），在AA中创建一个堆内存，把堆内存地址赋值给命名空间
- 优点是完全可以在AA中创建很多内容（变量或函数），把需要提供外部调取使用的，通过返回的对象暴露出去（模块化一种思想）
> ```javascript
> const nameSpace = (function() {
>     const n = 12;
>     function fn() {
>         /// ...
>     }
>     function sum() {
>         /// ...
>     }    
>     return {
>         fn: fn,
>         sum: sum
>     }
> })();
> ```

##### 小习题
- 1.this给当前元素的某个事件绑定方法，当事件触发方法执行的时候，方法中的this是当前操作的元素对象
- 2.普通函数执行，函数中的this取决与执行的主题，谁执行的，this就是谁（执行主体：方法执行，看方法前是否有“.”，有的话 “.”前面是谁this就是谁，没有的话this是window）
- 3.自执行函数执行，方法中的this是window
```javascript
var n = 2;
var obj = {
    n: 3,
    fn: (function() { /// => 自执行函数的返回值, 由于有私有变量被外部占用，所以不会回收
        n *= 2; /// 私有 n = 4;
        this.n += 2; /// fn(3) this是window window.n = 4
        var n = 5; /// 私有作用域的变量提升, 当前已有形参 n, 所以不再重新声明，但是会重新赋值 私有n = 5
        return function(m) { /// 形参赋值 m = 3;
            this.n *= 2; /// window.n = 6 | obj.n = 6
            console.log(m + (++n)); // 3 + 私有++n = 9 | 3 + 私有++n = 10
        }
    })(n) /// 此处n是全局变量 n 
}
var fn = obj.fn;
fn(3); // 9
obj.fn(3); // 10
console.log(n, obj.n); // 8, 6
```

#### 3.基于单例模式进行模块化开发
- 团队协作开发，会把产品按照功能模块进行划分，每一个模块有专人/团队负责开发维护
- 把各个模块之间公用的部分进行提取封装，后期直接调取引用即可
```javascript
// => 皮肤模块
const skinModule = (function() {
    return {
        init: function() {

        }
    }
})();
// => 天气模块
const weatherModule = (function() {
    return {
        init: function() {
            skinModule.init(); // 直接调用其他模块方法
        }
    }
})();
```