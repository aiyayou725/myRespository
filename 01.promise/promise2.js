
class MyPromise {
    // 构造方法接收一个回调
    constructor(fn) {
        // Promise三种状态
        this.status = 'pending';
        // 定义状态为resolved(fulfilled)的时候的状态
        this.value = undefined;
        // 定义状态为rejected的时候的状态
        this.reason = undefined;
 
        // 成功队列, 存放成功的回调，resolve时触发
        this.onResolvedCallbacks = [];
        // 失败队列,  存放失败的回调，reject时触发
        this.onRejectedCallbacks = [];
 
        // 由于resolve/reject是在fn内部被调用, 因此需要使用箭头函数固定this指向,指向Promise实例
        let resolve = (value) => {
            // 对应规范中的"状态只能由pending到fulfilled或rejected"
            if (this.status === 'pending') {
                this.value = value;
                // 变更状态
                this.status = 'fulfilled';
                this.onResolvedCallbacks.forEach(callback => callback(value));
            }
        }
        // 实现同resolve
        let reject = (reason) => {
            // 对应规范中的"状态只能由pending到fulfilled或rejected"
            if (this.status === 'pending') {
                this.reason = reason;
                // 变更状态
                this.status = 'rejected';
                this.onRejectedCallbacks.forEach(callback => callback(reason));
            }
        }
        // 执行时可能会发生异常
        try {
            // new Promise()时立即执行fn,并传入resolve和reject
            fn(resolve, reject);
        } catch(e) {
            reject(e);
        }
    }
 
    // then方法,接收一个成功的回调和一个失败的回调
    then(onFullfilled, onRejected) {
        // 防止值的穿透
        if (typeof onFullfilled !== 'function') onFullfilled = v => v;
        if (typeof onRejected !== 'function') onRejected = v => v;
        // return一个新的promise
        return new MyPromise((resolve, reject) => {
            // 把onFullfilled重新包装一下,再push进resolve执行队列,这是为了能够获取回调的返回值进行分类讨论，使用箭头函数，使this指向实例
            const fulfilledFn = value => {
                try {
                    // 执行第一个(当前的)Promise的成功回调,并获取返回值
                    let x = onFullfilled(value);
                    // 分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
               }
               // 把onRejected重新包装一下，使用箭头函数，使this指向实例
               const rejectedFn = value => {
                try {
                    // 执行第一个(当前的)Promise的失败回调,并获取返回值
                    let x = onRejected(value);
                    // 分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
               }
               // 根据状态变换
               switch(this.status) {
                   // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
                   case 'pending':
                       this.onResolvedCallbacks.push(fulfilledFn);
                       this.onRejectedCallbacks.push(rejectedFn);
                       break;
                   // 当状态已经变为resolve/reject时,直接执行then回调
                   case 'fulfilled':
                       fulfilledFn(this.value);
                       break;
                   case 'rejected':
                       rejectedFn(this.reason);
                       break;
               }
        })
    }
 
    // catch方法,接收一个失败的回调
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
 
    // finally方法
    finally(cb) {
        return this.then(
            // 执行回调,并return value传递给后面的then
            value => MyPromise.resolve(cb()).then(() => value),
            // reject同理
            reason => MyPromise.resolve(cb()).then(() => {throw reason})
          )
    }
 
    // 静态的resolve方法
    static resolve(value) {
        // 根据规范, 如果参数是Promise实例, 直接return这个实例
        if (value instanceof MyPromise) return value;
        return new MyPromise(resolve => resolve(value));
    }
 
    // 静态的reject方法
    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason));
    }
 
    // 静态的all方法
    static all(promises) {
        // 计数器，用来累计promise的已执行次数
        let index = 0;
        // 存放 promise执行后的结果
        let res = [];
        // 返回一个MyPromise对象
        return new MyPromise(function (resolve, reject) {
            for (let i = 0; i < promises.length; i++) {
                MyPromise.resolve(promises[i]).then(
                    function(value) {
                        index++;
                        // 结果数组按照原数组的顺序依次输出
                        res[i] = value;
                        // 所有MyPromise都resolve
                        if (index === promises.length) resolve(res);
                    },function(reason) {
                        // 第一个reject的MyPromise
                        reject(reason);
                    }
                )
            }
        })
    }
 
    // 静态的race方法,只要有一个promise成功了 就算成功。如果第一个失败了就失败了
    static race(promises) {
        // 返回一个MyPromise对象
        return MyPromise(function(resolve, reject) {
            // 同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
            for (let promise of promises) {
                // Promise.resolve(promise)用于处理传入值不为Promise的情况
                MyPromise.resolve(promise).then(function(value) {
                    // 注意这个resolve是上边new MyPromise的
                    resolve(value);
                }, function(error) {
                    reject(error);
                })
            }
        })
    }
 
    // 静态的allSettled方法
    static allSettled(promises) {
        // 计数器，用来累计promise的已执行次数
        let index = 0;
        // 存放 promise执行后的结果
        let res = [];
        // 返回一个MyPromise对象
        return new MyPromise(function (resolve, reject) {
            for (let i = 0; i < promises.length; i++) {
                MyPromise.resolve(promises[i]).then(
                    function(value) {
                        index++;
                        // 结果数组按照原数组的顺序依次输出
                        res[i] = { status: 'fulfilled', value: value };
                        // 所有MyPromise都resolve
                        if (index === promises.length) resolve(res);
                    },function(reason) {
                        // 和第一个类似，但要注意状态
                        index++;
                        // 结果数组按照原数组的顺序依次输出
                        res[i] = { status: 'rejected', reason: reason };
                        // 所有MyPromise都resolve
                        if (index === promises.length) resolve(res);
                    }
                )
            }
        })
    }
 
    // 静态的any方法
    static any(promises) {
        // 计数器，用来累计promise的已执行次数
        let index = 0;
        // 存放 promise执行后的结果
        let reasons = [];
        // 返回一个MyPromise对象
        return new MyPromise(function (resolve, reject) {
            for (let i = 0; i < promises.length; i++) {
                MyPromise.resolve(promises[i]).then(
                    function(value) {
                        // 第一个resolve的MyPromise
                        resolve(value);
                    }, function(reason) {
                        // 结果数组按照原数组的顺序依次输出
                        index++;
                        reasons.push(reason);
                        // 所有MyPromise都resolve
                        if (index === promises.length) reject(new AggregateError('All promises were rejected', reasons));
                    }
                )
            }
        })
    }
}
 
let promises1 = [
    MyPromise.reject('ERROR A'),
    MyPromise.reject('ERROR B'),
    MyPromise.resolve('result'),
]
 
MyPromise.any(promises1).then((value) => {
    console.log('value: ', value);
}).catch((err) => {
    console.log('err: ', err);
})
 
// value:  result
 
//   如果所有传入的 promises 都失败：
 
let promises2 = [
    MyPromise.reject('ERROR A'),
    MyPromise.reject('ERROR B'),
    MyPromise.reject('ERROR C'),
]
 
MyPromise.any(promises2).then((value) => {
    console.log('value：', value);
}).catch((err) => {
    console.log('err：', err);
    console.log(err.message);
    console.log(err.name);
    console.log(err.errors);
})
 
// err：AggregateError: All promises were rejected
// All promises were rejected
// AggregateError