import { createContext,useContext, useState, useEffect } from "react";
import { supabase } from '../lib/supabase.js';
import swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ( {children} ) => {
  const [user, setUser] = useState (null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {data: {session}} = await supabase.auth.getSession();
      setUser(session?.user ?? null)
      setLoading(false);
    };
    checkSession();

    // Pantau login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  //Fungsi Login
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({email,password})
    if (error) throw error;
    return data;
  }

  //Fungsi Register
  const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({email,password})
    if (error) throw error;
    return data;
  }

  //Fungsi Logout 
  const logout = async (email, password) => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error;
    swal.fire({title: 'Berhasil logout', icon: 'success', timer: 1500,
      showConfirmButton: false})
  }

  return(
    <AuthContext.Provider value={{user,login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}

