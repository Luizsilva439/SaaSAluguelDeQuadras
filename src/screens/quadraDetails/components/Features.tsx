import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "./stylesFeatures";

export default function Features() {
  return (
    <View style={styles.featuresRow}>
      <View style={styles.featureChip}>
        <Ionicons name="football-outline" size={16} color={colors.primary} />
        <Text style={styles.featureText}>Futebol Society</Text>
      </View>

      <View style={styles.featureChip}>
        <Ionicons name="sunny-outline" size={16} color={colors.primary} />
        <Text style={styles.featureText}>Iluminação LED</Text>
      </View>

      <View style={styles.featureChip}>
        <Ionicons name="shirt-outline" size={16} color={colors.primary} />
        <Text style={styles.featureText}>Vestiários</Text>
      </View>

      <View style={styles.featureChip}>
        <Ionicons name="car-outline" size={16} color={colors.primary} />
        <Text style={styles.featureText}>Estacionamento</Text>
      </View>
    </View>
  );
}