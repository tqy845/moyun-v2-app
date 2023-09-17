// downloadWorker.ts

self.addEventListener('message', (event) => {
  const { url } = event.data
  const xhr = new XMLHttpRequest()

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // 文件下载完成后，向主线程发送消息
      self.postMessage({ type: 'downloaded', data: xhr.responseText })
    }
  }

  xhr.onprogress = (e) => {
    if (e.lengthComputable) {
      // 计算并发送下载进度
      const progress = (e.loaded / e.total) * 100
      self.postMessage({ type: 'progress', data: progress })
    }
  }

  // 发起下载请求
  xhr.open('GET', url, true)
  xhr.send()
})
