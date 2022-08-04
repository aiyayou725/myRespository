// 预加载图片
// 有时候一个页面有很多图片，或者有几个很大的图片的时候，如果业务限制不考虑懒加载，也可以使用Web Worker来加载图片

// 主线程
let w = new Worker("js/workers.js");
  w.onmessage = function (event) {
  var img = document.createElement("img");
  img.src = window.URL.createObjectURL(event.data);
  document.querySelector('#result').appendChild(img)
}

// worker线程
let arr = [...好多图片路径];
for (let i = 0, len = arr.length; i < len; i++) {
  let req = new XMLHttpRequest();
  req.open('GET', arr[i], true);
  req.responseType = "blob";
  req.setRequestHeader("client_type", "DESKTOP_WEB");
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      postMessage(req.response);
    }
  }
  req.send(null);
}
