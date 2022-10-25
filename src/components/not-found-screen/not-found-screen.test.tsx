import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import NotFoundScreen from './not-found-screen';

describe('Component: NotFoundScreen', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundScreen />
      </HistoryRouter>
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
