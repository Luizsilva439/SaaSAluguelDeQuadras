import { View } from "react-native";
import IconProfile from "./iconProfile";
import { styles } from "./styles";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import Title from "../../../components/Title";


export default function InfoUser(){

    const { userName, email } = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <IconProfile />

            <View style={styles.infoUser}>
                <Title title={userName || "Usuário"} size={18} />
                <Title title={email || "Nenhum email cadastrado"} size={14} color="#666" />
            </View>
        </View>
    );
}