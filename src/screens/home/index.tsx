import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { styles } from "./styles";
import TopHome from "./components/topHome";
import { supabase } from "../../services/supabase";
import { useEffect, useState } from "react";
import MainHome from "./Main";

export default function Home() {

  async function loadUserData() {
   
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <SafeAreaView style={styles.mainContent}>
      <View style={styles.mainContent}>
        <TopHome/>
        <MainHome />
      </View>
    </SafeAreaView>
  );
}