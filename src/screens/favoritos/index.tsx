import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { supabase } from "../../services/supabase";
import { colors } from "../../constants/colors";
import CardFeed from "../../components/CardFeed";
import { styles } from "./styles";
import { subscribeToTables } from "../../services/realtime";
import { useAppModal } from "../../contexts/AppModalContext";

type QuadraFavorita = {
  id: string;
  titulo: string;
  cidade: string;
  preco: number;
  quadras_imagens?: { url: string }[];
};

export default function Favoritos() {
  const { showModal } = useAppModal();
  const [quadras, setQuadras] = useState<QuadraFavorita[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadFavoritos(showLoading = true) {
    if (showLoading) setLoading(true);

    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      setQuadras([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("favoritos")
      .select(
        `
        quadra_id,
        quadras (
          id,
          titulo,
          cidade,
          preco,
          quadras_imagens (url)
        )
      `
      )
      .eq("user_id", user.data.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      showModal({ title: "Erro", message: "Não foi possível carregar seus favoritos." });
      setLoading(false);
      return;
    }

    const onlyQuadras = (data || [])
      .map((item: any) => item.quadras)
      .flat()
      .filter(Boolean);

    setQuadras(onlyQuadras);
    setLoading(false);
  }

  async function onRefresh() {
    setRefreshing(true);
    await loadFavoritos(false);
    setRefreshing(false);
  }

  async function handleToggleFavorite(quadraId: string) {
    const user = await supabase.auth.getUser();

    if (!user.data.user) return;

    const { error } = await supabase
      .from("favoritos")
      .delete()
      .eq("user_id", user.data.user.id)
      .eq("quadra_id", quadraId);

    if (error) {
      showModal({ title: "Erro", message: "Não foi possível remover dos favoritos." });
      return;
    }

    setQuadras((prev) => prev.filter((item) => item.id !== quadraId));
  }

  useFocusEffect(
    useCallback(() => {
      loadFavoritos();
    }, [])
  );

  useEffect(() => {
    const unsubscribe = subscribeToTables(
      [
        { table: "favoritos" },
        { table: "quadras" },
        { table: "quadras_imagens" },
      ],
      () => {
        loadFavoritos(false);
      }
    );

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoritos</Text>
      </View>

      {quadras.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={70} color={colors.primary} />
          <Text style={styles.emptyTitle}>Nenhuma quadra favorita</Text>
          <Text style={styles.emptySubtitle}>
            Toque no coracao de uma quadra para salvar aqui.
          </Text>
        </View>
      ) : (
        <FlatList
          data={quadras}
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
          renderItem={({ item }) => (
            <CardFeed
              id={item.id}
              titulo={item.titulo}
              cidade={item.cidade}
              preco={item.preco}
              imagem={item.quadras_imagens?.[0]?.url}
              isFavorite={true}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
