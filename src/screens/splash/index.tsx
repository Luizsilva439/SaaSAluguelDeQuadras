import { View, Text } from "react-native";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const { session, loading } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading) {
      if (session) {
        (navigation as any).replace("TabNavigator");
      } else {
        (navigation as any).replace("Auth");
      }
    }
  }, [loading]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Carregando...</Text>
    </View>
  );
}