import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "./stylesSummary";

type Props = {
  selectedHour: string;
  selectedDate: string;
  preco: number;
};

export default function Summary({ selectedHour, selectedDate, preco }: Props) {
  const startHour = Number(selectedHour.split(":")[0]);
  const endHour = startHour + 1;

  return (
    <>
      <Text style={styles.sectionTitle}>Resumo da reserva</Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryLeft}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={colors.primary}
            />
            <Text style={styles.summaryLabel}>Data</Text>
          </View>

          <Text style={styles.summaryValue}>{selectedDate}</Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryLeft}>
            <Ionicons name="time-outline" size={18} color={colors.primary} />
            <Text style={styles.summaryLabel}>Horário</Text>
          </View>

          <Text style={styles.summaryValue}>
            {selectedHour} - {endHour}:00
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryLeft}>
            <Ionicons name="cash-outline" size={18} color={colors.primary} />
            <Text style={styles.summaryLabel}>Preço</Text>
          </View>

          <Text style={styles.summaryPrice}>R$ {preco},00</Text>
        </View>
      </View>
    </>
  );
}