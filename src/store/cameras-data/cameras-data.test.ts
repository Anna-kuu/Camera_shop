import { Promo } from '../../types/promo-type';
import { CamerasData } from '../../types/state-type';
import { makeFakeCameras, makeFakePromoCamera } from '../../utils/mocks';
import { fetchCamerasAction, fetchPromoCameraAction } from '../api-actions';
import { camerasData } from './cameras-data';

const cameras = makeFakeCameras();
const promo = makeFakePromoCamera();

describe('Reducer: camerasData', () => {
  let state: CamerasData;

  beforeEach(() => {
    state = {
      cameras: [],
      promo: {} as Promo,
      isDataLoaded: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(camerasData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchCamerasAction test', () => {
    it('should update cameeras by load cameras', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: cameras}))
        .toEqual({
          cameras: cameras,
          promo: {} as Promo,
          isDataLoaded: false,
        });
    });
  });

  describe('fetchPromoCameraAction test', () => {
    it('should update promo by load prromo', () => {
      expect(camerasData.reducer(state, {type: fetchPromoCameraAction.fulfilled.type, payload: promo}))
        .toEqual({
          cameras: [],
          promo: promo,
          isDataLoaded: false,
        });
    });
  });
});
