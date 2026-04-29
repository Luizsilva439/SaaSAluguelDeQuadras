import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Fundo sólido escuro e elegante
    justifyContent: "center",
    alignItems: "center",
  },
  lottieContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  logo: {
    width: 400,
    height: 400,
  },
  title: {
    marginTop: -10, // Aproxima o texto da imagem da logo, já que ela pode ter um espaço vazio em volta
    fontSize: 42,
    fontWeight: "900",
    color: colors.primary, // Verde vibrante da paleta
    letterSpacing: 3,
  },
});