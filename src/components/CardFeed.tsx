import { View, Text, Image, StyleSheet, Pressable, Share } from "react-native";
import { colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Title from "./Title";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useAppModal } from "../contexts/AppModalContext";

type Props = {
  id: string;
  titulo: string;
  cidade: string;
  preco: number;
  imagem?: string;
  rating?: number;
  reviews?: number;
  disponivel?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (quadraId: string) => void;
};

export default function CardFeed({
  id,
  titulo,
  cidade,
  preco,
  imagem,
  rating = 4.8,
  reviews = 120,
  disponivel = true,
  isFavorite = false,
  onToggleFavorite,
}: Props) {
  const navigation = useNavigation<any>();
  const { showModal } = useAppModal();
  const [favorite, setFavorite] = useState(isFavorite);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  function handleOpenDetails() {
    console.log("ID ENVIADO PARA DETAILS:", id);

    navigation.navigate("QuadraDetails", {
      quadraId: id,
    });
  }

  async function handleShare() {
    try {
      await Share.share({
        message: `Confira esta quadra no app:\n\n${titulo}\n${cidade}\nR$ ${preco.toFixed(
          0
        )}/hora`,
      });
    } catch (error) {
      showModal({ title: "Erro", message: "Não foi possível compartilhar esta quadra." });
    }
  }

  async function handleToggleFavorite() {
    if (loadingFavorite) return;

    if (onToggleFavorite) {
      onToggleFavorite(id);
      return;
    }

    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      showModal({ title: "Erro", message: "Você precisa estar logado para favoritar." });
      return;
    }

    const nextValue = !favorite;
    setFavorite(nextValue);
    setLoadingFavorite(true);

    if (nextValue) {
      const { error } = await supabase.from("favoritos").insert([
        {
          user_id: user.data.user.id,
          quadra_id: id,
        },
      ]);

      setLoadingFavorite(false);

      if (error) {
        setFavorite(false);
        showModal({ title: "Erro", message: "Não foi possível adicionar aos favoritos." });
      }
      return;
    }

    const { error } = await supabase
      .from("favoritos")
      .delete()
      .eq("user_id", user.data.user.id)
      .eq("quadra_id", id);

    setLoadingFavorite(false);

    if (error) {
      setFavorite(true);
      showModal({ title: "Erro", message: "Não foi possível remover dos favoritos." });
    }
  }

  return (
    <Pressable style={styles.card} onPress={handleOpenDetails}>
      {/* IMAGEM */}
      <View style={styles.imageWrapper}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.image} />
        ) : (
          <View style={styles.noImage}>
            <Ionicons name="image-outline" size={30} color={colors.gray} />
            <Text style={styles.noImageText}>Sem imagem</Text>
          </View>
        )}

        {/* BADGE DISPONÍVEL */}
        {disponivel && (
          <View style={styles.badge}>
            <Ionicons name="flash" size={14} color={colors.text} />
            <Text style={styles.badgeText}>Disponível</Text>
          </View>
        )}

        {/* BOTÕES DE AÇÃO */}
        <Pressable
          style={[styles.actionButton, styles.shareButton]}
          onPress={(event) => {
            event.stopPropagation();
            handleShare();
          }}
        >
          <Ionicons name="share-social-outline" size={20} color={colors.text} />
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={(event) => {
            event.stopPropagation();
            handleToggleFavorite();
          }}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={20}
            color={favorite ? "#ff6666" : colors.text}
          />
        </Pressable>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Title title={titulo} size={16} marginBottom={6} />

        <View style={styles.cityRow}>
          <Ionicons name="location-outline" size={16} color={colors.primary} />
          <Text style={styles.cityText}>{cidade}</Text>
        </View>

        <View style={styles.bottomRow}>
          {/* RATING */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={colors.primary} />
            <Text style={styles.ratingText}>
              {rating.toFixed(1)} ({reviews})
            </Text>
          </View>

          {/* PREÇO */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>R$ {preco.toFixed(0)}</Text>
            <Text style={styles.hour}>/hora</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  imageWrapper: {
    width: "100%",
    height: 180,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  noImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#16352d",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  noImageText: {
    color: colors.gray,
    fontSize: 12,
  },

  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700",
  },

  actionButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  shareButton: {
    right: 56,
  },

  content: {
    padding: 14,
  },

  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  cityText: {
    color: colors.gray,
    fontSize: 13,
  },

  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  ratingText: {
    color: colors.gray,
    fontSize: 13,
    fontWeight: "600",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },

  price: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "800",
  },

  hour: {
    color: colors.gray,
    fontSize: 13,
    marginBottom: 2,
  },
});