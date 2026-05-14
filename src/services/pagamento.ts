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

export async function processarReembolso(
  reservaId: string,
  userId: string,
  ownerId: string,
  valorBase: number,
  horasAntecedencia: number
) {
  // Regra de Negócio: Cancelamentos com mais de 24h recebem 100%
  // Cancelamentos com menos de 24h recebem 50%
  const taxaReembolso = horasAntecedencia >= 24 ? 1 : 0.5;
  const valorReembolso = valorBase * taxaReembolso;
  
  if (valorReembolso <= 0) return { sucesso: true, mensagem: "Sem valor a reembolsar." };

  // Pega saldo do pagador (cliente)
  const { data: pagador, error: pagadorError } = await supabase
    .from("Users")
    .select("saldo")
    .eq("id", userId)
    .single();

  if (pagadorError) throw new Error("Erro ao buscar saldo do usuário.");

  // Devolve pro usuário
  const { error: updatePagadorError } = await supabase
    .from("Users")
    .update({ saldo: (pagador.saldo || 0) + valorReembolso })
    .eq("id", userId);

  if (updatePagadorError) throw new Error("Erro ao devolver saldo.");

  // Pega saldo do dono
  const { data: dono, error: donoError } = await supabase
    .from("Users")
    .select("saldo")
    .eq("id", ownerId)
    .single();

  if (donoError) throw new Error("Erro ao buscar saldo do dono.");

  // Desconta do dono o valor reembolsado
  const { error: updateDonoError } = await supabase
    .from("Users")
    .update({ saldo: (dono.saldo || 0) - valorReembolso })
    .eq("id", ownerId);

  if (updateDonoError) throw new Error("Erro ao descontar saldo do dono.");

  return { 
    sucesso: true, 
    valorReembolsado: valorReembolso, 
    mensagem: `Reembolso de R$ ${valorReembolso.toFixed(2)} processado com sucesso!` 
  };
}