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
    marginBottom: 18,
    marginTop: 40
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
    fontSize: 18,
    fontWeight: "800",
  },

  // EMPTY
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

  // CARD RESERVA
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  clientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  clientName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
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
});