import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import HistoryRouter from '../history-route/history-route';
import Footer from './footer';

describe('Component: Footer', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Footer />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Интернет-магазин фото- и видеотехники')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
  });
});
