import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        marginTop: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingBottom: 10,
    },

    text: {
        color: colors.gray,
        fontSize: 13,
    },
});