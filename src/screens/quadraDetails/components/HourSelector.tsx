import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./stylesHourSelector";

type Props = {
  horarios: string[];
  selectedHour: string;
  onSelectHour: (value: string) => void;
  isAvailable: (hour: string) => boolean;
};

export default function HourSelector({
  horarios,
  selectedHour,
  onSelectHour,
  isAvailable,
}: Props) {
  return (
    <>
      <Text style={styles.sectionTitle}>Escolha o horário</Text>

      <View style={styles.hourGrid}>
        {horarios.map((hour) => {
          const available = isAvailable(hour);
          const active = selectedHour === hour;

          return (
            <Pressable
              key={hour}
              disabled={!available}
              onPress={() => onSelectHour(hour)}
              style={[
                styles.hourButton,
                active && styles.hourButtonActive,
                !available && styles.hourButtonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.hourText,
                  active && styles.hourTextActive,
                  !available && styles.hourTextDisabled,
                ]}
              >
                {hour}
              </Text>
            </Pressable>
          );
        })}
      </View>

    </>
  );
}