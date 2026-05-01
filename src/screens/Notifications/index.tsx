import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { supabase } from "../../services/supabase";
import { colors } from "../../constants/colors";
import { styles } from "./styles";
import { subscribeToTables } from "../../services/realtime";

type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  reserva_id: string | null;
  quadra_id: string | null;
  read: boolean;
  created_at: string;
};

function formatNotificationDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getIconForType(type: string) {
  switch (type) {
    case "nova_reserva":
      return { name: "calendar-outline" as const, color: "#FFC107" };
    case "checkin":
      return { name: "log-in-outline" as const, color: "#00C287" };
    case "checkout":
      return { name: "log-out-outline" as const, color: "#6496FF" };
    case "cancelada":
      return { name: "close-circle-outline" as const, color: "#ff6666" };
    default:
      return { name: "notifications-outline" as const, color: colors.gray };
  }
}

export default function Notifications() {
  const navigation = useNavigation<any>();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchNotifications(showLoading = true) {
    if (showLoading) setLoading(true);

    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.data.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Erro ao buscar notificações:", error.message);
    } else {
      setNotifications(data || []);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [])
  );

  useEffect(() => {
    let unsubscribe = () => {};
    let isMounted = true;

    async function setupRealtime() {
      const user = await supabase.auth.getUser();
      if (!isMounted || !user.data.user) return;

      unsubscribe = subscribeToTables(
        [{ table: "notifications", filter: `user_id=eq.${user.data.user.id}` }],
        () => {
          fetchNotifications(false);
        }
      );
    }

    setupRealtime();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    await fetchNotifications(false);
    setRefreshing(false);
  }

  async function handleMarkAsRead(id: string, isRead: boolean) {
    if (isRead) return;

    // Otimisticamente atualiza a UI
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );

    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);

    if (error) {
      // Reverte em caso de erro
      fetchNotifications(false);
    }
  }

  async function handleMarkAllAsRead() {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
    if (unreadIds.length === 0) return;

    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));

    const user = await supabase.auth.getUser();
    if (user.data.user) {
      await supabase
        .from("notifications")
        .update({ read: true })
        .eq("user_id", user.data.user.id)
        .eq("read", false);
    }
  }

  function handleNotificationPress(notification: Notification) {
    handleMarkAsRead(notification.id, notification.read);
    
    // Navegar para detalhes da quadra ou reservas se aplicável
    if (notification.quadra_id) {
      navigation.navigate("QuadraReservas", { quadraId: notification.quadra_id });
    }
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

        <Text style={styles.title}>Notificações</Text>

        <Pressable onPress={handleMarkAllAsRead} style={styles.readAllButton}>
          <Ionicons name="checkmark-done-outline" size={22} color={colors.primary} />
        </Pressable>
      </View>

      {/* EMPTY */}
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={70} color={colors.primary} />
          <Text style={styles.emptyTitle}>Nenhuma notificação</Text>
          <Text style={styles.emptySubtitle}>
            Você não possui notificações no momento.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
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
            const iconConfig = getIconForType(item.type);

            return (
              <Pressable
                style={[styles.card, !item.read && styles.cardUnread]}
                onPress={() => handleNotificationPress(item)}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={iconConfig.name} size={24} color={iconConfig.color} />
                </View>

                <View style={styles.contentContainer}>
                  <Text style={[styles.notificationTitle, !item.read && styles.textUnread]}>
                    {item.title}
                  </Text>
                  <Text style={styles.notificationMessage}>{item.message}</Text>
                  <Text style={styles.timeText}>{formatNotificationDate(item.created_at)}</Text>
                </View>

                {!item.read && <View style={styles.unreadDot} />}
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}
