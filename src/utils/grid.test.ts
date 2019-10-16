import Grid from './grid';

const TEST_VALUE = 'test value';
const TEST_VALUE_2 = 'test value 2';
const TEST_X = 10;
const TEST_Y = 10;

describe('Grid', (): void => {
  it('should instantiate', (): void => {
    new Grid();
  });

  let grid: Grid<string>;
  beforeEach((): void => {
    grid = new Grid<string>();
  });
  
  it('should get and set values', (): void => {
    grid.set(TEST_X, TEST_Y, TEST_VALUE);

    expect(grid.get(TEST_X, TEST_Y)).toBe(TEST_VALUE);
  });

  describe('setIfEmpty', (): void => {
    it('should set if empty', (): void => {
      grid.setIfEmpty(TEST_X, TEST_Y, TEST_VALUE);

      expect(grid.get(TEST_X, TEST_Y)).toBe(TEST_VALUE);
    });

    it('should not set if not empty', (): void => {
      grid.set(TEST_X, TEST_Y, TEST_VALUE_2);
      grid.setIfEmpty(TEST_X, TEST_Y, TEST_VALUE);
      expect(grid.get(TEST_X, TEST_Y)).toBe(TEST_VALUE);
      expect(grid.get(TEST_X, TEST_Y)).not.toBe(TEST_VALUE_2);
    });
  });
});
