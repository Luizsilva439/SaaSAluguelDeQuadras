import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useEffect } from "react";
import { supabase } from "../../services/supabase";
import { useNavigation } from "@react-navigation/native";

export default function SplashScream() {
  const navigation = useNavigation();

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.log("Erro ao pegar sessão:", error.message);
      }

      setTimeout(() => {
        if (data.session) {
          (navigation as any).replace("TabNavigator");
        } else {
          (navigation as any).replace("Auth");
        }
      }, 2000);
    }

    checkSession();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Carregando...</Text>
      </View>
    </SafeAreaView>
  );
}