import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import HistoryRouter from '../history-route/history-route';
import PriceRange from './price-range';

describe('Component: PriceRange', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PriceRange />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByTestId('priceUp')).toBeInTheDocument();
    expect(screen.getByTestId('price')).toBeInTheDocument();
  });
});
