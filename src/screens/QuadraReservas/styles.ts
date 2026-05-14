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
    marginBottom: 12,
  },

  clientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    marginRight: 10,
  },

  clientName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    flexShrink: 1,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },

  statusBadgeText: {
    fontSize: 12,
    fontWeight: "800",
  },

  statusPendente: {
    backgroundColor: "rgba(255, 193, 7, 0.12)",
    borderColor: "rgba(255, 193, 7, 0.3)",
  },

  statusPendenteText: {
    color: "#FFC107",
  },

  statusCheckin: {
    backgroundColor: "rgba(0, 194, 110, 0.12)",
    borderColor: "rgba(0, 194, 110, 0.3)",
  },

  statusCheckinText: {
    color: "#00C287",
  },

  statusCheckout: {
    backgroundColor: "rgba(100, 150, 255, 0.12)",
    borderColor: "rgba(100, 150, 255, 0.3)",
  },

  statusCheckoutText: {
    color: "#6496FF",
  },

  statusError: {
    backgroundColor: "rgba(255, 82, 82, 0.12)",
    borderColor: "rgba(255, 82, 82, 0.3)",
  },

  statusErrorText: {
    color: "#ff6666",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12,
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

  timesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },

  timeText: {
    color: colors.text,
    fontSize: 13,
    marginBottom: 4,
  },

  actionsGrid: {
    flexDirection: "row",
    gap: 10,
  },

  actionButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButton: {
    backgroundColor: "rgba(255, 82, 82, 0.12)",
    borderColor: "rgba(255, 82, 82, 0.3)",
  },

  cancelButtonText: {
    color: "#ff6666",
    fontWeight: "800",
    fontSize: 13,
  },

  finalizeButton: {
    backgroundColor: "rgba(100, 150, 255, 0.12)",
    borderColor: "rgba(100, 150, 255, 0.3)",
  },

  finalizeButtonText: {
    color: "#6496FF",
    fontWeight: "800",
    fontSize: 13,
  },

  disabledButton: {
    opacity: 0.5,
  },

  motivoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginTop: 10,
    marginBottom: 4,
    backgroundColor: "rgba(255, 82, 82, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 82, 82, 0.2)",
    borderRadius: 8,
    padding: 10,
  },

  motivoText: {
    color: "#ff8080",
    fontSize: 12,
    flex: 1,
    lineHeight: 17,
    fontStyle: "italic",
  },
});