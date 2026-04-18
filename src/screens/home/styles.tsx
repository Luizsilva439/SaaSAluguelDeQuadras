import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  loadingBox: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});