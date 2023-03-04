# Typescript
虽然将Typescript放在了后端，但它在前端框架(Vue3,React,Angular)中也是至关重要的。

重要的参考仍然是[官方文档](https://www.typescriptlang.org/docs/handbook/intro.html)
# 安装
全局安装typescript，
```
npm i -g typescript
```
# 快速开始项目
+ 创建`tsconfig.json`和`xxx.ts`
```
tsc --init
```
+ 编译生成xxx.js文件
```
tsc
```
+ 运行
```
node xxx.js
```

# 配置

# 装饰器(Decorator)
+ 装饰器目前是实验性功能，需要在`tsconfig.json`中添加下面的选项。分为类装饰器，方法装饰器等
```
"experimentalDecorators": true
```
## 实现AOP(Aspect orient programing)
AOP允许将一段重复性但运行时依赖的代码分离出去，在SprintBoot里面是最重要的概念之一。Typescript可以使用方法装饰器实现AOP技术。
+ 下面代码中实现了一个工厂函数`Role`，通过传入的参数`admin`或者`user`返回新的函数赋值给`descriptor.value`,将原来函数变成了新的函数
```typescript
function IsInRole(role : string) : boolean {
    return currentUser.roles.some(r => r.role === role);
}
function Role(role : string) {
    return function(target: any, propertyKey : string | symbol, descriptor : PropertyDescriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function() {
            if (IsInRole(role)) {
                originalMethod.apply(this, arguments);
            } else {
                console.log(`${currentUser.user} is not in the ${role} role`);
            }
        }
        return descriptor;
    }
}
interface IDecoratorExample {
    AnyoneCanRun(args:string) : void;
    AdminOnly(args:string) : void;
}
class DecoratedExampleMethodDecoration implements IDecoratorExample {
    @Role("user") // Note, no semi-colon
    AnyoneCanRun(args:string) : void {
        console.log(args);
    }

    @Role("admin")
    AdminOnly(args:string) : void {
        console.log(args);
    }
}
function TestDecoratorExample(decoratorMethod : IDecoratorExample) {
    console.log(`Current user ${currentUser.user}`);
    decoratorMethod.AnyoneCanRun(`Running as user`);
    decoratorMethod.AdminOnly(`Running as admin`);        
}

let currentUser = {user: "Admin", roles : [{role:"user"}, {role:"admin"}] };
TestDecoratorExample(new DecoratedExampleMethodDecoration());
currentUser = {user: "bob", roles : [{role:"user"}] };
TestDecoratorExample(new DecoratedExampleMethodDecoration());
```
输出为
```
Current user peter
Running as user
Running as admin
Current user bob
Running as user
bob is not in the admin role
```
