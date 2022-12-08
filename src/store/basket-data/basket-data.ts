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
    changeCameraCount: (state, action: PayloadAction<{id: number; value: number}>) => {
      const index = state.camerasInBasket.findIndex(({camera}) => camera.id === action.payload.id);
      state.camerasInBasket[index].cameraCount = action.payload.value;
    },
    removeCamera: (state, action: PayloadAction<Camera>) => {
      state.camerasInBasket = state.camerasInBasket.filter(({camera}) => camera.id !== action.payload.id);
    },
  },
});
export const {addCameraToBasket, changeCameraCount, removeCamera} = basketData.actions;
