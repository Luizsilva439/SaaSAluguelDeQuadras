import { View } from "react-native"
import { styles } from "./styles";
import Header from "./header";
import Main from "./mainContent"

export default function PublishQuadra(){
    return(
        <View style={styles.container}>
            <Header />

            <Main />
        </View>
    );
}