#### 1.javascript数据类型
> - Undefined /// 表示未定义，只有一个值就是Undefined，在赋值前，所有变量都是undefined。Undefined不是JavaScript关键，为防止被篡改，建议使用 void 0代替
> - Null /// 表示已定义，但是值为空。null是JavaScript关键字，所有可以放心使用
> - Boolean /// true || false
> - Number /// 
> - String /// 实际表示的是字符串的UTF16编码
>   + NaN，占用了 9007199254740990，这原本是符合 IEEE 规则的数字；
>   + Infinity，无穷大；
>   + -Infinity，负无穷大。
>   + 根据双精度浮点数的定义，Number 类型中有效的整数范围是 -0x1fffffffffffff 至 0x1fffffffffffff，所以 Number 无法精确表示此范围外的整数。
> - Object /// 属性的集合，
> - Symbol /// ES6新增类型，表示唯一值
>   ```javascript
>   Symbol.prototype.hello = () => console.log('hello');
>   var a = Symbol('a');
>   console.log(typeof a); /// 'symbol' 并非是个对象
>   a.hello(); /// 'hello'
>   /// .运算符提供了装箱操作，他会根据数据类型构造一个临时对象，使得我们能在基础数据类型上调用对应对象的方法
>   ```
> **Number、String和Boolean，三个构造器是两用的，当跟new搭配使用时，会产生一个对象。当直接调用时，表示强制类型转换**
> **Symbol函数直接用new调用的话，会抛出错误。但它仍是Symbol对象的构造器**
#### 2.类型转换
> - ###### Number和String之间的转换
>   + Number([string]) => 支持十进制、二进制、八进制和十六进制的转换，还支持的字符串包括正负号科学计数法
>   + parseInt和parseFloat的转换语法跟Number不同。在不传入第二个参数的情况下，parseFloat只支持16进制前缀"0x"，而且会忽略非数字字符，也不支持科学计数法
>   + 在一些古老的浏览器，parseInt还支持0开头的数字作为8进制前缀，这样会导致很多错误。所以在任何环境下，都建议传入parseInt的第二个参数，而parseFloat会直接把原字符串作为十进制来解析，不会引入任何的其他进制
> **多数情况下，Number是比parseInt和parseFloat更好的选择**
> - ##### 装箱转换 => 把基本类型转换为对应的对象
>   ```javascript
>   var symbolObject = (function() {return this}).call(Symbol('a')); /// call 会改变this指向，使其指向Symbol函数，
>   console.log(typeof symbolObject); /// object
>   console.log(symbolObject instanceof Symbol); // true 也是Symbol的实例
>   console.log(symbolObject.constructor === Symbol); // true;
>   /// 使用内置的Object函数，显示的调用装箱能力
>   var syObj = Object(Symbol('a')); /// call 会改变this指向，使其指向Symbol函数，
>   console.log(typeof syObj); /// object
>   console.log(syObj instanceof Symbol); // true 也是Symbol的实例
>   console.log(syObj.constructor === Symbol); // true;
>   console.log(Object.prototype.toString.call(syObj)) // [object Symbol]
>   ```
>   每个对象都有私有的属性，这些属性可以用`Object.prototype.toString`来获取，在JavaScript中，没有任何方法可以修改私有的属性，因此`Object.prototype.toString`是可以准确地识别对象对应的基本类型的方法，甚至比`instanceof`更准确。但是由于call本身会产生装箱操作，所以需要配合typeof来区分基本类型还是对象类型。
> - ##### 拆箱转换 => 对象类型到基本类型的转换
> 在JavaScript标准中，规定了`ToPrimitive(input [,PreferredType])`函数，用作对象类型到基本类型的转换，参数`PreferredType`是可选，指出input被期待转成的类型，如果不传`PreferredType`，则默认为'number'。先执行`valueOf`, 后执行`toString`;如果`preferredType`的值是'string'，那就先执行`toString`, 后执行`valueOf`。由此可见，`toString`, `valueOf`的执行顺序，取决于preferred的值。