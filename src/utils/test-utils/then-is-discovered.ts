import Card from '../../types/card';
import EternitiesMap from '../eternities-map';

export default function thenIsDiscovered(eternitiesMap: EternitiesMap, x: number, y: number): void {
  const card: Card = eternitiesMap.getCard(x, y);
  expect(card.isDiscovered).toBe(true);
}
