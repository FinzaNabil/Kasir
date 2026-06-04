import { useEffect, useState } from 'react';
import { LogOut, Mail, User2, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

function Akun() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const getUser = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 px-5 py-4 sticky top-0 z-20">

        <h1 className="text-2xl font-black text-blue-600">
          Akun
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Profil pengguna
        </p>

      </header>

      <main className="p-5 space-y-5">

        {/* PROFILE */}
        <div className="bg-blue-600 rounded-[32px] p-6 text-white shadow-lg">

          <div className="flex items-center gap-4">

            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">

              <User2 size={40} />

            </div>

            <div>

              <h2 className="text-2xl font-black">
                {user?.email?.split('@')[0]}
              </h2>

              <p className="text-blue-100 text-sm mt-1">
                Administrator
              </p>

            </div>

          </div>

        </div>

        {/* EMAIL */}
        <div className="bg-white border border-slate-200 rounded-[28px] p-5 flex items-center gap-4">

          <div className="bg-slate-100 p-3 rounded-2xl text-blue-600">
            <Mail size={22} />
          </div>

          <div>

            <h3 className="font-bold text-slate-800">
              Email
            </h3>

            <p className="text-sm text-slate-400">
              {user?.email}
            </p>

          </div>

        </div>

        {/* ROLE */}
        <div className="bg-white border border-slate-200 rounded-[28px] p-5 flex items-center gap-4">

          <div className="bg-slate-100 p-3 rounded-2xl text-blue-600">
            <ShieldCheck size={22} />
          </div>

          <div>

            <h3 className="font-bold text-slate-800">
              Role
            </h3>

            <p className="text-sm text-slate-400">
              Admin Kasir
            </p>

          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-4 rounded-[28px] font-bold active:scale-95 transition"
        >
          Logout
        </button>

      </main>

    </div>
  );
}

export default Akun;