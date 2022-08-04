// 手写 Promise
const PENDDING = 'pendding';
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected';
class MyPromise {
  constructor(executor) {
    this.state = PENDDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    
    let resolve = (value) => {
      if (this.state === PENDDING) {
        this.state = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = (reason) => {
      if (this.state === PENDDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }  
    }
    try {
      executor(resolve, reject) 
    } catch (err) {
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        onFulfilled(this.value)
      }
      if (this.state === REJECTED) {
        onRejected(this.reason)
      }
      if (this.state === PENDDING) {
        this.onResolvedCallbacks.push(() => {
          onFulfilled(this.value)
        })
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason)
        })
      }  
    })
  }
}


function text() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      reject('出错了')
    }, 1000)
  })
}
var p = text()
p.then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
})





// https://blog.csdn.net/qq_42926373/article/details/106218764?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-106218764-blog-119761079.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-106218764-blog-119761079.pc_relevant_default&utm_relevant_index=1

//https://blog.csdn.net/qq_35258995/article/details/120719661?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-5-120719661-blog-106218764.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-5-120719661-blog-106218764.pc_relevant_default&utm_relevant_index=10





class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      };
    });
    return promise2;
  }
  catch(fn){
    return this.then(null,fn);
  }
}
function resolvePromise(promise2, x, resolve, reject){
  if(x === promise2){
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  let called;
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') { 
        then.call(x, y => {
          if(called)return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if(called)return;
          called = true;
          reject(err);
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      if(called)return;
      called = true;
      reject(e); 
    }
  } else {
    resolve(x);
  }
}
//resolve方法
Promise.resolve = function(val){
  return new Promise((resolve,reject)=>{
    resolve(val)
  });
}
//reject方法
Promise.reject = function (val) {
  return new Promise((resolve, reject) => {
    reject(val)
  });
}
//race方法 
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++){
      promises[i].then(resolve, reject)
    };
  })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function(promises){
  let arr = [];
  let i = 0;
  function processData(index,data){
    arr[index] = data;
    i++;
    if(i == promises.length){
      resolve(arr);
    };
  };
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(data=>{
        processData(i,data);
      },reject);
    };
  });
}


  