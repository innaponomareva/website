import { Routes, Route, Navigate, HashRouter } from 'react-router';
import Start from './pages/Start';
import About from './pages/About';
import Contact from './pages/Contact';
import { RouteTypes } from './hooks/usePage';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<Start />} />
        <Route path={RouteTypes.ABOUT} element={<About />} />
        <Route path={RouteTypes.CONTACT} element={<Contact />} />
        <Route path={RouteTypes.NOT_FOUND} element={<NotFound />} />
        <Route
          path="*"
          element={<Navigate to={RouteTypes.NOT_FOUND} replace />}
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
