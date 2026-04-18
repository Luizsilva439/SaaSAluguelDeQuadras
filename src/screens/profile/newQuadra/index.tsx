import { StyleSheet, TouchableOpacity } from "react-native";
import Title from "../../../components/Title";
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";

export default function NewQuadra() {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => (navigation as any).navigate("PublishQuadra")}
        >
            <AntDesign name="plus" size={24} color="white" marginRight={10} />
            <Title title="Publicar Quadra" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        padding: 11,
        marginTop: 20,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    }
});