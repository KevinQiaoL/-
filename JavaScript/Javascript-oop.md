#### 面向对象（Object Oriented Programming）
##### JS是一门编程语言，具备编程思想
- **面向对象** JS、JAVA、PHP、C#、Ruby、Python、C++...
- **面向过程** C
##### 面向对象编程，需要掌握“对象，类，实例”的概念
- **对象** 万物皆对象
- **类** 对象的具体细分
- **实例** 类中具体的一个事务 `(拿出类别中的具体一个实例进行研究，那么当前类别下其他实例也具备这些特点)`
##### Object 对象类（基类）
- Null
- Number
- String
- Array
- Boolean
- RegExp
- Function
- Date
- Window
- HtmlCollection
- HtmlElement
- EventTarget
...
这些统称为内置类，我们也可以基于Object，创建很多我们自己的类（自定义类）

#### 基于构造函数创建自定义类
- 在普通函数执行的基础上，使用new运算符，创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例
- 自定义类首字母最好大写
- 常用于组件，类库，框架等的封装
```javascript
/*
 * 基于构造函数创建自定义类（constructor）
 */
function Fn() {
  // ...
}
var f = new Fn(); // Fn是类，f是Fn的实例
```
##### new运算符做了哪些操作
- 创建了一个空对象（堆内存），将这个对象指向构造函数的prototype属性
- 并且将函数中的执行主体this指向这个空对象
- 如果该函数没有返回对象，则返回第一步创建的对象
```javascript
/*
 * @desc 实现new运算
 */
function createNew() {
    const F = [].shift.call(arguments);
    const obj = Object.create(F.prototype); // 一个继承F.prototype的新对象被创建
    const result = F.apply(obj, arguments); // 绑定this到新的对象上
    return typeof result === 'object' ? result : obj;
}
```