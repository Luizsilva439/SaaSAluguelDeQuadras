import { StyleSheet, View } from "react-native";
import Title from "../../../components/Title";
import { colors } from "../../../constants/colors";
import Feather from '@expo/vector-icons/Feather';
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function DateUser() {

    const { userName, email, created_at } = useContext<any>(AuthContext);

    const membroDesde = new Date(created_at).toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
    });

    return (
        <View style={{ flex: 1, paddingTop: 30 }}>
            <Title title="Informaçōes" size={20} />
            <View style={styles.container}>

                <View style={styles.secundaryContainer}>
                    <Feather name="user" size={24} color={colors.primary} />
                    <View>
                        <Title title="Nome" color={colors.primary} size={18} />
                        <Title title={userName} size={15} marginBottom={5} />
                    </View>
                </View>

                <View style={styles.secundaryContainer}>
                    <SimpleLineIcons name="envelope" size={24} color={colors.primary} />
                    <View>
                        <Title title="E-mail" color={colors.primary} size={18} />
                        <Title title={email} size={15} marginBottom={5} />
                    </View>
                </View>

                <View style={styles.tertiaryContainer}>
                    <Ionicons name="calendar-outline" size={24} color={colors.primary} />
                    <View>
                        <Title title="Menbro desde" color={colors.primary} size={18} />
                        <Title title={membroDesde} size={15} marginBottom={5} />
                    </View>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: colors.secondary,
        borderRadius: 15,
        borderColor: "gray",
        paddingVertical: 5,
        marginTop: 10,
        elevation: 10
    },
    secundaryContainer: {
        paddingStart: 10,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
        gap: 20,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        paddingVertical: 5
    },
    tertiaryContainer: {
        paddingStart: 10,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
        gap: 20,
        paddingTop: 5
    },
})