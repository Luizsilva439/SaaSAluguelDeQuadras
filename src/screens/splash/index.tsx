import { View, Text, Animated, Easing, Image } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { styles } from "./styles";

const animationData = require("../../assets/animations/Water Splash.json");
const logoImg = require("../../assets/logo.png");

export default function SplashScreen() {
  const { session, loading } = useContext(AuthContext);
  const navigation = useNavigation();

  const [lottieFinished, setLottieFinished] = useState(false);

  const lottieOpacity = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const handleLottieFinish = () => {
    Animated.sequence([
      Animated.timing(lottieOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1500, // Logo fade-in lenta de 1.5s
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Exibe a logo por mais 1.5s antes de prosseguir
      setTimeout(() => {
        setLottieFinished(true);
      }, 1500);
    });
  };

  useEffect(() => {
    if (lottieFinished && !loading) {
      if (session) {
        (navigation as any).replace("TabNavigator");
      } else {
        (navigation as any).replace("Auth");
      }
    }
  }, [loading, lottieFinished, session, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.lottieContainer, { opacity: lottieOpacity }]}>
        <LottieView
          source={animationData}
          autoPlay
          loop={false}
          onAnimationFinish={handleLottieFinish}
          style={styles.lottie}
        />
      </Animated.View>

      <Animated.View
        style={[styles.logoContainer, { opacity: logoOpacity }]}
        pointerEvents="none"
      >
        <Image source={logoImg} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>JarenaZ</Text>
      </Animated.View>
    </View>
  );
}