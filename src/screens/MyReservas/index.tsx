import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

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
  auto_closed_at?: string | null;
  tolerance_minutes?: number;
  extra_minutes?: number;
  extra_fee?: number;
  fine_fee?: number;
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

const CardReserva = ({
  item,
  loadingActionId,
  onCheckin,
  onCheckout,
  onCancel,
  onDetails,
}: {
  item: Reserva;
  loadingActionId: string | null;
  onCheckin: (id: string) => void;
  onCheckout: (id: string) => void;
  onCancel: (id: string, status: string) => void;
  onDetails: (id: string) => void;
}) => {
  const isActionLoading = loadingActionId === item.id;
  const isOtherLoading = loadingActionId !== null && loadingActionId !== item.id;
  const quadra = Array.isArray(item.quadras) ? item.quadras[0] : item.quadras;
  const statusConfig = getStatusConfig(item.status);

  const hasExtraInfo =
    (item.extra_minutes && item.extra_minutes > 0) ||
    (item.extra_fee && item.extra_fee > 0) ||
    (item.fine_fee && item.fine_fee > 0);

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.quadraName} numberOfLines={1}>
          {quadra?.titulo || "Quadra indisponível"}
        </Text>
        <View style={[styles.statusBadge, statusConfig.style]}>
          <Text style={[styles.statusBadgeText, statusConfig.textStyle]}>
            {statusConfig.text}
          </Text>
        </View>
      </View>

      <View style={styles.cityRow}>
        <Ionicons name="location-outline" size={15} color={colors.gray} />
        <Text style={styles.cityText}>{quadra?.cidade || "Cidade não informada"}</Text>
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

      {hasExtraInfo && (
        <View style={styles.extraInfoContainer}>
          <Text style={styles.extraInfoTitle}>Valores adicionais aplicados:</Text>
          {item.extra_minutes ? <Text style={styles.extraInfoText}>• Tempo extra: {item.extra_minutes} min</Text> : null}
          {item.extra_fee ? <Text style={styles.extraInfoText}>• Taxa extra: R$ {item.extra_fee.toFixed(2)}</Text> : null}
          {item.fine_fee ? <Text style={styles.extraInfoText}>• Multa: R$ {item.fine_fee.toFixed(2)}</Text> : null}
        </View>
      )}

      <View style={styles.actionsGrid}>
        {item.status === "pendente" && (
          <>
            <Pressable
              style={[styles.actionButton, styles.checkinButton, (isActionLoading || isOtherLoading) && styles.disabledButton]}
              onPress={() => onCheckin(item.id)}
              disabled={isActionLoading || isOtherLoading}
            >
              {isActionLoading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Text style={styles.checkinButtonText}>Fazer Check-in</Text>
              )}
            </Pressable>
            <Pressable
              style={[styles.actionButton, styles.cancelButton, (isActionLoading || isOtherLoading) && styles.disabledButton]}
              onPress={() => onCancel(item.id, item.status)}
              disabled={isActionLoading || isOtherLoading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </>
        )}

        {item.status === "checkin" && (
          <Pressable
            style={[styles.actionButton, styles.checkinButton, (isActionLoading || isOtherLoading) && styles.disabledButton]}
            onPress={() => onCheckout(item.id)}
            disabled={isActionLoading || isOtherLoading}
          >
            {isActionLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Text style={styles.checkinButtonText}>Fazer Check-out</Text>
            )}
          </Pressable>
        )}

        {item.status !== "pendente" && item.status !== "checkin" && (
          <Pressable
            style={[styles.actionButton, styles.detailsButton, !item.quadra_id && styles.disabledButton]}
            onPress={() => onDetails(item.quadra_id)}
            disabled={!item.quadra_id}
          >
            <Text style={styles.detailsButtonText}>Ver quadra</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default function MyReservas() {
  const navigation = useNavigation<any>();
  const canGoBack = navigation.canGoBack();
  const { showModal } = useAppModal();

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingActionId, setLoadingActionId] = useState<string | null>(null);

  async function fetchReservas(showLoading = true) {
    if (showLoading) setLoadingReservations(true);

    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      setReservas([]);
      setLoadingReservations(false);
      return;
    }

    const { data, error } = await supabase
      .from("reservas")
      .select(`
        id, quadra_id, user_id, data_reserva, hora_inicio, hora_fim, status,
        checkin_at, checkout_at, auto_closed_at, tolerance_minutes,
        extra_minutes, extra_fee, fine_fee,
        quadras (id, titulo, cidade, quadras_imagens (url))
      `)
      .eq("user_id", user.data.user.id)
      .order("data_reserva", { ascending: false })
      .order("hora_inicio", { ascending: false });

    if (error) {
      showModal({ title: "Erro", message: "Não foi possível carregar suas reservas." });
    } else {
      setReservas(data || []);
    }
    
    setLoadingReservations(false);
  }

  async function onRefresh() {
    setRefreshing(true);
    await fetchReservas(false);
    setRefreshing(false);
  }

  async function handleCheckin(reservaId: string) {
    setLoadingActionId(reservaId);
    try {
      const { data, error } = await supabase.rpc("checkin_reserva", { reserva_id: reservaId });

      if (error) throw error;

      if (data?.success) {
        showModal({ title: "Check-in Realizado!", message: data.message || "Você já pode utilizar a quadra." });
        await fetchReservas(false);
      } else {
        showModal({ title: "Atenção", message: data?.message || "Não foi possível realizar o check-in." });
      }
    } catch (err: any) {
      showModal({ title: "Erro", message: err.message || "Erro de conexão ao realizar o check-in." });
    } finally {
      setLoadingActionId(null);
    }
  }

  async function handleCheckout(reservaId: string) {
    setLoadingActionId(reservaId);
    try {
      const { data, error } = await supabase.rpc("checkout_reserva", { reserva_id: reservaId });

      if (error) throw error;

      if (data?.success) {
        let message = data.message || "Check-out realizado com sucesso!";
        if (data.extra_fee > 0 || data.fine_fee > 0) {
           message += `\n\nTempo extra: ${data.extra_minutes} min\nTaxa extra: R$ ${data.extra_fee.toFixed(2)}\nMulta: R$ ${data.fine_fee.toFixed(2)}`;
        }
        showModal({ title: "Check-out Concluído", message });
        await fetchReservas(false);
      } else {
        showModal({ title: "Atenção", message: data?.message || "Não foi possível realizar o check-out." });
      }
    } catch (err: any) {
      showModal({ title: "Erro", message: err.message || "Erro de conexão ao realizar o check-out." });
    } finally {
      setLoadingActionId(null);
    }
  }

  async function handleCancelReserva(reservaId: string, status: string) {
    if (status === "cancelada") return;

    showModal({
      title: "Cancelar reserva",
      message: "Tem certeza que deseja cancelar esta reserva?",
      buttons: [
        { text: "Não", style: "cancel" },
        {
          text: "Sim, cancelar",
          style: "destructive",
          onPress: async () => {
            setLoadingActionId(reservaId);

            const { error } = await supabase
              .from("reservas")
              .update({ status: "cancelada" })
              .eq("id", reservaId);

            if (error) {
              setLoadingActionId(null);
              showModal({ title: "Erro", message: "Não foi possível cancelar a reserva." });
              return;
            }

            await fetchReservas(false);
            setLoadingActionId(null);
          },
        },
      ],
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchReservas();
    }, [])
  );

  useEffect(() => {
    let unsubscribe = () => {};
    let isMounted = true;

    async function setupRealtime() {
      const user = await supabase.auth.getUser();
      if (!isMounted || !user.data.user) return;

      unsubscribe = subscribeToTables(
        [{ table: "reservas", filter: `user_id=eq.${user.data.user.id}` }],
        () => {
          fetchReservas(false);
        }
      );
    }

    setupRealtime();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  if (loadingReservations && !refreshing && reservas.length === 0) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => (canGoBack ? navigation.goBack() : navigation.navigate("Home"))}
          style={styles.backButton}
        >
          <Ionicons name={canGoBack ? "chevron-back" : "home-outline"} size={22} color={colors.text} />
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
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
          }
          renderItem={({ item }) => (
            <CardReserva
              item={item}
              loadingActionId={loadingActionId}
              onCheckin={handleCheckin}
              onCheckout={handleCheckout}
              onCancel={handleCancelReserva}
              onDetails={(id) => navigation.navigate("QuadraDetails", { quadraId: id })}
            />
          )}
        />
      )}
    </View>
  );
}
