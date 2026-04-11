import { supabase } from "../../../services/supabase";

async function login(email: string, senha: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: senha,
  });

  if (error) {
    alert("Erro: " + error.message);
    return;
  }

  console.log("Logado:", data);
  alert("Login realizado!");
}

export { login };