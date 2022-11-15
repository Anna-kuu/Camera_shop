import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import HistoryRouter from '../history-route/history-route';
import Preloader from './preloader';

describe('Component: NotFoundScreen', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Preloader />
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByTestId('preloader')).toBeInTheDocument();
  });
});
