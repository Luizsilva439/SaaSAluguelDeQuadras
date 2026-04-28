import { View, Text, TextInput, Pressable, ScrollView, Image } from "react-native";
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
import { useAppModal } from "../../../../contexts/AppModalContext";

export default function Forms() {
  const { showModal } = useAppModal();
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

  const navigation = useNavigation<any>();


  async function pickImage() {
    if (fotos.length >= 8) {
      showModal({ title: "Limite atingido", message: "Você só pode adicionar até 8 fotos." });
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      showModal({
        title: "Permissão negada",
        message: "Permissão para acessar galeria foi negada.",
      });
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

  function validarFormulario() {
    if (!titulo.trim()) return "Informe o título da quadra.";
    if (!descricao.trim()) return "Informe uma descrição da quadra.";
    if (!telefone.trim()) return "Informe um telefone de contato.";
    if (!cidade.trim()) return "Informe a cidade.";
    if (!endereco.trim()) return "Informe o endereço.";
    if (!tipoEsporte) return "Selecione o tipo de esporte.";
    if (!preco.trim()) return "Informe o preço por hora.";
    if (fotos.length === 0) return "Adicione pelo menos 1 foto.";

    const precoNumero = Number(preco.replace(",", "."));
    if (isNaN(precoNumero) || precoNumero <= 0) {
      return "Informe um preço válido.";
    }

    const telefoneNumeros = telefone.replace(/\D/g, "");
    if (telefoneNumeros.length < 10) {
      return "Informe um telefone válido com DDD.";
    }

    return null;
  }

  async function handleCreateQuadra() {
    try {
      const erroValidacao = validarFormulario();
      if (erroValidacao) {
        showModal({ title: "Campos obrigatórios", message: erroValidacao });
        return;
      }

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

      showModal({ title: "Sucesso", message: "Quadra publicada com sucesso!" });

      navigation.navigate("Profile");
    } catch (err: any) {
      showModal({
        title: "Erro",
        message: err?.message || "Não foi possível publicar a quadra.",
      });
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
              onChangeText={(value) => setTelefone(value.replace(/[^\d()\-\s]/g, ""))}
              maxLength={20}
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
              onChangeText={(value) => setPreco(value.replace(/[^0-9,.\s]/g, ""))}
              maxLength={10}
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

