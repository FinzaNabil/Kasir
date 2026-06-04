import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ScanPage from './pages/ScanPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Produk from './pages/Produk';
import Laporan from './pages/Laporan';
import Transaksi from './pages/Transaksi';
import Navbar from './components/Navbar';
import { useAuth } from './hooks/useAuth';
import Akun from './pages/Akun';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[430px] bg-gray-50 min-h-screen relative shadow-2xl border border-gray-200 overflow-hidden">
          <Routes>
            {/* PUBLIC */}
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />

            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <Register />}
            />

            {/* PRIVATE */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/scan"
              element={
                <PrivateRoute>
                  <ScanPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/produk"
              element={
                <PrivateRoute>
                  <Produk />
                </PrivateRoute>
              }
            />

            <Route
              path="/laporan"
              element={
                <PrivateRoute>
                  <Laporan />
                </PrivateRoute>
              }
            />

            <Route
              path="/transaksi"
              element={
                <PrivateRoute>
                  <Transaksi />
                </PrivateRoute>
              }
            />

            <Route
              path="/akun"
              element={
                <PrivateRoute>
                  <Akun />
                </PrivateRoute>
              }
            />
          </Routes>

          {/* NAVBAR */}
          {user && <Navbar />}
        </div>
      </div>
    </Router>
  );
}

export default App;
