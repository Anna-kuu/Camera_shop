import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { store } from '../../utils/mock-store';
import Camera from './camera';

describe('Component: Camera', () => {
  it('should render correctly', async () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Camera />
        </Provider>
      </HistoryRouter>,
    );
    const SimilarCamerasScreen = await screen.findByText('Похожие товары');
    expect(SimilarCamerasScreen).toBeInTheDocument();
  });
});
