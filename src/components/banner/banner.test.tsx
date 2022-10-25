import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import HistoryRouter from '../history-route/history-route';
import Banner from './banner';

describe('Component: Banner', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Профессиональная камера от известного производителя')).toBeInTheDocument();
  });
});
