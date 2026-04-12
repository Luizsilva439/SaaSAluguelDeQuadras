import { View, Text, Image } from "react-native";
import { colors } from "../constants/colors";
import Title from "./Title";

type Props = {
    titulo: string;
    cidade: string;
    preco: number;
    imagem?: string;
};

export default function CardFeed({ titulo, cidade, preco, imagem }: Props) {
    return (
        <View style={{ padding: 12, borderRadius: 10, backgroundColor: colors.secondary, marginBottom: 12, margin: 15, elevation: 3 }}>

            {imagem && (
                <Image
                    source={{ uri: imagem }}
                    style={{ width: "100%", height: 150, borderRadius: 10, marginBottom: 10 }}
                />
            )}


            <Title
                title={titulo}
                marginBottom={5}
            />

            <Text style={{ color: "gray" }}>{cidade}</Text>
            
            <View style={{ flexDirection: "row", marginTop: 5}}>
                <Title title="R$ " size={16}/>
                <Title title={preco.toFixed(0)} size={16} />
                <Title title="/hora" size={16} />
            </View>
        </View>
    );
}