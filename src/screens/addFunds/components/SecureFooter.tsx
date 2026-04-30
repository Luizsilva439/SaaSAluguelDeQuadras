import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./stylesSecureFooter";

export default function SecureFooter() {
    return (
        <View style={styles.container}>
            <Ionicons name="lock-closed" size={16} color="#00C287" />
            <Text style={styles.text}>Pagamento 100% seguro</Text>
        </View>
    );
}