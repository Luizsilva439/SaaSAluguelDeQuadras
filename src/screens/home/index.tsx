import { SafeAreaView } from "react-native-safe-area-context";
import { View, ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import { styles } from "./styles";
import TopHome from "./components/topHome";
import MainHome from "./Main";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { supabase } from "../../services/supabase";
import { colors } from "../../constants/colors";
import { subscribeToTables } from "../../services/realtime";
import { useAppModal } from "../../contexts/AppModalContext";

export default function Home() {
  const { showModal } = useAppModal();
  const [quadras, setQuadras] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  async function loadQuadras() {
    const { data, error } = await supabase
      .from("quadras")
      .select(
        `
        id,
        titulo,
        cidade,
        preco,
        created_at,
        quadras_imagens (url)
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Erro ao buscar quadras:", error.message);
      return;
    }

    setQuadras(data || []);
  }

  async function loadFavoritos() {
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      setFavoriteIds(new Set());
      return;
    }

    const { data, error } = await supabase
      .from("favoritos")
      .select("quadra_id")
      .eq("user_id", user.data.user.id);

    if (error) {
      console.log("Erro ao buscar favoritos:", error.message);
      return;
    }

    setFavoriteIds(new Set((data || []).map((item: any) => item.quadra_id)));
  }

  async function handleToggleFavorite(quadraId: string) {
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      showModal({ title: "Erro", message: "Você precisa estar logado para favoritar." });
      return;
    }

    const isFavorite = favoriteIds.has(quadraId);

    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (isFavorite) next.delete(quadraId);
      else next.add(quadraId);
      return next;
    });

    if (isFavorite) {
      const { error } = await supabase
        .from("favoritos")
        .delete()
        .eq("user_id", user.data.user.id)
        .eq("quadra_id", quadraId);

      if (error) {
        showModal({ title: "Erro", message: "Não foi possível remover dos favoritos." });
        await loadFavoritos();
      }
      return;
    }

    const { error } = await supabase.from("favoritos").insert([
      {
        user_id: user.data.user.id,
        quadra_id: quadraId,
      },
    ]);

    if (error) {
      showModal({ title: "Erro", message: "Não foi possível adicionar aos favoritos." });
      await loadFavoritos();
    }
  }

  async function handleLoad() {
    setLoading(true);
    await Promise.all([loadQuadras(), loadFavoritos()]);
    setLoading(false);
  }

  async function onRefresh() {
    setRefreshing(true);
    await Promise.all([loadQuadras(), loadFavoritos()]);
    setRefreshing(false);
  }

  useFocusEffect(
    useCallback(() => {
      handleLoad();
    }, [])
  );

  useEffect(() => {
    const unsubscribe = subscribeToTables(
      [
        { table: "quadras" },
        { table: "quadras_imagens" },
        { table: "favoritos" },
      ],
      () => {
        loadQuadras();
        loadFavoritos();
      }
    );

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.mainContent}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        <TopHome />

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <MainHome
            quadras={quadras}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}