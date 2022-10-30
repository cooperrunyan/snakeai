export class Queue<T> {
  private queue: T[] = [];

  public get size() {
    return this.queue.length;
  }

  public get empty() {
    return this.queue.length <= 0;
  }

  public enqueue(item: T) {
    this.queue.push(item);
    return this;
  }

  public dequeue() {
    return this.queue.unshift();
  }
}
