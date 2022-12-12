import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import HistoryRouter from '../history-route/history-route';
import ModalBasketSuccess from './modal-basket-success';

describe('Component: ModalBasketSuccess', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalBasketSuccess setIsModalBasketSuccess={() => true}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
  });
});
