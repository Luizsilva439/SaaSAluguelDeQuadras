import { View } from "react-native";
import { styles } from "./styles";
import Title from "../../../components/Title";
import OpcoesRapidas from "./opcoesRapidas";

export default function AcessoRapido() {

    return (
        <View style={styles.container}>

            <Title title="Acesso rápido" size={20}/>

            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 0}}>
                <OpcoesRapidas 
                    title="Minhas Quadras"
                    iconOptions={true}
                    subTitle="Gerencie suas quadras publicadas"
                />
                <OpcoesRapidas 
                    title="Minhas Reservas"
                    iconOptions={false}
                    subTitle="Acompanhe suas reservas"
                />
            </View>
        </View>
    );
}