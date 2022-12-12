import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { makeFakeCamera } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import CameraInBasket from './camera-in-basket';

const camera = makeFakeCamera();
describe('Component: CameraInBasket', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();
    history.push('/basket');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CameraInBasket camera={camera} cameraCount={1} setIsModalRemoveActive={() => false} setSelectedCamera={() => camera} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket-item')).toBeInTheDocument();
  });
});
