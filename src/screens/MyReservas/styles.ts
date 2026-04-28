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

  rightSpacer: {
    width: 42,
    height: 42,
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
    backgroundColor: colors.secondary,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 10,
  },

  quadraName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    flex: 1,
  },

  statusBadge: {
    backgroundColor: "rgba(0, 194, 110, 0.12)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0, 194, 110, 0.3)",
  },

  statusBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
  },

  statusCancelled: {
    backgroundColor: "rgba(255, 82, 82, 0.12)",
    borderColor: "rgba(255, 82, 82, 0.3)",
  },

  statusCancelledText: {
    color: "#ff6666",
  },

  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 12,
  },

  cityText: {
    color: colors.gray,
    fontSize: 13,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  infoText: {
    color: colors.gray,
    fontSize: 13,
    fontWeight: "600",
  },

  actionsRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
  },

  detailsButton: {
    flex: 1,
    backgroundColor: "rgba(0, 194, 110, 0.12)",
    borderColor: "rgba(0, 194, 110, 0.25)",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: "center",
  },

  detailsButtonText: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 13,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "rgba(255, 82, 82, 0.12)",
    borderColor: "rgba(255, 82, 82, 0.25)",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#ff6666",
    fontWeight: "800",
    fontSize: 13,
  },

  disabledButton: {
    opacity: 0.5,
  },
});
