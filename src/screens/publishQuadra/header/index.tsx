import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import Title from "../../../components/Title";
import { colors } from "../../../constants/colors";



export default function Header(){
    return(
        <View style={styles.container}>
            <Ionicons name="arrow-back-outline" size={30} color={colors.primary} style={styles.arrowBack}/>
            <Title title="Publicar Quadra"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60
    },
    arrowBack: {
        position: "absolute",
        top: 5,
        left: 30,
    }
})