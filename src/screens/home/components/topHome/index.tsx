import { colors } from "../../../../constants/colors";
import { View, Pressable, TextInput } from "react-native";
import ProfileComponent from "../../../../components/ProfileComponent";
import { styles } from "./styles";
import Title from "../../../../components/Title";
import { Ionicons } from "@expo/vector-icons";
import { strings } from "../../../../constants/strings";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";



export default function TopHome() {
    const { userName } = useContext(AuthContext);

    return (
        <View style={styles.top}>
            <View style={styles.header}>
                <View style={styles.header_content}>
                    <Title
                        title={strings.projectName}
                        size={20}
                    />

                   
                </View>
            </View>

            <View style={styles.defaultTitle}>
                <Title title="Bem-vindo, " size={24} /><Title title={(userName as any)} size={24} />
            </View>

            <View>
                <Pressable style={styles.searchBar}>
                    <Ionicons name="search" size={25} color={colors.tertiary} style={{marginRight: 8}}/>
                    <TextInput 
                    placeholder="Search  for courts"
                    placeholderTextColor={colors.tertiary} />   
                </Pressable>
            </View>

        </View>
    );
}