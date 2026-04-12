import { View } from "react-native";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import { colors } from "../../../constants/colors";
import Title from "../../../components/Title";

export default function IconProfile(){

    const { userName } = useContext(AuthContext);

    return(
        <View style={{ backgroundColor: colors.tertiary, width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
            <Title title={userName?.charAt(0).toUpperCase()} color={colors.background} size={24}/>
        </View>
    );
}