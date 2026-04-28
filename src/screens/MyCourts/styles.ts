import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 40
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
  },

  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  // EMPTY STATE
  emptyContainer: {
    marginTop: 90,
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
    backgroundColor: colors.secondary,
    borderRadius: 18,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 15,
  },

  emptySubtitle: {
    color: colors.gray,
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 18,
  },

  emptyButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },

  emptyButtonText: {
    color: colors.background,
    fontWeight: "800",
    fontSize: 14,
  },
});