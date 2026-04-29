import { colors } from "../../../../constants/colors";
import { View, Pressable, TextInput, Image } from "react-native";
import ProfileComponent from "../../../../components/ProfileComponent";
import { styles } from "./styles";
import Title from "../../../../components/Title";
import { Ionicons } from "@expo/vector-icons";
import { strings } from "../../../../constants/strings";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";

type Props = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

export default function TopHome({ searchQuery, setSearchQuery }: Props) {
    const { userName } = useContext(AuthContext);

    return (
        <View style={styles.top}>
            <View style={styles.header}>
                <View style={styles.header_content}>
                    <Image
                        source={require('../../../../assets/header_feed.png')}
                        style={{ height: 40, width: 160 }}
                    />
                </View>
            </View>

            <View style={styles.defaultTitle}>
                <Title title="Bem-vindo, " size={24} />
                <Title title={(userName as string) || ""} size={24} />
            </View>

            <View>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={22} color={colors.tertiary} style={{ marginRight: 8 }} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar quadras ou cidades"
                        placeholderTextColor={colors.tertiary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {searchQuery.length > 0 && (
                        <Pressable onPress={() => setSearchQuery("")} style={styles.clearButton}>
                            <Ionicons name="close-circle" size={20} color={colors.tertiary} />
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    );
}