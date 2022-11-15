import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import HistoryRouter from '../history-route/history-route';
import ErrorScreen from './error-screen';

describe('Component: ErrorScreen', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <ErrorScreen />
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Samething went wrong')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
