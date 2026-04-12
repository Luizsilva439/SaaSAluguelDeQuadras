import { View, FlatList, Text } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { supabase } from "../../../services/supabase";
import CardFeed from "../../../components/CardFeed";

export default function MainHome() {
  const [quadras, setQuadras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadQuadras() {
    setLoading(true);

    const { data, error } = await supabase
      .from("quadras")
      .select(`
        id,
        titulo,
        cidade,
        preco,
        quadras_imagens (url)
      `);

    if (error) {
      console.log("Erro:", error.message);
      setLoading(false);
      return;
    }

    setQuadras(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadQuadras();
  }, []);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={quadras}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardFeed
            titulo={item.titulo}
            cidade={item.cidade}
            preco={item.preco}
            imagem={item.quadras_imagens?.[0]?.url}
          />
        )}
      />
    </View>
  );
}