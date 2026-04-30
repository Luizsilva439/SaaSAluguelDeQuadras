import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./stylesHeader";
import { colors } from "../../../constants/colors";

type Props = {
    onBack: () => void;
};

export default function Header({ onBack }: Props) {
    return (
        <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={onBack}>
                <Ionicons name="arrow-back" size={22} color={colors.text} />
            </Pressable>

            <Text style={styles.title}>Carteira</Text>

            <Pressable style={styles.helpButton}>
                <Ionicons name="help-circle-outline" size={24} color="#00C287" />
            </Pressable>
        </View>
    );
}