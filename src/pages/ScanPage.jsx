import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Scanner from '../components/Scanner';
import Swal from 'sweetalert2';
import 'animate.css';

function ScanPage() {
  const [produk, setProduk] = useState([]);
  const [keranjang, setKeranjang] = useState([]);

  const handleBayar = async () => {
    if (keranjang.length === 0) return;

    const dataTransaksi = keranjang.map((item) => ({
      nama_produk: item.nama_produk,
      qty: item.qty,
      total: item.harga * item.qty,
    }));

    const { error } = await supabase.from('transaksi').insert(dataTransaksi);

    if (error) {
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'success',
        title: 'Pembayaran Gagal 😔',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#ff4040',
        color: '#fcc7c3',

        showClass: {
          popup: `
      animate__animated
      animate__bounceInRight
      rounded-full
    `,
        },
        hideClass: {
          popup: `
      animate__animated
      animate__fadeOutRight
    `,
        },
      });
      console.log(error);
      return;
    }

    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'success',
      title: 'Pembayaran berhasil 😎',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: '#2563eb',
      color: '#fff',

      showClass: {
        popup: `
      animate__animated
      animate__bounceInRight
      rounded-full
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutRight
    `,
      },
    });

    setKeranjang([]);
  };

  // AMBIL PRODUK DARI SUPABASE
  const fetchProduk = async () => {
    const { data, error } = await supabase.from('produk').select('*');

    if (data) {
      setProduk(data);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  // TAMBAH KE KERANJANG
  const tambahKeranjang = (item) => {
    const cekProduk = keranjang.find((produk) => produk.id === item.id);

    // kalau produk udah ada
    if (cekProduk) {
      const updateKeranjang = keranjang.map((produk) =>
        produk.id === item.id
          ? {
              ...produk,
              qty: produk.qty + 1,
            }
          : produk
      );

      setKeranjang(updateKeranjang);
    } else {
      // kalau produk belum ada
      setKeranjang([
        ...keranjang,
        {
          ...item,
          qty: 1,
        },
      ]);
    }
  };

  // HITUNG TOTAL
  const total = keranjang.reduce((acc, item) => acc + item.harga * item.qty, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-40">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 px-5 py-4 sticky top-0 z-20">
        <h1 className="text-xl font-black text-blue-600">Scan Barcode</h1>

        <p className="text-xs text-slate-400 mt-1">Kasir cepat via barcode</p>
      </header>

      <main className="p-5 space-y-5">
        {/* SCANNER */}
        <Scanner />

        {/* LIST PRODUK */}
        <div className="space-y-3">
          <h2 className="font-bold text-slate-700">Produk</h2>

          {produk.map((item) => (
            <button
              key={item.id}
              onClick={() => tambahKeranjang(item)}
              className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex justify-between items-center active:scale-95 transition"
            >
              <div className="text-left">
                <h3 className="font-bold text-slate-800">{item.nama_produk}</h3>

                <p className="text-sm text-slate-400">Stok: {item.stok}</p>
              </div>

              <span className="font-bold text-blue-600">
                Rp {item.harga?.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </main>

      {/* TOTAL */}
      <div className="fixed bottom-20 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-slate-200 p-5">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-slate-700">Total</span>

          <span className="text-2xl font-black text-blue-600">
            Rp {total.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handleBayar}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold active:scale-95 transition"
        >
          Bayar
        </button>
      </div>
    </div>
  );
}

export default ScanPage;
