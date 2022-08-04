// https://www.jb51.net/article/220903.htm

// https://blog.csdn.net/flitrue/article/details/120724668?spm=1001.2101.3001.6650.10&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-10-120724668-blog-88054116.pc_relevant_multi_platform_whitelistv2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-10-120724668-blog-88054116.pc_relevant_multi_platform_whitelistv2&utm_relevant_index=16


function limitRequest(urls = [], limit = 3) {
  return new Promise((resolve, reject) => {
    const len = urls.length
    let count = 0

    while (limit > 0) {
      start()
      limit-- 
    }

    function start() {
      const url = urls.shift()
      if (url) {
        axios.post(url).then(res => {
          // todo
        }).catch(err => {
          // todo
        }).finally(() => {
          if (count === len - 1) {
            // 最后一个任务完成
            resolve()
          } else {
            count++
            start()
          }
        })
      }
    }
  })
}