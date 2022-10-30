export class Stack<T> {
  private stack: T[] = [];

  public get size() {
    return this.stack.length;
  }

  public get empty() {
    return this.stack.length <= 0;
  }

  public array() {
    return [...this.stack];
  }

  public add(...items: T[]) {
    for (const item of items) this.stack.push(item);
    return this;
  }

  public pop() {
    return this.stack.pop();
  }

  public top() {
    return this.stack.at(-1);
  }
}
