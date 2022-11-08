export const MAX_RATING = 5;
export const PAGE_STEP = 1;
export const PAGE_DEFAULT = 1;
export const MAX_CAMERAS_OF_PAGE = 9;
export const SLIDER_STEP = 3;
export const SLIDER_DEFAULT = 0;
export const REVIEWS_COUNT_DEFAULT = Number(3);
export const REVIEWS_COUNT_STEP = 3;
export const CAMERAS_COUNT_DEFAULT = 0;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/:pageId',
  Camera = '/cameras/:id',
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Catalog = '/catalog',
  Review = '/reviews',
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Camera = 'CAMERA',
  Reviews = 'REVIEWS',
  Promo = 'PROMO',
}

export const RatingTitle: {[key: number]: string} = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
} as const;

export enum CameraTabs {
  Specification = 'specification',
  Description = 'description',
}

export enum dataLoadingStatus {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected'
}

export const QueryParams = {
  Limit: '_limit',
  Page: '_page',
  NameLike: 'name_like',
  Sort: '_sort',
  Order: '_order',
} as const;

export const SortType = {
  Price: 'price',
  Rating: 'rating',
} as const;

export const OrderType = {
  Desc: 'desc',
  Asc: 'asc',
} as const;
