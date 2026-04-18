import { SafeAreaView } from "react-native-safe-area-context";
import { View, ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import { styles } from "./styles";
import TopHome from "./components/topHome";
import MainHome from "./Main";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { supabase } from "../../services/supabase";
import { colors } from "../../constants/colors";

export default function Home() {
  const [quadras, setQuadras] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  async function handleLoad() {
    setLoading(true);
    await loadQuadras();
    setLoading(false);
  }

  async function onRefresh() {
    setRefreshing(true);
    await loadQuadras();
    setRefreshing(false);
  }

  useFocusEffect(
    useCallback(() => {
      handleLoad();
    }, [])
  );

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
          <MainHome quadras={quadras} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}