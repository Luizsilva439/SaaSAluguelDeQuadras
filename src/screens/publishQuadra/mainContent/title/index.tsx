import { StyleSheet, View, Image } from "react-native";
import Title from "../../../../components/Title";
import { colors } from "../../../../constants/colors";

export default function TitleMain() {
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Title title="Vamos publicar sua quadra!" size={19} />

        <Title
          title="Preencha as informações abaixo para criar seu anúncio."
          size={14}
          fontWeight="300"
          color={colors.gray}
          marginTop={6}
        />
      </View>

      <Image
        source={require("../../../../assets/iconFutebol.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  textBox: {
    flex: 1,
    flexShrink: 1, 
    marginRight: 12,
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});