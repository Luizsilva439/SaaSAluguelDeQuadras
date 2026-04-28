import { View, FlatList, Text, StyleSheet } from "react-native";
import CardFeed from "../../../components/CardFeed";
import { colors } from "../../../constants/colors";

export default function MainHome({ quadras, loading, favoriteIds, onToggleFavorite, ListHeaderComponent, refreshControl }: any) {
  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        {ListHeaderComponent && ListHeaderComponent}
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={quadras}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        refreshControl={refreshControl}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma quadra encontrada.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <CardFeed
            id={item.id}
            titulo={item.titulo}
            cidade={item.cidade}
            preco={item.preco}
            imagem={item.quadras_imagens?.[0]?.url}
            isFavorite={favoriteIds?.has(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    color: colors.text,
    textAlign: "center",
    marginTop: 20,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: colors.text,
    fontSize: 16,
    textAlign: "center",
  },
});