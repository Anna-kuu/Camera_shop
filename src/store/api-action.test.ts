import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state-type';
import { Action } from 'redux';
import { APIRoute } from '../const';
import { makeFakeAddReview, makeFakeCamera, makeFakeCameras, makeFakePromoCamera, makeFakeReviews } from '../utils/mocks';
import { addReviewAction, fetchCameraByIdAction, fetchCamerasAction, fetchPromoCameraAction, fetchReviewsAction, fetchSimilarCamerasAction } from './api-actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);
  it('should dispatch fetchCamerasAction when GET /cameras', async () => {
    const mockCameras = makeFakeCameras();
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, mockCameras);

    const store = mockStore();

    await store.dispatch(fetchCamerasAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchPromoCameraAction when GET /promo', async () => {
    const mockPromo = makeFakePromoCamera();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockPromo);

    const store = mockStore();

    await store.dispatch(fetchPromoCameraAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoCameraAction.pending.type,
      fetchPromoCameraAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchCameraByIdAction when GET /cameras/id', async () => {
    const mockCameraById = makeFakeCamera();
    const id = Number(mockCameraById.id);
    mockAPI
      .onGet(`${APIRoute.Cameras}/${id}`)
      .reply(200, mockCameraById);

    const store = mockStore();

    await store.dispatch(fetchCameraByIdAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCameraByIdAction.pending.type,
      fetchCameraByIdAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchSimilarCamerasAction when GET /cameras/id/similar', async () => {
    const mockCameraById = makeFakeCamera();
    const id = Number(mockCameraById.id);
    const mockSimilarCameras = makeFakeCameras();
    mockAPI
      .onGet(`${APIRoute.Cameras}/${id}/similar`)
      .reply(200, mockSimilarCameras);

    const store = mockStore();

    await store.dispatch(fetchSimilarCamerasAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      fetchSimilarCamerasAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /cameras/id/reviews', async () => {
    const mockCameraById = makeFakeCamera();
    const id = Number(mockCameraById.id);
    const mockReviews = makeFakeReviews();
    mockAPI
      .onGet(`${APIRoute.Cameras}/${id}/reviews`)
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });
  it('should dispatch addReviewAction when POST /reviews', async () => {
    const mockReview = makeFakeAddReview();

    mockAPI
      .onPost(APIRoute.Review)
      .reply(200, []);

    const store = mockStore();

    await store.dispatch(addReviewAction(mockReview));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      fetchReviewsAction.pending.type,
      addReviewAction.fulfilled.type,
    ]);
  });
});
