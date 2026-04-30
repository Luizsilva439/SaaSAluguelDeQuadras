import React from "react";
import { View, Text } from "react-native";
import { styles } from "./stylesPayment";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentMethod() {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <View style={styles.icon}>
                    <Ionicons name="flash" size={20} color="#00C287" />
                </View>

                <View>
                    <Text style={styles.title}>PIX</Text>
                    <Text style={styles.subtitle}>Aprovação imediata</Text>
                </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#00C287" />
        </View>
    );
}