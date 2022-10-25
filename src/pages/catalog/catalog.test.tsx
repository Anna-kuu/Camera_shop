import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { store } from '../../utils/mock-store';
import Catalog from './catalog';

describe('Component: CatalogScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });
});
