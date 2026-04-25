import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  confirmButton: {
    marginTop: 22,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  confirmText: {
    color: "#0b1210",
    fontSize: 16,
    fontWeight: "900",
  },

  secureRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 40,
  },

  secureText: {
    color: colors.gray,
    fontSize: 12,
    fontWeight: "600",
  },
});