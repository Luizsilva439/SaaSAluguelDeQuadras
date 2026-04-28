import { supabase } from "./supabase";

export async function simularPagamento(
  userId: string,
  ownerId: string,
  valor: number
) {
  // pega saldo do usuário
  const { data: pagador, error: pagadorError } = await supabase
    .from("Users")
    .select("saldo")
    .eq("id", userId)
    .single();

  if (pagadorError) throw new Error("Erro ao buscar saldo do usuário.");

  const saldoAtual = pagador.saldo || 0;

  if (saldoAtual < valor) {
    throw new Error("Saldo insuficiente.");
  }

  // desconta do pagador
  const { error: updatePagadorError } = await supabase
    .from("Users")
    .update({ saldo: saldoAtual - valor })
    .eq("id", userId);

  if (updatePagadorError) throw new Error("Erro ao descontar saldo.");

  // pega saldo do dono
  const { data: dono, error: donoError } = await supabase
    .from("Users")
    .select("saldo")
    .eq("id", ownerId)
    .single();

  if (donoError) throw new Error("Erro ao buscar saldo do dono.");

  const saldoDono = dono.saldo || 0;

  // soma no dono
  const { error: updateDonoError } = await supabase
    .from("Users")
    .update({ saldo: saldoDono + valor })
    .eq("id", ownerId);

  if (updateDonoError) throw new Error("Erro ao adicionar saldo ao dono.");

  return true;
}