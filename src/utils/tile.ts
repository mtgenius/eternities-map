export default class Tile<T> {
  private discovered: boolean = false;
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  public discover(): void {
    this.discovered = true;
  }

  public isDiscovered(): boolean {
    return this.discovered;
  }
}
