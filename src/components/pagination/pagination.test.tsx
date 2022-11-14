import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import HistoryRouter from '../history-route/history-route';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();
    history.push('/catalog/4');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination pagesCount={5}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });
  it ('should render corectly page1', () => {
    const history = createMemoryHistory();
    history.push('/catalog/1');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination pagesCount={5}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByAltText('Назад')).not.toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });
});
