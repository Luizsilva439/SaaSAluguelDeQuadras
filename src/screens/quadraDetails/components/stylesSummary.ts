import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 22,
    marginBottom: 12,
  },

  summaryCard: {
    marginTop: 10,
    backgroundColor: "#111f1a",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1f2e29",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  summaryLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  summaryLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
  },

  summaryValue: {
    color: colors.gray,
    fontSize: 13,
    fontWeight: "600",
  },

  summaryPrice: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
  },
});