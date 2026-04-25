import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Text, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { supabase } from "../../services/supabase";
import { styles } from "./styles";
import { colors } from "../../constants/colors";
import { sendWhatsAppMessage } from "../../services/whatsapp";

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
  return date.toISOString().split("T")[0];
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

export default function QuadraDetails() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { quadraId } = route.params;

  const [quadra, setQuadra] = useState<Quadra | null>(null);
  const [imagens, setImagens] = useState<QuadraImagem[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingReserva, setLoadingReserva] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
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
      .eq("data_reserva", selectedDate);

    if (error) {
      console.log("Erro reservas:", error.message);
      return;
    }

    setReservas(data || []);
  }

  useEffect(() => {
    fetchQuadra();
  }, []);

  useEffect(() => {
    fetchReservas();
  }, [selectedDate]);

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

      const user = await supabase.auth.getUser();

      if (!user.data.user) {
        Alert.alert("Erro", "Você precisa estar logado para reservar.");
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
        Alert.alert("Erro", "Erro ao verificar disponibilidade.");
        return;
      }

      if (reservaExistente) {
        Alert.alert("Indisponível", "Esse horário já foi reservado.");
        return;
      }

      const horaFim = `${Number(selectedHour.split(":")[0]) + 1}:00`;

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
        Alert.alert("Erro", "Não foi possível criar a reserva.");
        return;
      }

      Alert.alert("Sucesso", "Reserva realizada com sucesso!", [
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
              Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
            }
          },
        },
        {
          text: "Voltar",
          style: "cancel",
          onPress: () => navigation.navigate("TabNavigator"),
        },
      ]);
    } catch (err) {
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
    } finally {
      setLoadingReserva(false);
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
            horarios={horarios}
            selectedHour={selectedHour}
            onSelectHour={setSelectedHour}
            isAvailable={isAvailable}
          />

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