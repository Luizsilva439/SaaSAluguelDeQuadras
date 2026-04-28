import { View } from "react-native";
import { styles } from "./styles";
import Title from "../../../components/Title";
import OpcoesRapidas from "./opcoesRapidas";
import { useNavigation } from "@react-navigation/native";

export default function AcessoRapido() {
  const navigation = useNavigation<any>();

  function handleNavigateToMyCourts() {
    console.log("Navegando para Minhas Quadras");
    navigation.navigate("MyCourts");
  }

  function handleNavigateToMyReservas() {
    console.log("Navegando para Minhas Reservas");
    navigation.navigate("MyReservas"); // cria essa rota depois
  }

  return (
    <View style={styles.container}>
      <Title title="Acesso rápido" size={20} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <OpcoesRapidas
          title="Minhas Quadras"
          iconOptions={true}
          subTitle="Gerencie suas quadras publicadas"
          onPress={handleNavigateToMyCourts}
        />

        <OpcoesRapidas
          title="Minhas Reservas"
          iconOptions={false}
          subTitle="Acompanhe suas reservas"
          onPress={handleNavigateToMyReservas}
        />
      </View>
    </View>
  );
}