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

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
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

  readAllButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(0, 194, 110, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
  },

  emptyContainer: {
    marginTop: 90,
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

  card: {
    flexDirection: "row",
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: "flex-start",
  },

  cardUnread: {
    backgroundColor: "rgba(0, 194, 110, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(0, 194, 110, 0.2)",
  },

  iconContainer: {
    marginRight: 14,
    marginTop: 2,
  },

  contentContainer: {
    flex: 1,
  },

  notificationTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },

  textUnread: {
    color: colors.primary,
  },

  notificationMessage: {
    color: colors.gray,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },

  timeText: {
    color: "#666",
    fontSize: 11,
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginLeft: 10,
    marginTop: 6,
  },
});
