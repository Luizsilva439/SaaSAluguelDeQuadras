import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { View, Text } from "react-native";


export default function Profile(){
    return(
        <SafeAreaView style={{flex:1, backgroundColor: colors.background}}>
            <View style={{flex:1, backgroundColor: colors.background}} ><Text>Profile</Text></View>
        </SafeAreaView>
    );
}