export class Concurrent<T extends { [key: string]: () => Promise<any> }> {
  private maxConcurrent: number
  private runningCount: number = 0
  private taskQueue: Array<{
    task: T
    key: keyof T
    resolve: () => void
    reject: (error: any) => void
  }> = []
  private allPromises: Array<Promise<void>> = []
  public all: Array<T> = []

  constructor(count: number = 2) {
    this.maxConcurrent = count
  }

  public add(task: T, key: keyof T): void {
    const promise = new Promise<void>((resolve, reject) => {
      this.taskQueue.push({ task, key, resolve, reject })
      this.all.push(task)
      this.processQueue()
    })
    this.allPromises.push(promise)
  }

  private async processQueue() {
    if (this.runningCount >= this.maxConcurrent || this.taskQueue.length === 0) {
      return
    }

    this.runningCount++
    const { task, key, resolve, reject } = this.taskQueue.shift()!

    try {
      await task[key]()
      resolve()
    } catch (error) {
      reject(error)
    } finally {
      this.runningCount--
      this.processQueue()
    }
  }

  public async waitForAll() {
    return await Promise.all(this.allPromises)
  }
}
