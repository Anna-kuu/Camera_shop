import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import { makeFakeCamera } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import ModalAddItem from './modal-add-item';

const camera = makeFakeCamera();

describe('Component: ModalAddItem', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalAddItem selectedCamera={camera} setIsModalAddItemActiv={() => true} setIsModalAddItemSuccess={() => false}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});
