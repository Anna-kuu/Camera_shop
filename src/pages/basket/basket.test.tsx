import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { store } from '../../utils/mock-store';
import Basket from './basket';

describe('Component: Basket', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Basket />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('basket')).toBeInTheDocument();
  });
});
