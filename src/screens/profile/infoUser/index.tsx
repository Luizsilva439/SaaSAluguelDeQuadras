import { View, Pressable } from "react-native";
import IconProfile from "./iconProfile";
import { styles } from "./styles";
import { AuthContext } from "../../../contexts/AuthContext";
import { useCallback, useContext, useState } from "react";
import Title from "../../../components/Title";
import { supabase } from "../../../services/supabase";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function InfoUser() {
  const { userName, email } = useContext(AuthContext);
  const [saldo, setSaldo] = useState<number>(0);
  const navigation = useNavigation<any>();

  async function fetchSaldo() {
    const user = await supabase.auth.getUser();

    if (!user.data.user) return;

    const { data, error } = await supabase
      .from("Users")
      .select("saldo")
      .eq("id", user.data.user.id)
      .single();

    if (!error && data) {
      setSaldo(data.saldo || 0);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchSaldo();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <IconProfile />

        <View style={styles.infoUser}>
          <Title title={userName || "Usuário"} size={18} />
          <Title
            title={email || "Nenhum email cadastrado"}
            size={13}
            color={colors.gray}
          />
        </View>
      </View>

      {/* SALDO */}
      <Pressable style={styles.balanceBox} onPress={() => navigation.navigate("AddFunds")}>
        <Ionicons name="wallet-outline" size={18} color={colors.primary} />
        <Title
          title={`R$ ${saldo.toFixed(2)}`}
          size={15}
          color={colors.primary}
        />
      </Pressable>
    </View>
  );
}