import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#142F29",
        borderRadius: 16,
        padding: 14,
        marginTop: 16,
    },

    label: {
        color: colors.gray,
        fontSize: 13,
        marginBottom: 10,
    },

    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    prefix: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
        marginRight: 8,
    },

    input: {
        flex: 1,
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
    },
});