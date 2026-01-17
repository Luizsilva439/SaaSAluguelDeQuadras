import { colors } from "../../../../constants/colors";
import { View, Pressable, TextInput } from "react-native";
import ProfileComponent from "../../../../components/ProfileComponent";
import { styles } from "./styles";
import Title from "../../../../components/Title";
import { Ionicons } from "@expo/vector-icons";
import { strings } from "../../../../constants/strings";

export default function TopHome() {
    return (
        <View style={styles.top}>
            <View style={styles.header}>
                <ProfileComponent
                    image={false}
                    source={require('../../../../assets/imageTest.jpg')}
                />
                <View style={styles.header_content}>
                    <Title
                        title={strings.projectName}
                        size={20}
                    />

                    <Pressable>
                        <Ionicons name="notifications" size={25} color={colors.text} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.defaultTitle}>
                <Title title="Hello, " size={24} /><Title title="User" size={24} />
            </View>

            <View style={styles.search}>
                <Pressable style={styles.searchBar}>
                    <Ionicons name="search" size={25} color={colors.tertiary} style={{marginRight: 8}}/>
                    <TextInput 
                    placeholder="Search  for courts"
                    placeholderTextColor={colors.tertiary} />   
                </Pressable>
            </View>

            <View style={styles.defaultTitle}>
                <Title title="Recommended" />
            </View>
        </View>
    );
}