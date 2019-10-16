import Card from '../types/card';
import EternitiesMap from './eternities-map';
import Stage from './stage';
import Tile from './tile';

const TEST_DECK = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];

describe('EternitiesMap', (): void => {
  it('should instantiate', (): void => {
    new EternitiesMap(TEST_DECK);
  });

  let eternitiesMap: EternitiesMap;
  beforeEach((): void => {
    eternitiesMap = new EternitiesMap(TEST_DECK);
  })

  describe('getCard', (): void => {
    it('should return a card if one exists', (): void => {
      const card: Card = eternitiesMap.getCard(0, 0);
      expect(card).toBeInstanceOf(Tile);
    });

    it('should throw an error if a card does not exist', (): void => {
      expect((): void => {
        eternitiesMap.getCard(12, 12);
      }).toThrow();
    });
  });

  describe('discover', (): void => {
    it('should discover a card', (): void => {
      eternitiesMap.discover(1, 0);
      thenIsDiscovered(eternitiesMap, 1, 0);
    });
  });

  describe('onMulliganFinish', (): void => {
    it('should discover planes surrounding 0,0', (): void => {
      eternitiesMap.onMulliganFinish();

      thenIsDiscovered(eternitiesMap, -1, 0);
      thenIsDiscovered(eternitiesMap, 0, -1);
      thenIsDiscovered(eternitiesMap, 0, 1);
      thenIsDiscovered(eternitiesMap, 1, 0);
    });

    it('should allow hellriding', (): void => {
      eternitiesMap.onMulliganFinish();
      thenCanHellride(eternitiesMap, -1, -1);
      thenCanHellride(eternitiesMap, -1, 1);
      thenCanHellride(eternitiesMap, 1, -1);
      thenCanHellride(eternitiesMap, 1, 1);
    });

    it('should update the stage', (): void => {
      expect(eternitiesMap.getStage()).toBe(Stage.AwaitingMulligans);
      eternitiesMap.onMulliganFinish();
      expect(eternitiesMap.getStage()).toBe(Stage.Ready);
    });
  });

  describe('canHellride', (): void => {
    beforeEach((): void => {
      eternitiesMap.onMulliganFinish();
    });

    it('should return true for undiscovered diagonal planes', (): void => {
      expect(eternitiesMap.canHellride(1, 1)).toBe(true);
    });

    it('should return false for non-diagonal planes', (): void => {
      expect(eternitiesMap.canHellride(1, 0)).toBe(false);
      expect(eternitiesMap.canHellride(12, 12)).toBe(false);
    });

    it('should return false for discovered planes', (): void => {
      eternitiesMap.discover(1, 1);
      expect(eternitiesMap.canHellride(1, 1)).toBe(false);
    });
  });
});
