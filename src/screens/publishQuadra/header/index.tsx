import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Pressable } from "react-native";
import Title from "../../../components/Title";
import { colors } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";



export default function Header(){
    const navigation = useNavigation<any>();

    return(
        <View style={styles.container}>
            <Pressable style={styles.arrowBack} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={30} color={colors.primary} />
            </Pressable>
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