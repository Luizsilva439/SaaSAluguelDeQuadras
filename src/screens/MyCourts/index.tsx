import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { supabase } from "../../services/supabase";
import { colors } from "../../constants/colors";
import CardFeed from "../../components/CardFeed";
import CardMyCourt from "../../components/CardMyCourt";
import { styles } from "./styles";
import { subscribeToTables } from "../../services/realtime";

type Quadra = {
  id: string;
  titulo: string;
  cidade: string;
  preco: number;
  owner_id: string;
  quadras_imagens?: { url: string }[];
};

export default function MyCourts() {
  const navigation = useNavigation<any>();

  const [quadras, setQuadras] = useState<Quadra[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMyCourts(showLoading = true) {
    if (showLoading) setLoading(true);

    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("quadras")
      .select("*, quadras_imagens(url)")
      .eq("owner_id", user.data.user.id);

    if (error) {
      console.log("Erro ao buscar quadras:", error.message);
      setLoading(false);
      return;
    }

    setQuadras(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchMyCourts();
  }, []);

  useEffect(() => {
    let unsubscribe = () => {};
    let isMounted = true;

    async function setupRealtime() {
      const user = await supabase.auth.getUser();
      if (!isMounted || !user.data.user) return;

      unsubscribe = subscribeToTables(
        [{ table: "quadras", filter: `owner_id=eq.${user.data.user.id}` }],
        () => {
          fetchMyCourts(false);
        }
      );
    }

    setupRealtime();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

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

        <Text style={styles.title}>Minhas Quadras</Text>

        <Pressable
          onPress={() => navigation.navigate("PublishQuadra")}
          style={styles.addButton}
        >
          <Ionicons name="add" size={22} color={colors.background} />
        </Pressable>
      </View>

      {/* LISTA OU EMPTY */}
      {quadras.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="football-outline" size={70} color={colors.primary} />

          <Text style={styles.emptyTitle}>Nenhuma quadra cadastrada</Text>

          <Text style={styles.emptySubtitle}>
            Você ainda não publicou nenhuma quadra. Cadastre agora e comece a receber reservas.
          </Text>

          <Pressable
            style={styles.emptyButton}
            onPress={() => navigation.navigate("PublishQuadra")}
          >
            <Text style={styles.emptyButtonText}>Publicar Quadra</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={quadras}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
          renderItem={({ item }) => (
            <CardMyCourt
              id={item.id}
              titulo={item.titulo}
              cidade={item.cidade}
              preco={item.preco}
              imagem={item.quadras_imagens?.[0]?.url}
              onPress={() =>
                navigation.navigate("QuadraReservas", { quadraId: item.id })
              }
              onEdit={() =>
                navigation.navigate("EditCourt", { quadraId: item.id })
              }
            />
          )}
        />
      )}
    </View>
  );
}