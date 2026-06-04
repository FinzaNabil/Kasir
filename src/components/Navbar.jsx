import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, History, QrCode, User } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      icon: <LayoutDashboard size={22} />,
      label: 'Home',
      to: '/',
    },
    {
      icon: <Package size={22} />,
      label: 'Produk',
      to: '/produk',
    },
    {
      icon: <History size={22} />,
      label: 'Riwayat',
      to: '/transaksi',
    },
    {
      icon: <User size={22} />,
      label: 'Akun',
      to: '/akun',
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-[430px] bg-white border-t border-slate-200 px-2 py-3 flex justify-around items-center z-50">
      {menus.slice(0, 2).map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.to)}
          className={`flex flex-col items-center gap-1 ${
            location.pathname === item.to ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          {item.icon}

          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}

      {/* BUTTON SCAN */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/scan')}
        className="bg-blue-600 text-white p-4 rounded-3xl -mt-10 shadow-lg flex flex-col items-center"
      >
        <QrCode size={24} />

        <span className="text-[10px] mt-1 font-medium">Scan</span>
      </motion.button>

      {menus.slice(2).map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.to)}
          className={`flex flex-col items-center gap-1 ${
            location.pathname === item.to ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          {item.icon}

          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
