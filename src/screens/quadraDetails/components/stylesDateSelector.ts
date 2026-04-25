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

  dateRow: {
    flexDirection: "row",
    gap: 10,
    paddingBottom: 6,
  },

  dateButton: {
    width: 90,
    height: 64,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1f2e29",
    backgroundColor: "#111f1a",
    justifyContent: "center",
    alignItems: "center",
  },

  dateButtonActive: {
    borderColor: colors.primary,
    backgroundColor: "#172b24",
  },

  dateLabel: {
    color: colors.gray,
    fontSize: 12,
    fontWeight: "700",
  },

  dateNumber: {
    color: colors.gray,
    fontSize: 12,
    marginTop: 4,
  },

  dateLabelActive: {
    color: colors.text,
  },

  calendarButton: {
    width: 60,
    height: 64,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1f2e29",
    backgroundColor: "#111f1a",
    justifyContent: "center",
    alignItems: "center",
  },
});