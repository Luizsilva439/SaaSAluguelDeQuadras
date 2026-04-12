import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { View, Text, Platform } from "react-native";
import { styles } from "./styles";
import New_buttom from "../../components/New_buttom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Title from "../../components/Title";
import InfoUser from "./infoUser";
import NewQuadra from "./newQuadra";
import AcessoRapido from "./acessoRapido";
import DateUser from "./dateUser";


export default function Profile() {

    const { email, logout } = useContext(AuthContext);
    const navigation = useNavigation();

    const[margimTop, setMargimTop] = useState(30)

    useEffect(() => {
        if(Platform.OS === 'ios'){
            setMargimTop(40)
        }
    }, [])

    function handleLogout() {
        logout();
        (navigation as any).replace("Auth");
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 10, paddingVertical: 20, paddingTop: margimTop}} >

            <Title title="Perfil" />


            <View style={styles.container}>

                <InfoUser />

                <NewQuadra />

                <AcessoRapido />

                <DateUser />

                <View style={styles.continerLogout}>
                    <New_buttom
                        borderWidth={2}
                        borderColor="red"
                        color="transparent"
                        isClicked={true}
                        title="Sair da Conta"
                        colorText="red"
                        onPress={handleLogout}
                    />
                </View>
            </View>
        </View>
    );
}