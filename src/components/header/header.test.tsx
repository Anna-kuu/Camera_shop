import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import HistoryRouter from '../history-route/history-route';
import Header from './header';

describe('Component: Header', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
  });
});
