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

  extraInfoContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
  },

  extraInfoTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
  },

  extraInfoText: {
    color: colors.gray,
    fontSize: 12,
    marginTop: 2,
  },

  actionsGrid: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  actionButton: {
    flex: 1,
    minWidth: "45%",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  checkinButton: {
    backgroundColor: "rgba(0, 194, 110, 0.12)",
    borderColor: "rgba(0, 194, 110, 0.3)",
  },

  checkinButtonText: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 13,
  },

  detailsButton: {
    backgroundColor: "rgba(100, 150, 255, 0.12)",
    borderColor: "rgba(100, 150, 255, 0.3)",
  },

  detailsButtonText: {
    color: "#6496FF",
    fontWeight: "800",
    fontSize: 13,
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

  disabledButton: {
    opacity: 0.5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2a5b4d",
  },

  modalTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },

  modalSubtitle: {
    color: colors.gray,
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 18,
  },

  modalInput: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    color: colors.text,
    minHeight: 80,
    padding: 12,
    fontSize: 14,
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },

  modalButton: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  modalButtonCancel: {
    backgroundColor: "transparent",
    borderColor: "#2a5b4d",
  },

  modalButtonCancelText: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 14,
  },

  modalButtonConfirm: {
    backgroundColor: "rgba(255, 82, 82, 0.15)",
    borderColor: "rgba(255, 82, 82, 0.4)",
  },

  modalButtonConfirmText: {
    color: "#ff6666",
    fontWeight: "800",
    fontSize: 14,
  },
});
