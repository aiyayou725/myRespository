function ajax(url, method = "get", param = {}) {
  // 创建 XMLHttpRequest 对象
  let xhr = new XMLHttpRequest()
  // 三个参数，规定请求的类型，URL 以及是否异步处理请求
  xhr.open(method, url, true)
  // 设置请求头，发送信息至服务器时内容编码类型
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
  // 当 readyState 属性改变时就会调用该函数
  xhr.onreadystatechange() = function () {
    if (xhr.readyState === 4) {
      // 2xx 请求成功
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        success(JSON.parse(xhr.responseText))
      } else {
        fail && fail()
      }
    }
  }
  // 发送请求，用于实际发出HTTP请求，不带参数为get请求
  xhr.send()
}