import { supabase } from "./supabase";
import { uploadQuadraImages } from "./storage";

type CreateQuadraProps = {
  titulo: string;
  descricao: string;
  cidade: string;
  endereco: string;
  preco: string;
  telefone: string;
  tipo_esporte: string;
  fotos: string[];
};

export async function createQuadra({
  titulo,
  descricao,
  cidade,
  endereco,
  preco,
  telefone,
  tipo_esporte,
  fotos,
}: CreateQuadraProps) {
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new Error("Usuário não autenticado.");
  }

  const ownerId = authData.user.id;

  // verifica se existe na tabela Users
  const { data: userExists, error: userError } = await supabase
    .from("Users")
    .select("id")
    .eq("id", ownerId)
    .single();

  // se não existir, cria
  if (!userExists) {
    const { error: insertUserError } = await supabase.from("Users").insert([
      {
        id: ownerId,
        name: "Usuário",
      },
    ]);

    if (insertUserError) {
      throw new Error(
        "Erro ao criar usuário na tabela Users: " + insertUserError.message
      );
    }
  }

  // formatar preço
  const precoFormatado = Number(preco.replace(",", "."));

  if (isNaN(precoFormatado)) {
    throw new Error("Preço inválido.");
  }

  // formatar telefone (somente números)
  const telefoneFormatado = telefone.replace(/\D/g, "");

  // cria quadra
  const { data: quadra, error } = await supabase
    .from("quadras")
    .insert([
      {
        owner_id: ownerId,
        titulo,
        descricao,
        cidade,
        endereco,
        preco: precoFormatado,
        telefone: telefoneFormatado,
        tipo_esporte,
      },
    ])
    .select()
    .single();

  if (error || !quadra) {
    throw new Error("Erro ao criar quadra: " + error?.message);
  }

  // upload das imagens
  if (fotos.length > 0) {
    const urls = await uploadQuadraImages(quadra.id, fotos);
    console.log("URLs geradas:", urls);
    const { error: imgError } = await supabase.from("quadras_imagens").insert(
      urls.map((url) => ({
        quadra_id: quadra.id,
        url,
      }))
    );

    if (imgError) {
      throw new Error("Erro ao salvar imagens: " + imgError.message);
    }
  }

  return quadra;
}