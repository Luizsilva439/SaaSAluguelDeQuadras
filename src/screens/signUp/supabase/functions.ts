import { supabase } from "../../../services/supabase";


type singUpData = {
    email: string;
    senha: string;
    nome: string;
}

async function registrar({ email, senha, nome }: singUpData) {
  // 1 - cria usuário no Auth
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: senha,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  // 2 - cria profile na tabela profiles
  const { error: errorProfile } = await supabase
    .from("Users")
    .insert([
      {
        id: user?.id,
        name: nome,
        email: email,
      },
    ]);

  if (errorProfile) {
    alert("Erro ao salvar perfil: " + errorProfile.message);
    return;
  }

  alert("Conta criada com sucesso!");

}

export { registrar };