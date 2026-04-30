import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#142F29",
        alignItems: "center",
        justifyContent: "center",
    },

    helpButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#142F29",
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
    },
});