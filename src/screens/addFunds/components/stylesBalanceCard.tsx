import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: "#142F29",
        borderRadius: 18,
        padding: 20,
        marginTop: 10,
    },

    label: {
        fontSize: 14,
        color: colors.gray,
        marginBottom: 6,
    },

    value: {
        fontSize: 34,
        fontWeight: "800",
        color: colors.text,
        marginBottom: 18,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
    },

    divider: {
        width: 1,
        height: 35,
        backgroundColor: "#1F4A40",
        marginHorizontal: 12,
    },

    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#0F241F",
        justifyContent: "center",
        alignItems: "center",
    },

    smallLabel: {
        fontSize: 12,
        color: colors.gray,
    },

    smallValue: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.text,
    },
});