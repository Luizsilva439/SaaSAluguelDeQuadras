import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Title from "./Title";

type Props = {
  titulo: string;
  cidade: string;
  preco: number;
  imagem?: string;
  rating?: number;
  reviews?: number;
  disponivel?: boolean;
};

export default function CardFeed({
  titulo,
  cidade,
  preco,
  imagem,
  rating = 4.8,
  reviews = 120,
  disponivel = true,
}: Props) {
  return (
    <View style={styles.card}>
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

        {/* BOTÃO FAVORITO */}
        <Pressable style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color={colors.text} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,

    // Android
    elevation: 4,

    // iOS
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

  favoriteButton: {
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