import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { View, Text, Pressable } from "react-native";
import ProfileComponent from "../../components/ProfileComponent";
import { styles } from "./styles";
import Title from "../../components/Title";
import { Ionicons } from "@expo/vector-icons";
import { strings } from "../../constants/strings";

export default function Home() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ flex: 1, backgroundColor: colors.background }} >
                <View style={styles.header}>
                    <ProfileComponent
                        image={false}
                        source={require('../../assets/imageTest.jpg')}
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

            </View>
        </SafeAreaView>
    );
} 