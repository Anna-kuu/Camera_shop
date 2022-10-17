export const MAX_RATING = 5;
export const PAGE_STEP = 1;
export const PAGE_DEFAULT = 1;
export const MAX_CAMERAS_OF_PAGE = 9;
export const SLIDER_STEP = 3;
export const SLIDER_DEFAULT = 0;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/:pageId',
  Camera = '/cameras/:id',
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Catalog = '/catalog/1',
  Catalog2 = '/catalog'
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Camera = 'CAMERA',
  Reviews = 'REVIEWS',
}
