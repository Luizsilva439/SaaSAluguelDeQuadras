import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        justifyContent: "space-between",
    },

    button: {
        width: "30%",
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#00C287",
        backgroundColor: "transparent",
        alignItems: "center",
    },

    selected: {
        backgroundColor: "#00C287",
    },

    text: {
        color: "#00C287",
        fontWeight: "700",
    },

    selectedText: {
        color: "#0F241F",
    },
});