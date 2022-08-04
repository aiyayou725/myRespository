/**
 * readyState 
   * 0 ： XMLHttpRequest 实例已生成，但是open方法还未调用
   * 1 ： 已调用open方法，还未调用send方法，此时可以设置请求头
   * 2 ： send方法已执行，收到响应头信息和状态码
   * 3 ： 正在接收服务器传来的body数据
   * 4 ： 服务器数据完全接收/本次接收失败
**/

/**
 * status 状态码
   * 1xx
      * 100 : 告诉客户端继续发送请求，数据没有传输完成 
      * 101 ： 协议转换
   * 2xx
      * 200 ： 响应成功
      * 201 ： 创建成功
   * 3xx ： 请求需要重定向到另一个 URL
      * 301 ： 请求资源已被永久移走 
      * 303 ： 访问另一个网站
      * 304 ： 请求资源未被修改，可以直接使用客户端缓存的资源
   * 4xx 客户端错误
      * 400 ： 无效的请求消息
      * 401 ： 请求资源没有付费
      * 403 ： 请求的资源不被允许访问
      * 404 ： 请求的资源不存在
      * 405 ： 请求方法不被服务器允许
      * 414 ： 请求的URI太大，无法解析
   * 5xx 服务器端错误
      * 500 ： 服务器内部错误
      * 503 ： 服务器被攻击了
      * 505 ： 服务器版本太低 
 */


function ajax(url, method = "get", param = {}) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.setRequestHeader("content-type", "application/x-www.form-urlencoded")
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(JSON.parse(xhr.responseText)) 
        } else {
          reject(xhr.status)
        }
      } 
    }  
  })
}