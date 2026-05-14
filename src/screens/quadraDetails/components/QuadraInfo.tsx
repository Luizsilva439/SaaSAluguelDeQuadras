import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "./stylesQuadraInfo";

type Props = {
  titulo: string;
  cidade: string;
  preco: number;
  endereco: string;
  tipoEsporte: string;
  onContact?: () => void;
};

export default function QuadraInfo({
  titulo,
  cidade,
  preco,
  endereco,
  tipoEsporte,
  onContact,
}: Props) {
  return (
    <View style={styles.headerRow}>
      <View style={{ flex: 1, paddingRight: 10 }}>
        <Text style={styles.title}>{titulo}</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color={colors.primary} />
          <Text style={styles.cityText}>
            {cidade} • {endereco}
          </Text>
        </View>

        <View style={styles.ratingRow}>
          <Ionicons name="football-outline" size={16} color={colors.primary} />
          <Text style={styles.ratingText}>{tipoEsporte}</Text>
        </View>

        {onContact && (
          <Pressable 
            style={styles.whatsappButton} 
            onPress={onContact}
          >
            <Ionicons name="logo-whatsapp" size={16} color="#fff" />
            <Text style={styles.whatsappText}>Falar com proprietário</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.priceBox}>
        <Text style={styles.price}>R$ {preco}</Text>
        <Text style={styles.hour}>/ hora</Text>
      </View>
    </View>
  );
}