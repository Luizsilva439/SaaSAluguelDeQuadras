import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  imageWrapper: {
    width: "100%",
    height: 260,
    backgroundColor: "#000",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  noImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#16352d",
    justifyContent: "center",
    alignItems: "center",
  },

  noImageText: {
    color: colors.gray,
    marginTop: 6,
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  rightButtons: {
    position: "absolute",
    top: 40,
    right: 16,
    flexDirection: "row",
    gap: 10,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    left: 16,
    bottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1c3a2b",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 10,
  },

  badgeText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 13,
  },

  counter: {
    position: "absolute",
    right: 16,
    bottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 10,
  },

  counterText: {
    color: colors.text,
    fontWeight: "700",
  },
  leftArrow: {
    position: "absolute",
    top: "50%",
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -20 }],
  },

  rightArrow: {
    position: "absolute",
    top: "50%",
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -20 }],
  },
});