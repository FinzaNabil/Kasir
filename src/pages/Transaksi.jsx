import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Receipt, CalendarDays } from 'lucide-react';

function Transaksi() {

  const [transaksi, setTransaksi] = useState([]);

  // AMBIL DATA TRANSAKSI
  const fetchTransaksi = async () => {

    const { data, error } = await supabase
      .from('transaksi')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setTransaksi(data);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-28">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 px-5 py-4 sticky top-0 z-20">

        <h1 className="text-2xl font-black text-blue-600">
          Riwayat
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Histori pembayaran kasir
        </p>

      </header>

      <main className="p-5 space-y-4">

        {transaksi.length === 0 ? (

          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">

            <Receipt
              size={50}
              className="mx-auto text-slate-300 mb-4"
            />

            <h2 className="font-bold text-slate-700">
              Belum ada transaksi
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Riwayat pembayaran akan muncul di sini
            </p>

          </div>

        ) : (

          transaksi.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-[28px] border border-slate-200 p-5 shadow-sm"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="font-bold text-slate-800 text-lg">
                    {item.nama_produk}
                  </h2>

                  <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">

                    <CalendarDays size={14} />

                    <span>
                      {new Date(item.created_at).toLocaleString('id-ID')}
                    </span>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-sm text-slate-400">
                    Qty: {item.qty}
                  </p>

                  <h3 className="font-black text-blue-600 text-lg mt-1">
                    Rp {item.total?.toLocaleString()}
                  </h3>

                </div>

              </div>

            </div>

          ))

        )}

      </main>

    </div>
  );
}

export default Transaksi;