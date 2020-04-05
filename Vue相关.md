####  1.响应式数据原理
- 默认vue在初始化数据时，会给data中的所有属性使用Object.defineProperty重新定义，当页面取到相应属性时，会进行依赖收集（Watcher），如果属性发生变化，就会通知相关依赖进行更新操作/
> - `initData` 初始化用户传入的data数据
> - 创建`Observer`对数据进行观察
> - `defineReactive` 循环对象属性定义响应式变化
> - `Object.defineProperty`重新定义属性
> 初始数据 => 拦截数据的获取 => 进行依赖收集 => 拦截属性的更新操作 => 通知相关依赖
#### 2.Vue中如和检测数组变化
- 使用函数劫持的方式，重写了数组的方法
- Vue将data中的数组，进行了原型链重写，指向了自定义的数组原型方法。当调用数组api时，会通知依赖更新，如果数组中包含了引用类型，会对数组中的引用类型再次进行监控
> - `initData` 初始化数据
> - 创建`Observer`对数据进行观察u
> - `protoAugument(value, arrayMethod)`将数组原型方法指向自定义的原型上，`arrayMethod`即自定义的数组方法
> - `observerArray`深度观察数组中的每一项（包括对象类型）
#### 3.Vue为什么采用异步渲染
- Vue是组件级更新，异步更新是为了提升性能，因为如果不使用异步渲染的话，那么每次更新数据都会对当前组件重新渲染
###### 当数据发生变化时 => 核心 nextTick
> - `dep.notify()` 通知`watcher`进行更新操作
> - `sub[i].update` 依次调用`watcherd`的`update`, 并不是立即更新
> - 将`watcher`重新放到队列中`queueWatcher`，会先过滤，如果是相同的`watcher`会被过滤掉 => 更新，
> - `nextTick`异步清空`watcher`队列
#### 4.组件中的data为什么必须是函数
- 防止实例中的data冲突，组件中的data通过return一个函数达到数据自治的目的
#### 5.nextTick实现原理
- 使用宏任务和微任务定义了一个异步方法，多次调用nextTick会将方法存入队列，通过这个异步方法清空当前队列，所以是个异步方法
> - `nextTick(cb)`传入一个回调方法cb
> - `callbacks.push(cb)`将回调函数存入数组
> - 调用`timeFunc()` => 尝试使用Promise() | 尝试采用MutationObserver回调（H5方法）| 尝试采用setImmediate回调 | 尝试采用setTimeout回调 => 执行回调方法cb
> - 返回`promise`
#### 6.Vue中Computed的特点
- 默认computed也是一个watcher，是具备缓存的，只有依赖的属性发生变化时才回更新视图
#### 7.Vue中deep: true是如何实现的
- 当用户指定了watch中的deep属性为true时，如果当前监控的值是数组类型，会对对象中的每一项进行求值，此时会将当前watcher放入对应属性的依赖中，这样数组中的对象发生变化时，也会通知数据更新
#### 8.Vue生命周期
- beforeCreate() 在实例初始化后，数据观察之前调用
- created() 实例已经创建完成后被调用，在这一步，实例已完成数据观察，属性和方法的运算，watch/event事件回调，但是没有$el 
  + 进行数据、资源请求
- beforeMount() 在挂载开始之前调用，相关的render函数首次被调用
- mounted() el被新创建的`vm.$el`替换, 并挂载到实例上之后调用该钩子
  + 可以进行DOM操作
- beforeUpdate() 数据更新是调用，发生在虚拟DOM重新渲染之前
  + 可以进一步地更改状态，不会出发渲染
- updated() 由于数据更改导致的虚拟DOM重新渲染和补丁，在这之后会调用该钩子（服务端渲染期间不被调用）
  + 可以执行依赖于DOM的操作，但是大多数情况下不建议在此期间更改状态，因为有可能导致更新死循环。
- beforeDestory() 在实例销毁之前调用，这一步中实例仍然可用
- destoryed() 实例销毁后调用，调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。（服务端渲染期间不被调用）
  + 可以情况定时器，解绑事件等
> 当使用了keep-live缓存组件时，会增加两个生命周期
> - activated()
> - deactivated()
#### 9.Vue中模板编译的原理
- 将模板转换为AST树（虚拟DOM，用对象来描述DOM）
- 优化树
- 将AST树生成代码
#### 10.v-if和v-show区别
- v-if 创建/删除 完整的渲染和销毁
- v-show 显示/隐藏 // 指令
#### 11.v-for和v-if不能连用
- v-for的优先级会比v-if的优先级高，如果连用的话，会把v-if给每一个元素都加上，造成性能问题
#### async 和 defer
- ##### 相同点
- 都属于异步加载js脚本
- ##### 不同点
- async会在异步加载完之后立即执行，阻塞html渲染，跟顺序无关
- defer在加载完之后，等待所有元素解析完成，在DOMContentLoaded事件触发前执行，跟顺序有关
