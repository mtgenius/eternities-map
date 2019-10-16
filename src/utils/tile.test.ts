import Tile from './tile';

const TEST_VALUE = 'test value';

describe('Tile', (): void => {
  it('should instantiate', (): void => {
    new Tile<string>(TEST_VALUE);
  });

  let tile: Tile<string>;
  beforeEach((): void => {
    tile = new Tile<string>(TEST_VALUE);
  });

  describe('discover', (): void => {
    it('should execute', (): void => {
      tile.discover();
    });
  });
});
