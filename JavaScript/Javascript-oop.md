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