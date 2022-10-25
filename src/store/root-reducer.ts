import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { cameraData } from './camera-data/camera-data';
import { camerasData } from './cameras-data/cameras-data';
import { reviewsData } from './reviews-data/reviews-data';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Camera]: cameraData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
});