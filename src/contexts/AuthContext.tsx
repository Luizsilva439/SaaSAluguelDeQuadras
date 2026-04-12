import { createContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

type AuthContextType = {
  session: any;
  userName: string | null;
  email: string | null;
  created_at: string | null;
  loading: boolean;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: any) {
  const [session, setSession] = useState<any>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [created_at, setCreatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUserProfile(sessionData: any) {
    if (!sessionData?.user?.id) return;

    const userId = sessionData.user.id;

    // pega email do auth
    setEmail(sessionData.user.email || null);

    // pega nome e data na tabela Users
    const { data, error } = await supabase
      .from("Users")
      .select("name, created_at")
      .eq("id", userId)
      .single();

    if (error) {
      console.log("Erro ao buscar dados:", error.message);
      return;
    }

    setUserName(data?.name || null);
    setCreatedAt(data?.created_at || null);
  }

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getSession();

      setSession(data.session);

      if (data.session) {
        await loadUserProfile(data.session);
      }

      setLoading(false);
    }

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, sessionData) => {
        setSession(sessionData);

        if (sessionData) {
          await loadUserProfile(sessionData);
        } else {
          setUserName(null);
          setEmail(null);
          setCreatedAt(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setSession(null);
    setUserName(null);
    setEmail(null);
    setCreatedAt(null);
  }

  return (
    <AuthContext.Provider
      value={{ session, userName, email, created_at, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}