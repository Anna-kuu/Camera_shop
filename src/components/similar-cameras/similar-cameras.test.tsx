import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import { makeFakeCamera, makeFakeCameras } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import SimilarCameras from './similar-cameras';

const cameras = makeFakeCameras();
const camera = makeFakeCamera();
describe('Component: SimilarCameras', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();
    history.push('/cameras/3');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarCameras similarCameras={cameras} setSelectedCamera={() => camera} setIsModalAddItemActive={() => false}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
  });
});
