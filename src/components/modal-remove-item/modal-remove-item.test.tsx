import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import { makeFakeCamera } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import ModalRemoveItem from './modal-remove-item';

const camera = makeFakeCamera();

describe('Component: ModalRemoveItem', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalRemoveItem selectedCamera={camera} setIsModalRemoveActive={() => true}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
  });
});
