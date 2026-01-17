import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text} from "react-native";

import { styles } from "./styles";

import TopHome from "./components/topHome";

export default function Home() {
    return (
        <SafeAreaView style={styles.mainContent}>
            <View style={styles.mainContent}>
                <TopHome />
                <View style={{flex: 1}}></View>
                <View style={{flex: 1}}></View>
            </View>
        </SafeAreaView >
    );
} 