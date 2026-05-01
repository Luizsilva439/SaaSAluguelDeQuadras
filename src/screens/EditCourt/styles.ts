import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 40,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
  },

  scrollContent: {
    paddingBottom: 40,
  },

  formCard: {
    backgroundColor: colors.secondary,
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
  },

  textAreaContainer: {
    height: 100,
    paddingVertical: 12,
    alignItems: "flex-start",
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },

  textArea: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    width: "100%",
  },

  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },

  saveButtonText: {
    color: "#0F241F",
    fontSize: 16,
    fontWeight: "bold",
  },

  disabledButton: {
    opacity: 0.7,
  },
});
