import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "./stylesConfirmButton";

import New_buttom from "../../../components/New_buttom"; 
// ajuste o caminho conforme sua pasta

type Props = {
  onConfirm: () => void;
  isLoading?: boolean;
};

export default function ConfirmButton({ onConfirm, isLoading = false }: Props) {
  return (
    <>
      <New_buttom
        title="Confirmar reserva"
        isClicked={true}
        isLoading={isLoading}
        onPress={onConfirm}
        height={56}
        color={colors.primary}
        colorText={colors.background}
        titleSize={16}
        borderWidth={0}
      />

      <View style={styles.secureRow}>
        <Ionicons name="lock-closed-outline" size={14} color={colors.gray} />
        <Text style={styles.secureText}>Pagamento seguro</Text>
      </View>
    </>
  );
}