import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  header: {
    paddingTop: 14,
    paddingBottom: 14,
  },

  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
  },

  emptyContainer: {
    marginTop: 70,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.secondary,
    borderRadius: 20,
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
});
