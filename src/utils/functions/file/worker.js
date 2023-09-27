self.addEventListener('message', (event) => {
  const { totalChunks, fileName } = event.data
  const chunks = new Array(totalChunks)
  const receivedChunks = new Array(totalChunks).fill(false)

  self.postMessage('Worker线程已启动，正在执行文件分片')

  self.addEventListener('message', (event) => {
    const { chunk, chunkNumber } = event.data
    chunks[chunkNumber] = chunk
    receivedChunks[chunkNumber] = true

    self.postMessage(event)

    // if (receivedChunks.every(Boolean)) {
    //   const mergedFile = new Blob(chunks, { type: chunks[0].type })
    //   const downloadLink = document.createElement('a')
    //   downloadLink.href = URL.createObjectURL(mergedFile)
    //   downloadLink.download = fileName
    //   downloadLink.click()
    // }
  })
})
