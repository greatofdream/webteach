# Javascript
# 数据类型
+ 基本类型(primitive value)
	+ 简单的数据段，包括 Undefined, Null, Boolean, Number, String
	+ 初始化只使用2原始字面量形式，如果使用new则会创建Object
	+ 无法加入新的属性
+ 引用类型(reference value)
	+ 可能由多个值构成的对象
	+ `Date`
	+ `RegExp`:正则表达式，创建方式为`let expression=/pattern/flags`
	+ 原始值包装类型:Boolean,Number,String对象，用于调用原始值的各种方法。
	+ Object
	+ Array
	+ 定型数组
	+ Map
	+ WeakMap
	+ Set
	+ WeakSet
	+ Function(函数)
+ 判断类型
	+ typeof
	+ instance of
	+ Object.prototype.call()
+ 创建Object实例
	+ new Object()调用构造函数;{}不调用构造函数
	+ Object.create() 方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）。避免使用Object.setPrototypeOf()带来的性能影响。
+ Map
	+ Map存储利用率更高
	+ 插入性能比Object好
	+ 删除速度比Object快
	+ 查询速度有时比Object慢
	+ Object只能用数值，字符串，符号作为key,Map可以使用任意数据类型
	+ Map维护插入顺序，可以按照插入顺序迭代.entries,keys,values
+ 深拷贝
	+ 引用类型处理；循环引用处理
```
	function isObject(o) {
    const oType = typeof o;
    return (o !== null) && (oType === "object" || oType === "function");
}
function deepClone(o, map = new WeakMap()) {
    if (!isObject(o)){
        return o;
    } else if (map.has(o)) {
        return map.get(o);
    } else if (o instanceof Date) {
        return new Date(o);
    } else if (o instanceof RegExp){
        var flags = '';
        flags += o.global ? 'g' : '';
        flags += o.multiline ? 'm' : '';
        flags += o.ignoreCase ? 'i' : '';
        return new RegExp(o.source, flags);
    }  else if (o instanceof Function){//函数保持不变
        return o;
    }
    let newObj = {};
    if (o instanceof Map){
        // newObj = new Map();
        return new Map([...o])
    } else if (o instanceof Set) {
        // newObj = new Set();
        return new Set([...o])
    } else if (o instanceof Array) {
        newObj = [];
    }
    map.set(o, newObj);
    for (const key in o) {
        // newObj[key] = argments.callee(o[key], map);
        newObj[key] = deepClone(o[key], map);
    }
    const symbolKeys = Object.getOwnPropertySymbols(o);
    for (const skey of symbolKeys) {
        newObj[skey] =  deepClone(o[skey], map);
    }
    return newObj;
}

let s1 = Symbol('aaa')
let s2 = Symbol('bbb')

const obj = {
  name: 'CoderBin',
  friend: {
    name: 'Jack'
  },
  b: undefined,
  s2: s2,
  skill: ['js', 'vue', 'react'],
  foo: () => { },
  [s1]: 's11',
  set: new Set(['a', 'b', 'c']),
  map: new Map([
    ['a', 'aa'],
    ['b', 'bb']
  ])
}

obj.info = obj

const newObj = deepClone(obj)

console.log(obj)
console.log(newObj)

console.log(newObj.foo === obj.foo)
```
# 函数
+ 闭包
# 代理与反射
# 事件
+ 捕获和冒泡
+ async await实质只是promise.then 的语法糖，带 async 关键字的函数，它使得你的函数的返回值必定是 promise 对象，如果async关键字函数返回的不是promise，会自动用Promise.resolve()包装，如果async关键字函数显式地返回promise，那就以你返回的promise为准。
+ 每一个宏任务队列都可以理解为当前的主线程，js总是先执行主线程上的任务，执行完毕后执行当前宏任务队列上的所有微任务，先进先出原则，在执行完这一个宏任务队列上的所有微任务之后，才会继续执行下一个宏任务。

不管是同步还是异步，js都会按顺序执行，只是不等待异步的执行结果而已
同步的任务没有优先级之分，异步执行有优先级，先执行微任务（microtask队列），再执行宏任务（macrotask队列），同级别按顺序执行微任务
# 原型
+ instanceof通过搜索原型链确认类型
# 跨浏览器
+ typeof检测正则表达式
	+ Safari5及之前，Chrome7及之前返回function
	+ IE，Firefox返回Object


