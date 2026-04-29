import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Text, Share } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { supabase } from "../../services/supabase";
import { styles } from "./styles";
import { colors } from "../../constants/colors";
import { sendWhatsAppMessage } from "../../services/whatsapp";
import { simularPagamento } from "../../services/pagamento";
import { subscribeToTables } from "../../services/realtime";
import { useAppModal } from "../../contexts/AppModalContext";

import HeaderImage from "./components/HeaderImage";
import QuadraInfo from "./components/QuadraInfo";
import DateSelector from "./components/DateSelector";
import HourSelector from "./components/HourSelector";
import Summary from "./components/Summary";
import ConfirmButton from "./components/ConfirmButton";

type Quadra = {
  id: string;
  titulo: string;
  descricao: string;
  endereco: string;
  cidade: string;
  preco: number;
  tipo_esporte: string;
  telefone: string;
  owner_id: string;
};

type QuadraImagem = {
  id: string;
  quadra_id: string;
  url: string;
};

type Reserva = {
  id: string;
  quadra_id: string;
  data_reserva: string;
  hora_inicio: string;
  hora_fim: string;
  status: string;
};

// ====== FUNÇÕES DE DATA ======
function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateLabel(date: Date) {
  const meses = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];

  const dia = date.getDate();
  const mes = meses[date.getMonth()];

  return `${dia} ${mes}`;
}

function getWeekDay(date: Date) {
  const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return dias[date.getDay()];
}

function gerarDatas(qtdDias = 6) {
  const hoje = new Date();
  const datas = [];

  for (let i = 0; i < qtdDias; i++) {
    const novaData = new Date();
    novaData.setDate(hoje.getDate() + i);

    let label = getWeekDay(novaData);

    if (i === 0) label = "Hoje";
    if (i === 1) label = "Amanhã";

    datas.push({
      label,
      date: formatDateLabel(novaData),
      value: formatDateValue(novaData),
    });
  }

  return datas;
}
// ============================

function formatLocalDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function QuadraDetails() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { showModal } = useAppModal();

  const { quadraId } = route.params;

  const [quadra, setQuadra] = useState<Quadra | null>(null);
  const [imagens, setImagens] = useState<QuadraImagem[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingReserva, setLoadingReserva] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    formatLocalDateValue(new Date())
  );

  const [selectedHour, setSelectedHour] = useState("13:00");

  const datas = gerarDatas(6);

  const horarios = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  const now = new Date();
  const todayValue = formatLocalDateValue(now);
  const currentDecimalHour = now.getHours() + now.getMinutes() / 60;

  const horariosDisponiveisPorData =
    selectedDate === todayValue
      ? horarios.filter((hour) => Number(hour.split(":")[0]) > currentDecimalHour)
      : horarios;

  async function fetchQuadra() {
    setLoading(true);

    const { data: quadraData, error: quadraError } = await supabase
      .from("quadras")
      .select("*")
      .eq("id", quadraId)
      .single();

    if (quadraError) {
      console.log("Erro quadra:", quadraError.message);
      setLoading(false);
      return;
    }

    setQuadra(quadraData);

    const { data: imagensData, error: imagensError } = await supabase
      .from("quadras_imagens")
      .select("*")
      .eq("quadra_id", quadraId);

    if (imagensError) {
      console.log("Erro imagens:", imagensError.message);
    } else {
      setImagens(imagensData || []);
    }

    setLoading(false);
  }

  async function fetchReservas() {
    const { data, error } = await supabase
      .from("reservas")
      .select("*")
      .eq("quadra_id", quadraId)
      .eq("data_reserva", selectedDate)
      .neq("status", "cancelada");

    if (error) {
      console.log("Erro reservas:", error.message);
      return;
    }

    setReservas(data || []);
  }

  async function fetchFavoritoStatus() {
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      setIsFavorite(false);
      return;
    }

    const { data, error } = await supabase
      .from("favoritos")
      .select("id")
      .eq("user_id", user.data.user.id)
      .eq("quadra_id", quadraId)
      .maybeSingle();

    if (error) {
      console.log("Erro ao buscar favorito:", error.message);
      return;
    }

    setIsFavorite(!!data);
  }

  useEffect(() => {
    fetchQuadra();
  }, []);

  useEffect(() => {
    fetchReservas();
  }, [selectedDate]);

  useEffect(() => {
    const unsubscribe = subscribeToTables(
      [
        { table: "quadras", filter: `id=eq.${quadraId}` },
        { table: "quadras_imagens", filter: `quadra_id=eq.${quadraId}` },
        { table: "reservas", filter: `quadra_id=eq.${quadraId}` },
        { table: "favoritos", filter: `quadra_id=eq.${quadraId}` },
      ],
      () => {
        fetchQuadra();
        fetchReservas();
        fetchFavoritoStatus();
      }
    );

    return unsubscribe;
  }, [quadraId, selectedDate]);

  useEffect(() => {
    if (horariosDisponiveisPorData.length === 0) return;

    if (!horariosDisponiveisPorData.includes(selectedHour)) {
      setSelectedHour(horariosDisponiveisPorData[0]);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchFavoritoStatus();
  }, [quadraId]);

  function isAvailable(hour: string) {
    const reservado = reservas.some(
      (reserva) =>
        reserva.hora_inicio === hour && reserva.status !== "cancelada"
    );

    return !reservado;
  }

  async function handleConfirmReserva() {
    try {
      setLoadingReserva(true);

      if (!quadra) return;
      if (horariosDisponiveisPorData.length === 0) {
        showModal({ title: "Indisponível", message: "Nao ha horarios disponiveis para hoje." });
        return;
      }
      if (!horariosDisponiveisPorData.includes(selectedHour)) {
        showModal({ title: "Indisponível", message: "Selecione um horario valido." });
        return;
      }

      const user = await supabase.auth.getUser();

      if (!user.data.user) {
        showModal({ title: "Erro", message: "Você precisa estar logado para reservar." });
        return;
      }

      const { data: reservaExistente, error: checkError } = await supabase
        .from("reservas")
        .select("id")
        .eq("quadra_id", quadra.id)
        .eq("data_reserva", selectedDate)
        .eq("hora_inicio", selectedHour)
        .neq("status", "cancelada")
        .maybeSingle();

      if (checkError) {
        showModal({ title: "Erro", message: "Erro ao verificar disponibilidade." });
        return;
      }

      if (reservaExistente) {
        showModal({ title: "Indisponível", message: "Esse horário já foi reservado." });
        return;
      }

      // Check balance before proceeding
      const { data: userData, error: userError } = await supabase
        .from("Users")
        .select("saldo")
        .eq("id", user.data.user.id)
        .single();

      if (userError) {
        showModal({ title: "Erro", message: "Erro ao verificar o saldo da carteira." });
        return;
      }

      const saldoAtual = userData?.saldo || 0;

      if (saldoAtual < quadra.preco) {
        const missingAmount = quadra.preco - saldoAtual;
        showModal({
          title: "Saldo Insuficiente",
          message: `Você precisa de mais R$ ${missingAmount.toFixed(2)} para confirmar a reserva dessa quadra.`,
          buttons: [
            {
              text: "Adicionar Fundos",
              onPress: () => navigation.navigate("AddFunds", { initialAmount: missingAmount.toFixed(2).replace('.', ',') }),
            },
            {
              text: "Cancelar",
              style: "cancel",
            },
          ],
        });
        return;
      }

      // SIMULA PAGAMENTO
      await simularPagamento(user.data.user.id, quadra.owner_id, quadra.preco);

      const horaInicioNumero = Number(selectedHour.split(":")[0]);
      const horaFim = `${String(horaInicioNumero + 1).padStart(2, "0")}:00`;

      const { error } = await supabase.from("reservas").insert([
        {
          quadra_id: quadra.id,
          user_id: user.data.user.id,
          data_reserva: selectedDate,
          hora_inicio: selectedHour,
          hora_fim: horaFim,
          status: "pendente",
        },
      ]);

      if (error) {
        showModal({ title: "Erro", message: "Não foi possível criar a reserva." });
        return;
      }

      showModal({
        title: "Sucesso",
        message: "Reserva realizada com sucesso!",
        buttons: [
          {
            text: "Enviar mensagem",
            onPress: async () => {
              try {
                const message = `Olá! Gostaria de confirmar uma reserva da quadra *${quadra.titulo}*.

📍 Endereço: ${quadra.endereco}
📅 Data: ${selectedDate}
⏰ Horário: ${selectedHour}
💰 Valor: R$ ${quadra.preco}

Pode confirmar pra mim?`;

                await sendWhatsAppMessage(quadra.telefone, message);

                navigation.navigate("TabNavigator");
              } catch (err) {
                showModal({ title: "Erro", message: "Não foi possível abrir o WhatsApp." });
              }
            },
          },
          {
            text: "Voltar",
            style: "cancel",
            onPress: () => navigation.navigate("TabNavigator"),
          },
        ],
      });
    } catch (err: any) {
      showModal({ title: "Erro", message: err.message || "Ocorreu um erro inesperado." });
    } finally {
      setLoadingReserva(false);
    }
  }

  async function handleToggleFavorite() {
    if (loadingFavorite) return;

    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      showModal({ title: "Erro", message: "Você precisa estar logado para favoritar." });
      return;
    }

    const nextValue = !isFavorite;
    setIsFavorite(nextValue);
    setLoadingFavorite(true);

    if (nextValue) {
      const { error } = await supabase.from("favoritos").insert([
        {
          user_id: user.data.user.id,
          quadra_id: quadraId,
        },
      ]);

      setLoadingFavorite(false);

      if (error) {
        setIsFavorite(false);
        showModal({ title: "Erro", message: "Não foi possível adicionar aos favoritos." });
      }
      return;
    }

    const { error } = await supabase
      .from("favoritos")
      .delete()
      .eq("user_id", user.data.user.id)
      .eq("quadra_id", quadraId);

    setLoadingFavorite(false);

    if (error) {
      setIsFavorite(true);
      showModal({ title: "Erro", message: "Não foi possível remover dos favoritos." });
    }
  }

  async function handleShareQuadra() {
    if (!quadra) return;

    try {
      await Share.share({
        message: `Confira esta quadra no app:\n\n${quadra.titulo}\n${quadra.cidade}\n${quadra.endereco}\nR$ ${quadra.preco.toFixed(
          0
        )}/hora`,
      });
    } catch (error) {
      showModal({ title: "Erro", message: "Não foi possível compartilhar esta quadra." });
    }
  }

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!quadra) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: colors.text }}>Quadra não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderImage
          imagens={imagens.map((img) => img.url).filter(Boolean)}
          disponivel={true}
          onBack={() => navigation.goBack()}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          onShare={handleShareQuadra}
        />

        <View style={styles.mainCard}>
          <QuadraInfo
            titulo={quadra.titulo}
            cidade={quadra.cidade}
            preco={quadra.preco}
            endereco={quadra.endereco}
            tipoEsporte={quadra.tipo_esporte}
          />

          <DateSelector
            datas={datas}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          <HourSelector
            horarios={horariosDisponiveisPorData}
            selectedHour={selectedHour}
            onSelectHour={setSelectedHour}
            isAvailable={isAvailable}
          />

          {horariosDisponiveisPorData.length === 0 && (
            <Text style={{ color: colors.gray, marginTop: 8, marginBottom: 8 }}>
              Nao ha horarios disponiveis para hoje.
            </Text>
          )}

          <Summary
            selectedHour={selectedHour}
            selectedDate={selectedDate}
            preco={quadra.preco}
          />

          <ConfirmButton
            onConfirm={handleConfirmReserva}
            isLoading={loadingReserva}
          />
        </View>
      </ScrollView>
    </View>
  );
}