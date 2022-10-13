export const MAX_RATING = 5;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  Camera = '/cameras/:id',
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Camera = 'CAMERA',
  Reviews = 'REVIEWS',
}
