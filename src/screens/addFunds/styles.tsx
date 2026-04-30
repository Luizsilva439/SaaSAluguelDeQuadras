import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F241F",
    paddingTop: 50,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  logoArea: {
    alignItems: "center",
    marginBottom: 10,
  },

  logoText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#00C287",
    letterSpacing: 1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginTop: 20,
    marginBottom: 12,
  },

  mainButton: {
    backgroundColor: "#00C287",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },

  mainButtonDisabled: {
    opacity: 0.6,
  },

  mainButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F241F",
  },
});