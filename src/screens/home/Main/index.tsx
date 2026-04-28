import { View, FlatList, Text } from "react-native";
import CardFeed from "../../../components/CardFeed";

export default function MainHome({ quadras, loading, favoriteIds, onToggleFavorite }: any) {
  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={quadras}
        keyExtractor={(item) => item.id}
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