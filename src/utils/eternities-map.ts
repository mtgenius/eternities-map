import Card from '../types/card';
import Grid from './grid';
import Stage from './stage';
import Tile from './tile';

export default class EternitiesMap {
  private current: [number, number] = [0, 0];
  private deck: string[];
  private grid: Grid<Card> = new Grid<Card>();
  private stage: Stage = Stage.AwaitingMulligans;

  constructor(deck: string[]) {
    this.deck = deck;
    this.chart(-1, 0);
    this.chart(0, -1);
    this.chart(0, 0);
    this.chart(0, 1);
    this.chart(1, 0);
    this.discover(0, 0);
  }

  private chart(x: number, y: number): void {
    const cardId: string = this.deck.pop();
    this.grid.setIfEmpty(x, y, new Tile<string>(cardId));
  }

  private discover(x: number, y: number): void {
    const card: Card = this.getCard(x, y);
    card.discover();
  }

  public getCard(x: number, y: number): Card {
    return this.grid.get(x, y);
  }

  public getStage(): Stage {
    return this.stage;
  }

  public onMulliganFinish(): void {
    this.discover(-1, 0);
    this.discover(0, -1);
    this.discover(0, 1);
    this.discover(1, 0);
    this.chart(-1, -1);
    this.chart(-1, 1);
    this.chart(1, -1);
    this.chart(1, 1);
    this.stage = Stage.Ready;
  }

  public canHellride(x: number, y: number): boolean {
    const [ currentX, currentY ] = this.current;
    const possibleHellrideCoords: [number, number][] = [
      [ currentX - 1, currentY - 1 ],
      [ currentX - 1, currentY + 1 ],
      [ currentX + 1, currentY - 1 ],
      [ currentX + 1, currentY + 1 ],
    ];
    for (const [possibleHellrideX, possibleHellrideY] of possibleHellrideCoords) {
      if (
        x === possibleHellrideX &&
        y === possibleHellrideY
      ) {
        return !this.isDiscovered(x, y);
      }
    }
    return false;
  }

  private isDiscovered(x: number, y: number): boolean {
    const card: Card = this.getCard(x, y);
    return !card.isDiscovered;
  }

  public move(x: number, y: number): void {
    this.current = [x, y];
  }

  public getCurrent(): [number, number] {
    return this.current;
  }
}
