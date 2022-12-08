import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Camera } from '../../types/cameras-type';
import { BasketData } from '../../types/state-type';

const initialState: BasketData = {
  camerasInBasket: [],
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addCameraToBasket: (state, action: PayloadAction<Camera>) => {
      const index = state.camerasInBasket.findIndex(({camera}) => camera.id === action.payload.id);
      if (index >= 0) {
        state.camerasInBasket[index].cameraCount++;
        return;
      }
      state.camerasInBasket.push({
        camera: action.payload,
        cameraCount: 1,
      });
    },
    changeCameraCount: (state, action) => {
      const index = state.camerasInBasket.findIndex(({camera}) => camera.id === action.payload.id);
      state.camerasInBasket[index].cameraCount = action.payload.value;
    }
  },
});
export const {addCameraToBasket, changeCameraCount} = basketData.actions;
