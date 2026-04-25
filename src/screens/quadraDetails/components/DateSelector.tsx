import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "./stylesDateSelector";

type Props = {
  datas: { label: string; date: string; value: string }[];
  selectedDate: string;
  onSelectDate: (value: string) => void;
};

export default function DateSelector({
  datas,
  selectedDate,
  onSelectDate,
}: Props) {
  const [showPicker, setShowPicker] = useState(false);

  function handleOpenPicker() {
    setShowPicker(true);
  }

  function handleChange(event: any, date?: Date) {
    setShowPicker(false);

    if (!date) return;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataSelecionada = new Date(date);
    dataSelecionada.setHours(0, 0, 0, 0);

    if (dataSelecionada < hoje) {
      return;
    }

    const value = dataSelecionada.toISOString().split("T")[0];
    onSelectDate(value);
  }

  return (
    <>
      <Text style={styles.sectionTitle}>Escolha a data</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.dateRow}>
          {datas.map((item) => {
            const active = selectedDate === item.value;

            return (
              <Pressable
                key={item.value}
                style={[styles.dateButton, active && styles.dateButtonActive]}
                onPress={() => onSelectDate(item.value)}
              >
                <Text
                  style={[styles.dateLabel, active && styles.dateLabelActive]}
                >
                  {item.label}
                </Text>

                <Text
                  style={[styles.dateNumber, active && styles.dateLabelActive]}
                >
                  {item.date}
                </Text>
              </Pressable>
            );
          })}

          {/* BOTÃO CALENDÁRIO */}
          <Pressable style={styles.calendarButton} onPress={handleOpenPicker}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.primary}
            />
          </Pressable>
        </View>
      </ScrollView>

      {showPicker && (
        <DateTimePicker
          value={new Date(selectedDate)}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={new Date()}
          onChange={handleChange}
        />
      )}
    </>
  );
}