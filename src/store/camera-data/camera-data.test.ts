import { DataLoadingStatus } from '../../const';
import { Camera } from '../../types/cameras-type';
import { CameraData } from '../../types/state-type';
import { makeFakeCamera, makeFakeCameras } from '../../utils/mocks';
import { fetchCameraByIdAction, fetchSimilarCamerasAction } from '../api-actions';
import { cameraData } from './camera-data';

const similarCameras = makeFakeCameras();
const camera = makeFakeCamera();

describe('Reducer: cameraData', () => {
  let state: CameraData;

  beforeEach(() => {
    state = {
      camera: {} as Camera,
      similarCameras: [],
      dataLoadingStatus: DataLoadingStatus.Idle,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(cameraData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchCameraByIdAction test', () => {
    it('should update camera by load camera', () => {
      expect(cameraData.reducer(state, {type: fetchCameraByIdAction.fulfilled.type, payload: camera}))
        .toEqual({
          camera: camera,
          similarCameras: [],
          dataLoadingStatus: DataLoadingStatus.Fulfilled,
        });
    });
    it('should update DataLoadingStatus pending', () => {
      expect(cameraData.reducer(state, {type: fetchCameraByIdAction.pending.type}))
        .toEqual({
          camera: {} as Camera,
          similarCameras: [],
          dataLoadingStatus: DataLoadingStatus.Pending,
        });
    });
    it('should update DataLoadingStatus rejected', () => {
      expect(cameraData.reducer(state, {type: fetchCameraByIdAction.rejected.type}))
        .toEqual({
          camera: {} as Camera,
          similarCameras: [],
          dataLoadingStatus: DataLoadingStatus.Rejected,
        });
    });
  });

  describe('fetchSimilarCamerasAction test', () => {
    it('should update similarCameras by load similarCameras', () => {
      expect(cameraData.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: similarCameras}))
        .toEqual({
          camera: {} as Camera,
          similarCameras: similarCameras,
          dataLoadingStatus: DataLoadingStatus.Idle,
        });
    });
  });
});
