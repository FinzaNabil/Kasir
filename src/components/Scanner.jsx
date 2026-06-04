import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';

function Scanner() {

  const [barcode, setBarcode] = useState('');

  const handleScan = () => {

    if(barcode === '') return;

    alert('Barcode berhasil di scan: ' + barcode);

    setBarcode('');
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-[28px] p-5 border border-slate-200"
    >

      <div className="flex items-center gap-3 mb-4">

        <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
          <QrCode size={24} />
        </div>

        <div>

          <h2 className="font-bold">
            Input Barcode
          </h2>

          <p className="text-xs text-slate-400">
            Scan atau ketik barcode
          </p>

        </div>

      </div>

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Masukkan barcode..."
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              handleScan();
            }
          }}
          className="flex-1 bg-slate-100 rounded-2xl px-4 py-4 outline-none text-sm"
        />

        <button
          onClick={handleScan}
          className="bg-blue-600 text-white px-5 rounded-2xl font-bold"
        >
          Scan
        </button>

      </div>

    </motion.div>
  );
}

export default Scanner;