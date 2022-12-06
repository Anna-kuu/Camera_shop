import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { basketData } from './basket-data/basket-data';
import { cameraData } from './camera-data/camera-data';
import { camerasData } from './cameras-data/cameras-data';
import { promoData } from './promo-data/promo-data';
import { reviewsData } from './reviews-data/reviews-data';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Camera]: cameraData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Basket]: basketData.reducer,
});
