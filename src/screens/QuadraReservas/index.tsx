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
  checkin_at?: string | null;
  checkout_at?: string | null;
  created_at: string;
  Users?: {
    name: string;
  };
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

function getStatusConfig(status: string) {
  switch (status) {
    case "pendente":
      return { text: "Pendente", style: styles.statusPendente, textStyle: styles.statusPendenteText };
    case "checkin":
      return { text: "Check-in ativo", style: styles.statusCheckin, textStyle: styles.statusCheckinText };
    case "checkout":
      return { text: "Check-out", style: styles.statusCheckout, textStyle: styles.statusCheckoutText };
    case "finalizada":
      return { text: "Finalizada", style: styles.statusCheckout, textStyle: styles.statusCheckoutText };
    case "cancelada":
      return { text: "Cancelada", style: styles.statusError, textStyle: styles.statusErrorText };
    case "no_show":
      return { text: "No Show", style: styles.statusError, textStyle: styles.statusErrorText };
    default:
      return { text: status, style: styles.statusCheckout, textStyle: styles.statusCheckoutText };
  }
}

export default function QuadraReservas() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { showModal } = useAppModal();

  const { quadraId } = route.params;

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  async function fetchReservas(showLoading = true) {
    if (showLoading) setLoading(true);

    const { data, error } = await supabase
      .from("reservas")
      .select("*, Users(name)")
      .eq("quadra_id", quadraId)
      .order("data_reserva", { ascending: false })
      .order("hora_inicio", { ascending: false });

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

  async function handleUpdateStatus(reservaId: string, novoStatus: string) {
    setActionLoadingId(reservaId);
    
    const { error } = await supabase
      .from("reservas")
      .update({ status: novoStatus })
      .eq("id", reservaId);

    setActionLoadingId(null);

    if (error) {
      showModal({ title: "Erro", message: "Não foi possível atualizar o status da reserva." });
      return;
    }

    await fetchReservas(false);
  }

  async function handleCancelReserva(reservaId: string) {
    showModal({
      title: "Cancelar reserva",
      message: "Deseja cancelar a reserva deste usuário?",
      buttons: [
        { text: "Não", style: "cancel" },
        {
          text: "Sim, cancelar",
          style: "destructive",
          onPress: () => handleUpdateStatus(reservaId, "cancelada"),
        },
      ],
    });
  }

  async function handleFinalizeReserva(reservaId: string) {
    showModal({
      title: "Finalizar reserva",
      message: "Deseja marcar esta reserva como finalizada?",
      buttons: [
        { text: "Não", style: "cancel" },
        {
          text: "Sim, finalizar",
          onPress: () => handleUpdateStatus(reservaId, "finalizada"),
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
            const statusConfig = getStatusConfig(item.status);
            const isActionLoading = actionLoadingId === item.id;
            const isAnyActionLoading = actionLoadingId !== null;

            return (
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <View style={styles.clientRow}>
                    <Ionicons name="person-circle-outline" size={28} color={colors.primary} />
                    <Text style={styles.clientName} numberOfLines={1}>
                      {item.Users?.name || "Cliente não identificado"}
                    </Text>
                  </View>

                  <View style={[styles.statusBadge, statusConfig.style]}>
                    <Text style={[styles.statusBadgeText, statusConfig.textStyle]}>
                      {statusConfig.text}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Ionicons name="calendar-outline" size={16} color={colors.gray} />
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

                {(item.checkin_at || item.checkout_at) && (
                  <View style={styles.timesContainer}>
                    {item.checkin_at && (
                      <Text style={styles.timeText}>
                        Check-in: {new Date(item.checkin_at).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    )}
                    {item.checkout_at && (
                      <Text style={styles.timeText}>
                        Check-out: {new Date(item.checkout_at).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    )}
                  </View>
                )}

                <View style={styles.actionsGrid}>
                  {item.status !== "cancelada" && item.status !== "finalizada" && (
                    <>
                      <Pressable
                        style={[
                          styles.actionButton,
                          styles.cancelButton,
                          isAnyActionLoading && styles.disabledButton,
                        ]}
                        onPress={() => handleCancelReserva(item.id)}
                        disabled={isAnyActionLoading}
                      >
                        {isActionLoading && item.status !== "checkout" ? (
                           <ActivityIndicator size="small" color="#ff6666" />
                        ) : (
                          <Text style={styles.cancelButtonText}>Cancelar</Text>
                        )}
                      </Pressable>

                      {item.status === "checkout" && (
                        <Pressable
                          style={[
                            styles.actionButton,
                            styles.finalizeButton,
                            isAnyActionLoading && styles.disabledButton,
                          ]}
                          onPress={() => handleFinalizeReserva(item.id)}
                          disabled={isAnyActionLoading}
                        >
                          <Text style={styles.finalizeButtonText}>Finalizar</Text>
                        </Pressable>
                      )}
                    </>
                  )}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}