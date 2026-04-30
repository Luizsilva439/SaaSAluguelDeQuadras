import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./stylesCustomInput";
import { colors } from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    value: string;
    onChange: (text: string) => void;
};

export default function CustomAmountInput({ value, onChange }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Outro valor</Text>

            <View style={styles.inputRow}>
                <Text style={styles.prefix}>R$</Text>

                <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="0,00"
                    placeholderTextColor={colors.gray}
                    keyboardType="numeric"
                    style={styles.input}
                />

                <Ionicons name="pencil" size={18} color="#00C287" />
            </View>
        </View>
    );
}