import EternitiesMap from "../eternities-map";

export default function thenCanHellride(eternitiesMap: EternitiesMap, x: number, y: number): boolean {
  expect(eternitiesMap.canHellride(x, y)).toBe(true);
}
