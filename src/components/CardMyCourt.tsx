import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Title from "./Title";

type Props = {
  id: string;
  titulo: string;
  cidade: string;
  preco: number;
  imagem?: string;
  onPress: () => void;
};

export default function CardMyCourt({
  titulo,
  cidade,
  preco,
  imagem,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
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

        {/* BADGE */}
        <View style={styles.badge}>
          <Ionicons name="shield-checkmark" size={14} color={colors.text} />
          <Text style={styles.badgeText}>Minha quadra</Text>
        </View>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Title title={titulo} size={16} marginBottom={6} />

        <View style={styles.cityRow}>
          <Ionicons name="location-outline" size={16} color={colors.primary} />
          <Text style={styles.cityText}>{cidade}</Text>
        </View>

        <View style={styles.bottomRow}>
          {/* PREÇO */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>R$ {preco.toFixed(0)}</Text>
            <Text style={styles.hour}>/hora</Text>
          </View>

          {/* VER RESERVAS */}
          <View style={styles.reservasButton}>
            <Ionicons name="calendar-outline" size={16} color={colors.primary} />
            <Text style={styles.reservasText}>Ver reservas</Text>
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
    height: 170,
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
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  reservasButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0, 194, 110, 0.12)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },

  reservasText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 13,
  },
});