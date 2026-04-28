import { View, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors } from "../../../constants/colors";
import Title from "../../../components/Title";

type Props = {
  title: string;
  subTitle: string;
  iconOptions: boolean;
  onPress?: () => void;
};

export default function OpcoesRapidas({
  title,
  subTitle,
  iconOptions,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.icon}>
          {iconOptions ? (
            <MaterialIcons name="sports-soccer" size={35} color={colors.primary} />
          ) : (
            <FontAwesome5 name="calendar-alt" size={30} color={colors.primary} />
          )}
        </View>

        <MaterialIcons name="arrow-forward-ios" size={20} color={colors.primary} />
      </View>

      <View style={styles.descricao}>
        <View style={{ gap: 10 }}>
          <Title title={title} size={15} />
          <Title title={subTitle} size={12} color="gray" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 15,
    elevation: 10,
  },

  descricao: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
  },
});