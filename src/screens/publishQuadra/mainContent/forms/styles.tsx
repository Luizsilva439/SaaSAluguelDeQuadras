
import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        gap: 18,
    },

    block: {
        gap: 10,
    },

    label: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "600",
    },

    subLabel: {
        color: colors.gray,
        fontSize: 13,
        marginTop: -6,
    },
    pickerBox: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#2a5b4d",
        height: 55,
        justifyContent: "center",
        paddingHorizontal: 6,
    },

    picker: {
        color: colors.text,
        height: 55,
        width: "100%",
    },
    inputBox: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "#2a5b4d",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    input: {
        color: colors.text,
        flex: 1,
        fontSize: 14,
    },

    counter: {
        color: colors.gray,
        fontSize: 12,
        marginLeft: 10,
    },

    textAreaBox: {
        alignItems: "flex-end",
    },

    textArea: {
        height: 90,
        textAlignVertical: "top",
    },

    row: {
        flexDirection: "row",
        gap: 12,
    },

    half: {
        flex: 1,
    },

    inputBoxRow: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "#2a5b4d",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    inputRow: {
        flex: 1,
        color: colors.text,
        fontSize: 14,
    },

    selectBox: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: "#2a5b4d",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    selectText: {
        color: colors.text,
        fontSize: 14,
    },

    priceBox: {
        flexDirection: "row",
        backgroundColor: colors.secondary,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#2a5b4d",
        overflow: "hidden",
    },

    currency: {
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 1,
        borderRightColor: "#2a5b4d",
    },

    currencyText: {
        color: colors.gray,
        fontWeight: "600",
    },

    priceInput: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 14,
        color: colors.text,
        fontSize: 14,
    },

    photosContainer: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderStyle: "dashed",
        borderRadius: 14,
        padding: 10,
    },

    addPhoto: {
        width: 140,
        height: 110,
        borderRadius: 14,
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        gap: 8,
    },

    addPhotoText: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: "600",
    },

    photoCard: {
        width: 140,
        height: 110,
        borderRadius: 14,
        overflow: "hidden",
        marginRight: 12,
        position: "relative",
    },

    photo: {
        width: "100%",
        height: "100%",
    },

    removeButton: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },

    infoBox: {
        flexDirection: "row",
        backgroundColor: colors.secondary,
        borderRadius: 14,
        padding: 14,
        gap: 12,
        alignItems: "center",
    },

    infoIcon: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.tertiary,
        justifyContent: "center",
        alignItems: "center",
    },

    infoText: {
        flex: 1,
        color: colors.gray,
        fontSize: 13,
        lineHeight: 18,
    },

    button: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 10,
    },

    buttonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "700",
    },
});