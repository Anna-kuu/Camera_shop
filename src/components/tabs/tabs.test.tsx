import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import { makeFakeCamera } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import Tabs from './tabs';

const camera = makeFakeCamera();

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Tabs camera={camera} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(camera.description)).toBeInTheDocument();
  });
});
