import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import Swal from 'sweetalert2';

const ModalProduk = ({ isOpen, onClose, fetchData, editData }) => {
  const [formData, setFormData] = useState({
    nama_produk: '',
    harga: '',
    stok: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // isi otomatis saat edit
  useEffect(() => {
    if (editData) {
      setFormData({
        nama_produk: editData.nama_produk || '',
        harga: editData.harga || '',
        stok: editData.stok || '',
      });
    } else {
      setFormData({
        nama_produk: '',
        harga: '',
        stok: '',
      });
    }
  }, [editData]);

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // EDIT
      if (editData) {
        const { error } = await supabase
          .from('produk')
          .update({
            nama_produk: formData.nama_produk,
            harga: parseInt(formData.harga),
            stok: parseInt(formData.stok),
          })
          .eq('id', editData.id);

        if (error) throw error;

        Swal.fire({
          title: 'Berhasil!',
          text: 'Produk berhasil diupdate',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // TAMBAH
        const { error } = await supabase.from('produk').insert([
          {
            nama_produk: formData.nama_produk,
            harga: parseInt(formData.harga),
            stok: parseInt(formData.stok),
          },
        ]);

        if (error) throw error;

        Swal.fire({
          title: 'Berhasil!',
          text: 'Produk berhasil ditambahkan',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }

      if (fetchData) {
        fetchData();
      }

      onClose();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6">
        <h2 className="text-2xl font-black mb-5">
          {editData ? 'Edit Produk' : 'Tambah Produk'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* NAMA */}
          <div>
            <label className="text-sm text-slate-500">Nama Produk</label>

            <input
              type="text"
              name="nama_produk"
              required
              value={formData.nama_produk}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-2xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Indomie"
            />
          </div>

          {/* HARGA */}
          <div>
            <label className="text-sm text-slate-500">Harga</label>

            <input
              type="number"
              name="harga"
              required
              value={formData.harga}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-2xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: 3000"
            />
          </div>

          {/* STOK */}
          <div>
            <label className="text-sm text-slate-500">Stok</label>

            <input
              type="number"
              name="stok"
              required
              value={formData.stok}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-2xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: 10"
            />
          </div>

          {/* BUTTON */}
          <div className="flex gap-3 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 py-3 rounded-2xl font-bold"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-2xl font-bold"
            >
              {isLoading ? 'Menyimpan...' : editData ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProduk;
