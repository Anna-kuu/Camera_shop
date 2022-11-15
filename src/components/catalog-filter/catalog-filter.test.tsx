import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../history-route/history-route';
import CatalogFilter from './catalog-filter';

describe('Component: CatalogFilter', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogFilter />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByTestId('catalog-filter')).toBeInTheDocument();
  });
});
