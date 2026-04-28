import { View } from "react-native";
import IconProfile from "./iconProfile";
import { styles } from "./styles";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Title from "../../../components/Title";
import { supabase } from "../../../services/supabase";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";

export default function InfoUser() {
  const { userName, email } = useContext(AuthContext);
  const [saldo, setSaldo] = useState<number>(0);

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

  useEffect(() => {
    fetchSaldo();
  }, []);

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
      <View style={styles.balanceBox}>
        <Ionicons name="wallet-outline" size={18} color={colors.primary} />
        <Title
          title={`R$ ${saldo.toFixed(2)}`}
          size={15}
          color={colors.primary}
        />
      </View>
    </View>
  );
}