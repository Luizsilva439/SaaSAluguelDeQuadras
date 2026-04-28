import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { supabase } from "../../services/supabase";
import { colors } from "../../constants/colors";
import { styles } from "./styles";
import { subscribeToTables } from "../../services/realtime";
import { useAppModal } from "../../contexts/AppModalContext";

type Reserva = {
  id: string;
  quadra_id: string;
  user_id: string;
  data_reserva: string;
  hora_inicio: string;
  hora_fim: string;
  status: string;
  created_at: string;
  Users?: {
    name: string;
  };
};

// CORREÇÃO DO BUG DE DATA (timezone)
function formatDate(dateString: string) {
  if (!dateString) return "";

  // data_reserva vem do Supabase como "YYYY-MM-DD"
  const [year, month, day] = dateString.split("-").map(Number);

  // cria a data no horário local (evita cair um dia antes)
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

export default function QuadraReservas() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { showModal } = useAppModal();

  const { quadraId } = route.params;

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  async function fetchReservas(showLoading = true) {
    if (showLoading) setLoading(true);

    const { data, error } = await supabase
      .from("reservas")
      .select("*, Users(name)")
      .eq("quadra_id", quadraId)
      .order("data_reserva", { ascending: true })
      .order("hora_inicio", { ascending: true });

    if (error) {
      console.log("Erro ao buscar reservas:", error.message);
      setLoading(false);
      return;
    }

    setReservas(data || []);
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchReservas();
    }, [quadraId])
  );

  useEffect(() => {
    const unsubscribe = subscribeToTables(
      [{ table: "reservas", filter: `quadra_id=eq.${quadraId}` }],
      () => {
        fetchReservas(false);
      }
    );

    return unsubscribe;
  }, [quadraId]);

  async function onRefresh() {
    setRefreshing(true);
    await fetchReservas(false);
    setRefreshing(false);
  }

  function renderStatus(status: string) {
    if (status === "cancelada") return "Cancelada";
    if (status === "pendente") return "Pendente";
    if (status === "pago") return "Pago";
    return status;
  }

  async function handleCancelReserva(reservaId: string, status: string) {
    if (status === "cancelada") return;

    showModal({
      title: "Cancelar reserva",
      message: "Deseja cancelar esta reserva?",
      buttons: [
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
              showModal({ title: "Erro", message: "Não foi possível cancelar a reserva." });
              return;
            }

            await fetchReservas(false);
          },
        },
      ],
    });
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>

        <Text style={styles.title}>Reservas da Quadra</Text>

        <View style={{ width: 42 }} />
      </View>

      {/* EMPTY */}
      {reservas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={70} color={colors.primary} />
          <Text style={styles.emptyTitle}>Nenhuma reserva encontrada</Text>
          <Text style={styles.emptySubtitle}>
            Quando alguém reservar essa quadra, vai aparecer aqui.
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

            return (
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <View style={styles.clientRow}>
                    <Ionicons
                      name="person-circle-outline"
                      size={28}
                      color={colors.primary}
                    />
                    <Text style={styles.clientName}>
                      {item.Users?.name || "Cliente não identificado"}
                    </Text>
                  </View>

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

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color={colors.gray}
                    />
                    <Text style={styles.infoText}>
                      {formatDate(item.data_reserva)}
                    </Text>
                  </View>

                  <View style={styles.infoItem}>
                    <Ionicons name="time-outline" size={16} color={colors.gray} />
                    <Text style={styles.infoText}>
                      {formatHour(item.hora_inicio)} - {formatHour(item.hora_fim)}
                    </Text>
                  </View>
                </View>

                <Pressable
                  style={[
                    styles.cancelButton,
                    (isCancelled || isCanceling) && styles.disabledButton,
                  ]}
                  onPress={() => handleCancelReserva(item.id, item.status)}
                  disabled={isCancelled || isCanceling}
                >
                  <Text style={styles.cancelButtonText}>
                    {isCanceling ? "Cancelando..." : "Cancelar reserva"}
                  </Text>
                </Pressable>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}