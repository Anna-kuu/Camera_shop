import { DataLoadingStatus } from '../../const';
import { CamerasData } from '../../types/state-type';
import { makeFakeCameras} from '../../utils/mocks';
import { fetchCamerasAction, fetchCamerasByNameAction, fetchCamerasMinMaxPrice } from '../api-actions';
import { camerasData } from './cameras-data';

const cameras = makeFakeCameras();

describe('Reducer: camerasData', () => {
  let state: CamerasData;

  beforeEach(() => {
    state = {
      cameras: [],
      dataLoadingStatus: DataLoadingStatus.Idle,
      camerasCount: 0,
      camerasByName: [],
      minPriceOfCameras: 0,
      maxPriceOfCameras: 0,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(camerasData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchCamerasAction test', () => {
    it('should update cameras by load cameras', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: {data: cameras, camerasCount: '6'}}))
        .toEqual({
          cameras: cameras,
          dataLoadingStatus: DataLoadingStatus.Fulfilled,
          camerasCount: 6,
          camerasByName: [],
          minPriceOfCameras: 0,
          maxPriceOfCameras: 0,
        });
    });
    it('should update DataLoadingStatus pending', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasAction.pending.type}))
        .toEqual({
          cameras: [],
          dataLoadingStatus: DataLoadingStatus.Pending,
          camerasCount: 0,
          camerasByName: [],
          minPriceOfCameras: 0,
          maxPriceOfCameras: 0,
        });
    });
    it('should update DataLoadingStatus rejected', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasAction.rejected.type}))
        .toEqual({
          cameras: [],
          dataLoadingStatus: DataLoadingStatus.Rejected,
          camerasCount: 0,
          camerasByName: [],
          minPriceOfCameras: 0,
          maxPriceOfCameras: 0,
        });
    });
  });
  describe('fetchCamerasByNameAction test', () => {
    it('should update camerasByName by load camerasByName', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasByNameAction.fulfilled.type, payload: cameras}))
        .toEqual({
          cameras: [],
          dataLoadingStatus: DataLoadingStatus.Idle,
          camerasCount: 0,
          camerasByName: cameras,
          minPriceOfCameras: 0,
          maxPriceOfCameras: 0,
        });
    });
  });
  describe('fetchCamerasMinMaxPrice test', () => {
    it('should update min and max price', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasMinMaxPrice.fulfilled.type, payload: {minPriceOfCameras: 10, maxPriceOfCameras: 90}}))
        .toEqual({
          cameras: [],
          dataLoadingStatus: DataLoadingStatus.Idle,
          camerasCount: 0,
          camerasByName: [],
          minPriceOfCameras: 10,
          maxPriceOfCameras: 90,
        });
    });
  });
});
