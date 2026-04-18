import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { colors } from "../../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Title from "../../../../components/Title";
import * as ImagePicker from "expo-image-picker";
import { createQuadra } from "../../../../services/quadrasService";
import { styles } from "./styles";
import { ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

export default function Forms() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [preco, setPreco] = useState("");
  const [tipoEsporte, setTipoEsporte] = useState("");
  const [telefone, setTelefone] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const [fotos, setFotos] = useState<string[]>([
  ]);

  const navigation = useNavigation();


  async function pickImage() {
    if (fotos.length >= 8) {
      alert("Você só pode adicionar até 8 fotos.");
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permissão para acessar galeria foi negada!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // permite várias imagens
      quality: 1,
    });

    if (result.canceled) return;

    const selected = result.assets.map((asset) => asset.uri);

    setFotos((prev) => {
      const merged = [...prev, ...selected];
      return merged.slice(0, 8); // limita em 8
    });
  }

  function removerFoto(index: number) {
    const newFotos = [...fotos];
    newFotos.splice(index, 1);
    setFotos(newFotos);
  }

  async function handleCreateQuadra() {
    try {
      setIsPublishing(true);

      await createQuadra({
        titulo,
        descricao,
        cidade,
        endereco,
        preco,
        telefone,
        tipo_esporte: tipoEsporte,
        fotos,
      });

      alert("Quadra publicada com sucesso!");

      navigation.navigate("Profile" as never); 
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* Título */}
      <View style={styles.block}>
        <Title title="Título da quadra" size={16} />

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Ex: Quadra Society do João"
            placeholderTextColor={colors.gray}
            value={titulo}
            maxLength={60}
            onChangeText={setTitulo}
          />

          <Text style={styles.counter}>{titulo.length}/60</Text>
        </View>
      </View>

      {/* Descrição */}
      <View style={styles.block}>

        <Title title="Descrição" size={16} />

        <View style={[styles.inputBox, styles.textAreaBox]}>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Fale sobre sua quadra, estrutura, diferenciais..."
            placeholderTextColor={colors.gray}
            value={descricao}
            maxLength={300}
            multiline
            onChangeText={setDescricao}
          />

          <Text style={styles.counter}>{descricao.length}/300</Text>
        </View>
      </View>

      {/* Telefone */}
      <View style={styles.block}>

        <Title title="Telefone" size={16} />


        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Ex: (14) 99999-9999"
            placeholderTextColor={colors.gray}
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
        </View>
      </View>

      {/* Cidade e Endereço */}
      <View style={styles.row}>
        <View style={[styles.block, styles.half]}>

          <Title title="Cidade" size={16} />

          <View style={styles.inputBoxRow}>
            <TextInput
              style={styles.inputRow}
              placeholder="Ex: Garça - SP"
              placeholderTextColor={colors.gray}
              value={cidade}
              onChangeText={setCidade}
            />
            <Ionicons name="location-outline" size={20} color={colors.primary} />
          </View>
        </View>

        <View style={[styles.block, styles.half]}>


          <Title title="Endereço" size={16} />

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Ex: Rua das Flores, 123"
              placeholderTextColor={colors.gray}
              value={endereco}
              onChangeText={setEndereco}
            />
          </View>
        </View>
      </View>

      {/* Tipo esporte e Preço */}
      <View style={styles.row}>
        <View style={[styles.block, styles.half]}>

          <Title title="Tipo de esporte" size={16} />

          <View style={styles.pickerBox}>
            <Picker
              mode="dropdown"
              selectedValue={tipoEsporte}
              onValueChange={(itemValue) => setTipoEsporte(itemValue)}
              dropdownIconColor={colors.primary}
              style={styles.picker}
              itemStyle={{ color: colors.text }}
            >
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="Futebol" value="Futebol" />
              <Picker.Item label="Futsal" value="Futsal" />
              <Picker.Item label="Vôlei" value="Vôlei" />
              <Picker.Item label="Basquete" value="Basquete" />
              <Picker.Item label="Tênis" value="Tênis" />
            </Picker>
          </View>
        </View>

        <View style={[styles.block, styles.half]}>

          <Title title="Preço por hora" size={16} />

          <View style={styles.priceBox}>
            <View style={styles.currency}>
              <Text style={styles.currencyText}>R$</Text>
            </View>

            <TextInput
              style={styles.priceInput}
              placeholder="0,00"
              placeholderTextColor={colors.gray}
              keyboardType="numeric"
              value={preco}
              onChangeText={setPreco}
            />
          </View>
        </View>
      </View>

      {/* Fotos */}
      <View style={styles.block}>

        <Title title="Fotos da quadra" size={16} />


        <Title title="Adicione de 1 a 8 fotos" size={13} color={colors.gray} />

        <View style={styles.photosContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable style={styles.addPhoto} onPress={pickImage}>
              <Ionicons name="image-outline" size={30} color={colors.primary} />
              <Text style={styles.addPhotoText}>Adicionar fotos</Text>
            </Pressable>

            {fotos.map((foto, index) => (
              <View key={index} style={styles.photoCard}>
                <Image source={{ uri: foto }} style={styles.photo} />

                <Pressable
                  style={styles.removeButton}
                  onPress={() => removerFoto(index)}
                >
                  <Ionicons name="close" size={18} color={colors.text} />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Aviso */}
      <View style={styles.infoBox}>
        <View style={styles.infoIcon}>
          <Ionicons name="information" size={20} color={colors.dark} />
        </View>

        <Text style={styles.infoText}>
          Sua quadra será analisada antes de aparecer no feed. Verifique se todas
          as informações estão corretas.
        </Text>
      </View>

      {/* Botão publicar */}
      <Pressable
        style={[styles.button, isPublishing && { opacity: 0.7 }]}
        onPress={handleCreateQuadra}
        disabled={isPublishing}
      >
        {isPublishing ? (
          <ActivityIndicator size="small" color={colors.text} />
        ) : (
          <>
            <Ionicons name="paper-plane-outline" size={20} color={colors.text} />
            <Text style={styles.buttonText}>Publicar Quadra</Text>
          </>
        )}
      </Pressable>
    </View>
  );
}

