import { DataLoadingStatus, DEFAULT_DISCOUNT } from '../../const';
import { BasketData, } from '../../types/state-type';
import { makeFakeCamera } from '../../utils/mocks';
import { couponPost, orderPost } from '../api-actions';
import { addCameraToBasket, basketData, changeCameraCount, changeOrderPostLoadingStatus, removeCamera } from './basket-data';

const camera = makeFakeCamera();

describe('Reducer: basketData', () => {
  let state: BasketData;

  beforeEach(() => {
    state = {
      camerasInBasket: [],
      discount: DEFAULT_DISCOUNT,
      discountLoadingStatus: DataLoadingStatus.Idle,
      orderPostLoadingStatus: DataLoadingStatus.Idle,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(basketData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('couponPost test', () => {
    it('should update discount by load coupon', () => {
      expect(basketData.reducer(state, {type: couponPost.fulfilled.type, payload: 20}))
        .toEqual({
          camerasInBasket: [],
          discount: 20,
          discountLoadingStatus: DataLoadingStatus.Fulfilled,
          orderPostLoadingStatus: DataLoadingStatus.Idle,
        });
    });
    it('should update discount by rejected coupon', () => {
      expect(basketData.reducer(state, {type: couponPost.rejected.type,}))
        .toEqual({
          camerasInBasket: [],
          discount: DEFAULT_DISCOUNT,
          discountLoadingStatus: DataLoadingStatus.Rejected,
          orderPostLoadingStatus: DataLoadingStatus.Idle,
        });
    });
  });

  describe('orderPost test', () => {

    it('should update orderPostLoadingStatus status if fulfilled.type', () => {
      expect(basketData.reducer(state, {type: orderPost.fulfilled.type}))
        .toEqual({
          camerasInBasket: [],
          discount: DEFAULT_DISCOUNT,
          discountLoadingStatus: DataLoadingStatus.Idle,
          orderPostLoadingStatus: DataLoadingStatus.Fulfilled,
        });
    });
    it('should update orderPostLoadingStatus status if rejected.type', () => {
      expect(basketData.reducer(state, {type: orderPost.rejected.type}))
        .toEqual({
          camerasInBasket: [],
          discount: DEFAULT_DISCOUNT,
          discountLoadingStatus: DataLoadingStatus.Idle,
          orderPostLoadingStatus: DataLoadingStatus.Rejected,
        });
    });
  });
  describe('reducer test', () => {
    it('should add camera to basket', () => {
      expect(basketData.reducer(state, addCameraToBasket(camera)))
        .toEqual({
          camerasInBasket: [{
            camera: camera,
            cameraCount: 1,
          }],
          discount: DEFAULT_DISCOUNT,
          discountLoadingStatus: DataLoadingStatus.Idle,
          orderPostLoadingStatus: DataLoadingStatus.Idle,
        });
    });
    it('should reset camera count', () => {
      expect(basketData.reducer({...state, camerasInBasket: [{camera: camera, cameraCount: 1}]}, changeCameraCount({id: camera.id, value: 5})))
        .toEqual({
          camerasInBasket: [{
            camera: camera,
            cameraCount: 5,
          }],
          discount: DEFAULT_DISCOUNT,
          discountLoadingStatus: DataLoadingStatus.Idle,
          orderPostLoadingStatus: DataLoadingStatus.Idle,
        });
    });
    it('should remove camera', () => {
      expect(basketData.reducer(state, removeCamera(camera)))
        .toEqual({
          camerasInBasket: [],
          discount: DEFAULT_DISCOUNT,
          discountLoadingStatus: DataLoadingStatus.Idle,
          orderPostLoadingStatus: DataLoadingStatus.Idle,
        });
    });
    it('should change orderPostLoadingStatus', () => {
      expect(basketData.reducer(state, changeOrderPostLoadingStatus(DataLoadingStatus.Pending)))
        .toEqual({
          camerasInBasket: [],
          discount: DEFAULT_DISCOUNT,
          discountLoadingStatus: DataLoadingStatus.Idle,
          orderPostLoadingStatus: DataLoadingStatus.Pending,
        });
    });
  });
});
