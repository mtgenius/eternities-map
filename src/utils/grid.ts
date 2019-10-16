type XAxis<T> = Map<number, YAxis<T>>;
type YAxis<T> = Map<number, T>;

export default class Grid<T> {
  private xAxis: XAxis<T> = new Map<number, YAxis<T>>();

  public get(x: number, y: number): T {
    if (!this.xAxis.has(x)) {
      throw new Error(`No values exist at x=${x}.`);
    }
    const yAxis: YAxis<T> = this.xAxis.get(x);
    if (!yAxis.has(y)) {
      throw new Error(`No tile exists at (${x}, ${y}).`);
    }
    return yAxis.get(y);
  }

  public set(x: number, y: number, value: T): void {
    if (!this.xAxis.has(x)) {
      this.xAxis.set(x, new Map<number, T>());
    }
    const yAxis: YAxis<T> = this.xAxis.get(x);
    yAxis.set(y, value);
  }

  public setIfEmpty(x: number, y: number, value: T): void {
    if (this.xAxis.has(x)) {
      return;
    }
    const yAxis: YAxis<T> = this.xAxis.get(x);
    if (yAxis.has(y)) {
      return;
    }
    this.set(x, y, value);
  }
}
