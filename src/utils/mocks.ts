import { commerce, datatype, image, name } from 'faker';
import { Camera, Cameras } from '../types/cameras-type';
import { Promo } from '../types/promo-type';
import { Review, ReviewPost, Reviews } from '../types/review-type';

export const makeFakeCamera = (): Camera => ({
  id: datatype.number({min: 1, max: 4}),
  name: commerce.productName(),
  vendorCode: datatype.string(),
  type: datatype.string(),
  category: datatype.string(),
  description: commerce.productDescription(),
  level: datatype.string(),
  rating: datatype.number({min: 1, max: 5}),
  price: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number(),
});

export const makeFakeCameras = (): Cameras => (new Array(4).fill(null).map(makeFakeCamera));

export const makeFakePromoCamera = (): Promo => ({
  id: datatype.number({min: 1, max: 4}),
  name: commerce.productName(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});

export const makeFakeReview = (): Review => ({
  id: datatype.string(),
  userName: name.firstName(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  review: datatype.string(),
  rating: datatype.number({min: 1, max: 5}),
  createAt: String(datatype.datetime()),
  cameraId: datatype.number({min: 1, max: 4}),
});

export const makeFakeReviews = (): Reviews => (new Array(10).fill(null).map(makeFakeReview));

export const makeFakeAddReview = (): ReviewPost => ({
  cameraId: datatype.number({min: 1, max: 4}),
  userName: name.firstName(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  review: datatype.string(),
  rating: datatype.number({min: 1, max: 5}),
});
