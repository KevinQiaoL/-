#### 1.JavaScript对象的特征
- 对象具有唯一标识性 => 即使完全相同的两个对象，也并非同一个对象
    - 对象由唯一标识的内存地址，所以即使两个对象内的属性一样，value一样，也不代表这两个对象是相等的
    ```javascript
    let A = { a: 1 }
    let B = { a: 1 }
    console.log(A == B); // false
    ```
- 对象具有状态 => 同一对象可能处于不同状态之下
- 对象具有行为 => 即对象的状态，可能因为它的行为产生变迁
> JavaScript中将状态和行为统一抽象为“属性”。对象是一个属性的索引结构。
```javascript
let o = {
    d: 1,
    f(){
        return 2;
    }
}
```
#### 2.JavaScript对象的两类属性
实际上 JavaScript 对象的运行时是一个“属性的集合”。属性以字符串或者 Symbol 为 key，以数据属性特征值或者访问器属性特征值为 value。
- ###### 数据属性
 + value => 属性值
 + writable => 是否可写
 + enumerable => 是否可枚举
 + configurable => 能否被删除或修改
- ###### 访问器（getter/setter）属性
 + getter => 函数或者undefined，在取值时调用
 + setter => 函数或者undefined，在设置属性值时调用
 + enumerable => 是否可枚举
 + configurable => 能否被删除或修改
> 通常用于定义属性的代码会产生数据属性，其中writable、configurable、enumerable都默认为true。可以使用内置函数Object.getOwnPropertyDescripter来查看, 也可以使用Object.defineProperty来修改属性或者定义访问器属性。
> ```javascript
> let o = { a: 1 };
> o.b = 4;
> console.log(Object.getOwnPropertyDescripter(o, 'a')) // {value: 1, writable: true, configurable: true, enumerable: true}
> console.log(Object.getOwnPropertyDescripter(o, 'b')) // {value: 4, writable: true, configurable: true, enumerable: true}
> // Object.defineProperty
> Object.defineProperty(o, 'b', {
>  value: 2,
>  writable: false
> });
> o.b = 3;
> console.log(o.b); // 2
> ```
> 在创建对象时，也可以使用get或者set关键字来创建访问器属性
> ```javascript
> let o = { get a () { return 1 } };
> console.log(o.a); // 1
> ```
