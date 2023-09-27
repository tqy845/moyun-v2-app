onmessage = (event) => {
  const taskData = event.data

  console.log('执行')
  // 执行分片任务
  const result = performChunkTask(taskData)

  // 向主线程返回结果
  postMessage(result)
}

function performChunkTask(data) {
  // 执行分片任务的代码
  // 返回结果
  return 'Task completed'
}
