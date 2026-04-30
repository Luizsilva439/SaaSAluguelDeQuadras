import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#142F29",
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    icon: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#0F241F",
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        color: colors.text,
        fontSize: 15,
        fontWeight: "700",
    },

    subtitle: {
        color: colors.gray,
        fontSize: 12,
    },
});