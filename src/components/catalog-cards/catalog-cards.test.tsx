import { MAX_CAMERAS_OF_PAGE, PAGE_STEP } from '../../const';

describe('Component: CatalogCards', () => {
  it ('should return rigth number page', () => {
    const pageId = 3;
    const startArrayIndex = MAX_CAMERAS_OF_PAGE * (pageId - PAGE_STEP);
    expect(startArrayIndex).toBe(18);
  });
});
