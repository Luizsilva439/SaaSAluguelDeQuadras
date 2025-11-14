import { View } from 'react-native';
import Splash from '../../components/Splash';
import { SafeAreaView } from "react-native-safe-area-context";


export default function SplashScream() {
    return (
        <SafeAreaView>
            <View>
                <Splash/>
            </View>
        </SafeAreaView>
    )
}