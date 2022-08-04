function ajax(method, url, data) {
  let xhr = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return
      if (xhr.status === 200) {
        resolve(xhr.responseText)
      } else {
        reject(xhr.statusText)
      }
    }
    xhr.open(method, url)
    xhr.send(data)
  })
}