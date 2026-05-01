import { colors } from "../../../../constants/colors";
import { View, Pressable, TextInput, Image, Text } from "react-native";
import { styles } from "./styles";
import Title from "../../../../components/Title";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../../services/supabase";
import { subscribeToTables } from "../../../../services/realtime";

type Props = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

export default function TopHome({ searchQuery, setSearchQuery }: Props) {
    const { userName } = useContext(AuthContext);
    const navigation = useNavigation<any>();
    const [unreadCount, setUnreadCount] = useState(0);

    async function fetchUnreadCount() {
        const user = await supabase.auth.getUser();
        if (!user.data.user) return;

        const { count, error } = await supabase
            .from("notifications")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.data.user.id)
            .eq("read", false);

        if (!error) {
            setUnreadCount(count || 0);
        }
    }

    useEffect(() => {
        fetchUnreadCount();
    }, []);

    useEffect(() => {
        let isMounted = true;
        let unsubscribe = () => {};

        async function setupRealtime() {
            const user = await supabase.auth.getUser();
            if (!isMounted || !user.data.user) return;

            unsubscribe = subscribeToTables(
                [{ table: "notifications", filter: `user_id=eq.${user.data.user.id}` }],
                () => {
                    fetchUnreadCount();
                }
            );
        }
        setupRealtime();

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, []);

    return (
        <View style={styles.top}>
            <View style={styles.header}>
                <View style={styles.header_content}>
                    <Image
                        source={require('../../../../assets/header_feed.png')}
                        style={{ height: 40, width: 160 }}
                    />

                    <Pressable 
                        onPress={() => navigation.navigate("Notifications")}
                        style={{ position: 'relative', padding: 8 }}
                    >
                        <Ionicons name="notifications-outline" size={26} color={colors.primary} />
                        {unreadCount > 0 && (
                            <View style={{
                                position: 'absolute',
                                right: 6,
                                top: 6,
                                backgroundColor: '#ff6666',
                                borderRadius: 10,
                                minWidth: 18,
                                height: 18,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: colors.background
                            }}>
                                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                                    {unreadCount > 99 ? '99+' : unreadCount}
                                </Text>
                            </View>
                        )}
                    </Pressable>
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