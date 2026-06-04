import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ModalProduk from '../components/ModalProduk';
import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  History,
  BarChart3,
  QrCode,
  User,
  Bell,
  Search,
  ArrowUpRight,
  Wallet,
} from 'lucide-react';

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const chartData = [40, 60, 45, 90, 75, 65, 80];

  return (
    <div className="relative min-h-screen bg-slate-50 pb-24 overflow-hidden flex flex-col text-slate-900">
      {/* HEADER */}
      <header className="px-5 py-4 flex justify-between items-center sticky top-0 z-20 bg-white border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-blue-600">
            e<span className="text-slate-900">Cashier</span>
          </h1>

          <p className="text-xs text-slate-400">Smart POS System</p>
        </div>

        <div className="flex gap-2">
          <button className="p-3 bg-slate-100 rounded-xl text-slate-500">
            <Search size={20} />
          </button>

          <button className="p-3 bg-slate-100 rounded-xl text-slate-500 relative">
            <Bell size={20} />

            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-5 pt-5 overflow-y-auto">
        {/* CARD PENJUALAN */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 p-6 rounded-[28px] text-white shadow-lg mb-7"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-blue-100 text-xs mb-1">Total Penjualan</p>

              <h1 className="text-3xl font-black">Rp 1.450.000</h1>
            </div>

            <div className="bg-white/20 p-3 rounded-2xl">
              <Wallet size={22} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white px-3 py-2 rounded-xl flex items-center gap-2">
              <ArrowUpRight size={16} className="text-blue-600" />

              <span className="text-blue-600 text-sm font-bold">+12%</span>
            </div>

            <p className="text-blue-100 text-xs">
              Penjualan meningkat hari ini
            </p>
          </div>
        </motion.div>

        {/* STATISTIK */}
        <section className="mb-7">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Statistik</h2>

            <span className="text-xs text-blue-600 font-semibold">
              Minggu Ini
            </span>
          </div>

          <div className="bg-white rounded-[28px] p-6 border border-slate-200 h-44 flex items-end justify-between gap-3">
            {chartData.map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                  }}
                  className={`w-full rounded-full ${
                    i === 3 ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />

                <span className="text-[10px] text-slate-400 font-semibold">
                  {['S', 'S', 'R', 'K', 'J', 'S', 'M'][i]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FITUR CEPAT */}
        <section>
          <h2 className="font-bold text-lg mb-4">Fitur</h2>

          <div className="grid grid-cols-2 gap-4 mt-2">
            {/* TAMBAH PRODUK */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-white rounded-[28px] p-6 flex flex-col items-center gap-3 border border-slate-200"
            >
              <div className="bg-slate-100 p-4 rounded-2xl text-blue-600">
                <Package size={28} />
              </div>

              <div className="text-center">
                <h3 className="font-bold text-sm">Tambah Produk</h3>

                <p className="text-xs text-slate-400">Input barang baru</p>
              </div>
            </motion.button>

            {/* LAPORAN */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="bg-white rounded-[28px] p-6 flex flex-col items-center gap-3 border border-slate-200"
            >
              <div className="bg-slate-100 p-4 rounded-2xl text-blue-600">
                <BarChart3 size={28} />
              </div>

              <div className="text-center">
                <h3 className="font-bold text-sm">Laporan</h3>

                <p className="text-xs text-slate-400">Statistik penjualan</p>
              </div>
            </motion.button>
          </div>
        </section>
      </main>

     <ModalProduk 
     isOpen={isModalOpen} 
     onClose={() => setIsModalOpen(false)} 
     />
    </div>
  );
}

export default Dashboard;