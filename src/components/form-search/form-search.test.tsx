import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import HistoryRouter from '../history-route/history-route';
import FormSearch from './form-search';

describe('Component: FoormSearch', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FormSearch />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('form-search')).toBeInTheDocument();
  });
});
