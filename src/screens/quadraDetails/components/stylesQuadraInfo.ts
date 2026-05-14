import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },

  cityText: {
    color: colors.gray,
    fontSize: 14,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },

  ratingText: {
    color: colors.gray,
    fontSize: 13,
    fontWeight: "600",
  },

  priceBox: {
    alignItems: "flex-end",
  },

  price: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "900",
  },

  hour: {
    color: colors.gray,
    fontSize: 13,
    marginTop: 2,
  },

  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#25D366",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: "flex-start",
    gap: 6,
  },

  whatsappText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});