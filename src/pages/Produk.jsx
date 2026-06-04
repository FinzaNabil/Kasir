import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Pencil,
  Trash2,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import Swal from "sweetalert2";
import ModalProduk from "../components/ModalProduk";

function Produk() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // FETCH DATA
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("produk")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;

      setProducts(data);

    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // DELETE
  const handleDelete = async (id) => {

    const result = await Swal.fire({
      title: "Hapus produk?",
      text: "Produk akan dihapus permanen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {

      try {

        const { error } = await supabase
          .from("produk")
          .delete()
          .eq("id", id);

        if (error) throw error;

        Swal.fire({
          title: "Berhasil!",
          text: "Produk dihapus",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchData();

      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // EDIT
  const handleEdit = (item) => {
    setEditData(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Produk
          </h1>

          <p className="text-xs text-slate-400">
            Kelola produk toko
          </p>
        </div>

      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="flex justify-center mt-10">
          Loading...
        </div>
      )}

      {/* LIST PRODUK */}
      <div className="p-5 flex flex-col gap-4">

        {products.map((item) => (

          <motion.div
            key={item.id}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-[28px] border border-slate-200 p-4 shadow-sm"
          >

            <div className="flex items-start justify-between">

              {/* INFO */}
              <div className="flex gap-4">

                <div className="bg-slate-100 p-4 m-4 rounded-2xl text-blue-600">
                  <Package size={24} />
                </div>

                <div>

                  <h2 className="font-bold text-slate-900 text-lg">
                    {item.nama_produk}
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    Rp {item.harga?.toLocaleString()}
                  </p>

                  <div className="mt-3 inline-flex bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
                    Stok: {item.stok}
                  </div>

                </div>

              </div>

              {/* ACTION */}
              <div className="flex gap-2">

                <button
                  onClick={() => handleEdit(item)}
                  className="bg-slate-100 p-3 rounded-xl text-blue-600"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-100 p-3 rounded-xl text-red-500"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

      {/* MODAL */}
      <ModalProduk
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        fetchData={fetchData}
        editData={editData}
      />

    </div>
  );
}

export default Produk;