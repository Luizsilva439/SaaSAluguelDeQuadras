import React from "react";
import { View, Text } from "react-native";
import { styles } from "./stylesBalanceCard";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    saldo: number;
    totalAdded: number;
    totalUsed: number;
};

export default function BalanceCard({ saldo, totalAdded, totalUsed }: Props) {
    function formatMoney(value: number) {
        return value.toFixed(2).replace(".", ",");
    }

    return (
        <View style={styles.card}>
            <Text style={styles.label}>Saldo disponível</Text>
            <Text style={styles.value}>R$ {formatMoney(saldo)}</Text>

            <View style={styles.row}>
                <View style={styles.item}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="arrow-up" size={16} color="#00C287" />
                    </View>
                    <View>
                        <Text style={styles.smallLabel}>Total adicionado</Text>
                        <Text style={styles.smallValue}>R$ {formatMoney(totalAdded)}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.item}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="arrow-down" size={16} color="#00C287" />
                    </View>
                    <View>
                        <Text style={styles.smallLabel}>Total utilizado</Text>
                        <Text style={styles.smallValue}>R$ {formatMoney(totalUsed)}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}