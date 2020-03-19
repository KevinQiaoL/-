#### 1.JavaScript原型
JavaScript是一种基于原型的编程语言，利用原型来描述对象。这里的原型继承并不是去复制一个原型对象，而是使得新对象持有一个原型的引用
- 如果所有的对象都有私有字段`[[prototype]]`，即为对象的原型
- 读取一个属性，如果对象本身没有，则会继续访问对象的原型，直到原型为空或者找到为止 => 原型链
##### ES6提供了一系列内置函数，可以更为直接地访问操纵原型
- Object.create 根据指定的原型创建新对象，原型可以是null
- Object.getPrototypeOf 获取一个对象的原型
- Object.setPrototypeOf 设置一个对象的原型
```javascript
let cat = {
    say() {
        console.log('meow~')
    },
    jump() {
        console.log('jump!')
    }
}
let tiger = Object.create(cat, {
    say: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: function() {
            console.log('roar~')
        }
    }
});
let cat1 = Object.create(cat);
cat1.say();
let tiger1 = Object.create(tiger);
tiger1.say();
```
#### 2. new 运算符都做了什么操作
new运算接受一个构造器和一组调用参数
- 以构造器的prototype属性（不同于私有[[prototype]]）为原型，创建新对象
- 将this和调用参数传给对象，执行
- 如果构造器返回的是对象，则返回，否则返回第一步创建的对象
#### 3. ES6中的类（class）
ES6中引入了class关键字，并且在标准中删除了所有[[class]]相关的私有属性描述，使类的概念正式从属性升级成语言的基础设施。
类的写法实际上也是由原型运行时来承载的，逻辑上JavaScript认为每个类是有共同原型的一组对象，类中定义的方法和属性则会写在原型对象上。
此外，类提供继承（extends）能力
```JavaScript
class Animal {
    constructor(name){
        this.name = name;
    }
    speak() {
        console.log(`${this.name} make a noise.`)
    }
}
class Cat extends Animal {
    constructor(name) {
        super(name)
    }
    speak() {
        console.log(`${this.name} barks.`)
    }
}
let cat1 = new Cat('DD');
cat1.speak();
let cat2 = new Cat('HH');
cat2.speak();
```