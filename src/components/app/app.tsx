import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Camera from '../../pages/camera/camera';
import Catalog from '../../pages/catalog/catalog';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Catalog />}
        />
        <Route
          path={AppRoute.Catalog}
          element={<Catalog />}
        />
        <Route
          path={AppRoute.Camera}
          element={<Camera />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
