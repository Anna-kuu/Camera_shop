import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { APIRoute, AppRoute } from '../../const';
import Camera from '../../pages/camera/camera';
import Catalog from '../../pages/catalog/catalog';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Navigate to = {APIRoute.Catalog} />}
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
