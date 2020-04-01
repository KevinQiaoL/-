#### 1.工厂模式 (Factory Pattern）
- ##### 表现形式
```javascript
function Factory(name, age) {
    var obj = {};
    obj.name = name;
    obj.age = age;
    return obj;
}
const fc1 = Factory('xxx', 25);
const fc2 = Factory('xxxxxx', 22); 
```
- 把实现相同功能的代码进行封装，以此来实现批量生产（后期执行函数即可）
- 低耦合高内聚，减少页面中代码冗余，提高代码的重复使用
