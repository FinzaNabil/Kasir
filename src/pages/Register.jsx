import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(email, password);
      Swal.fire({
        title: 'Berhasil Daftar!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/login');
    } catch (error) {
      Swal.fire({
        title: 'Gagal Daftar!',
        icon: 'error',
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-emerald">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm">
        {/* Judul */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">💸</div>
          <h2 className="text-2xl font-bold text-gray-800">Daftar Brankas</h2>
        </div>

        {/* From regis nya */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition disabled"
          >
            {isLoading ? 'Mendaftarkan' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Sudah punya akun?
          <Link
            to="/login"
            className="text-emerald-500 font-bold hover:underline"
          >
            Masuk Disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
