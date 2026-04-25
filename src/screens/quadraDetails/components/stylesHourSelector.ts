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

  hourGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  hourButton: {
    width: "22%",
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2e29",
    backgroundColor: "#111f1a",
    justifyContent: "center",
    alignItems: "center",
  },

  hourButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  hourButtonDisabled: {
    opacity: 0.3,
  },

  hourText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 13,
  },

  hourTextActive: {
    color: "#0b1210",
    fontWeight: "900",
  },

  hourTextDisabled: {
    color: colors.gray,
  },

  legendRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 14,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  legendAvailable: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },

  legendUnavailable: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: "#333",
  },

  legendText: {
    color: colors.gray,
    fontSize: 12,
    fontWeight: "600",
  },
});