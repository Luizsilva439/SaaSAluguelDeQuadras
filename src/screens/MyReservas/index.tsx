import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  Alert,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { supabase } from "../../services/supabase";
import { colors } from "../../constants/colors";
import { styles } from "./styles";

type Reserva = {
  id: string;
  quadra_id: string;
  user_id: string;
  data_reserva: string;
  hora_inicio: string;
  hora_fim: string;
  status: string;
  quadras?: {
    id: string;
    titulo: string;
    cidade: string;
    quadras_imagens?: { url: string }[];
  }[];
};

function formatDate(dateString: string) {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatHour(hour: string) {
  if (!hour) return "";
  return hour.slice(0, 5);
}

function renderStatus(status: string) {
  if (status === "cancelada") return "Cancelada";
  if (status === "pendente") return "Pendente";
  if (status === "pago") return "Pago";
  return status;
}

export default function MyReservas() {
  const navigation = useNavigation<any>();

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  async function fetchReservas(showLoading = true) {
    if (showLoading) setLoading(true);

    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      setReservas([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("reservas")
      .select(
        `
        id,
        quadra_id,
        user_id,
        data_reserva,
        hora_inicio,
        hora_fim,
        status,
        quadras (
          id,
          titulo,
          cidade,
          quadras_imagens (url)
        )
      `
      )
      .eq("user_id", user.data.user.id)
      .order("data_reserva", { ascending: true })
      .order("hora_inicio", { ascending: true });

    if (error) {
      Alert.alert("Erro", "Não foi possível carregar suas reservas.");
      setLoading(false);
      return;
    }

    setReservas(data || []);
    setLoading(false);
  }

  async function onRefresh() {
    setRefreshing(true);
    await fetchReservas(false);
    setRefreshing(false);
  }

  async function handleCancelReserva(reservaId: string, status: string) {
    if (status === "cancelada") return;

    Alert.alert(
      "Cancelar reserva",
      "Tem certeza que deseja cancelar esta reserva?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim, cancelar",
          style: "destructive",
          onPress: async () => {
            setCancelingId(reservaId);

            const { error } = await supabase
              .from("reservas")
              .update({ status: "cancelada" })
              .eq("id", reservaId);

            setCancelingId(null);

            if (error) {
              Alert.alert("Erro", "Não foi possível cancelar a reserva.");
              return;
            }

            await fetchReservas(false);
          },
        },
      ]
    );
  }

  useFocusEffect(
    useCallback(() => {
      fetchReservas();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>

        <Text style={styles.title}>Minhas Reservas</Text>

        <View style={styles.rightSpacer} />
      </View>

      {reservas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-clear-outline" size={70} color={colors.primary} />
          <Text style={styles.emptyTitle}>Nenhuma reserva encontrada</Text>
          <Text style={styles.emptySubtitle}>
            Suas reservas aparecerão aqui assim que você reservar uma quadra.
          </Text>
        </View>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
          renderItem={({ item }) => {
            const isCancelled = item.status === "cancelada";
            const isCanceling = cancelingId === item.id;
            const quadra = item.quadras?.[0];

            return (
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={styles.quadraName}>
                    {quadra?.titulo || "Quadra indisponível"}
                  </Text>

                  <View style={[styles.statusBadge, isCancelled && styles.statusCancelled]}>
                    <Text
                      style={[
                        styles.statusBadgeText,
                        isCancelled && styles.statusCancelledText,
                      ]}
                    >
                      {renderStatus(item.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.cityRow}>
                  <Ionicons name="location-outline" size={15} color={colors.gray} />
                  <Text style={styles.cityText}>
                    {quadra?.cidade || "Cidade não informada"}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Ionicons name="calendar-outline" size={16} color={colors.gray} />
                    <Text style={styles.infoText}>{formatDate(item.data_reserva)}</Text>
                  </View>

                  <View style={styles.infoItem}>
                    <Ionicons name="time-outline" size={16} color={colors.gray} />
                    <Text style={styles.infoText}>
                      {formatHour(item.hora_inicio)} - {formatHour(item.hora_fim)}
                    </Text>
                  </View>
                </View>

                <View style={styles.actionsRow}>
                  <Pressable
                    style={[
                      styles.detailsButton,
                      !item.quadra_id && styles.disabledButton,
                    ]}
                    onPress={() =>
                      item.quadra_id &&
                      navigation.navigate("QuadraDetails", { quadraId: item.quadra_id })
                    }
                    disabled={!item.quadra_id}
                  >
                    <Text style={styles.detailsButtonText}>Ver quadra</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.cancelButton,
                      (isCancelled || isCanceling) && styles.disabledButton,
                    ]}
                    onPress={() => handleCancelReserva(item.id, item.status)}
                    disabled={isCancelled || isCanceling}
                  >
                    <Text style={styles.cancelButtonText}>
                      {isCanceling ? "Cancelando..." : "Cancelar"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
