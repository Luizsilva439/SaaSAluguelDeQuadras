import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { supabase } from "../../services/supabase";
import { colors } from "../../constants/colors";
import { styles } from "./styles";
import { useAppModal } from "../../contexts/AppModalContext";

type Quadra = {
  id: string;
  titulo: string;
  descricao: string;
  endereco: string;
  preco: number;
  owner_id: string;
};

export default function EditCourt() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { showModal } = useAppModal();
  const { quadraId } = route.params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [quadra, setQuadra] = useState<Quadra | null>(null);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    async function fetchQuadra() {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        showModal({ title: "Erro", message: "Você precisa estar logado." });
        navigation.goBack();
        return;
      }

      const { data, error } = await supabase
        .from("quadras")
        .select("*")
        .eq("id", quadraId)
        .single();

      if (error || !data) {
        showModal({ title: "Erro", message: "Quadra não encontrada." });
        navigation.goBack();
        return;
      }

      if (data.owner_id !== user.data.user.id) {
        showModal({ title: "Acesso Negado", message: "Você não é o dono desta quadra." });
        navigation.goBack();
        return;
      }

      setQuadra(data);
      setTitulo(data.titulo);
      setDescricao(data.descricao || "");
      setEndereco(data.endereco || "");
      setPreco(data.preco ? data.preco.toString() : "");
      setLoading(false);
    }

    fetchQuadra();
  }, [quadraId]);

  async function handleSave() {
    if (!titulo || !preco || !endereco) {
      showModal({ title: "Atenção", message: "Preencha os campos obrigatórios (Nome, Endereço e Preço)." });
      return;
    }

    const precoNumber = parseFloat(preco.replace(",", "."));
    if (isNaN(precoNumber)) {
      showModal({ title: "Atenção", message: "Preço inválido." });
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("quadras")
      .update({
        titulo,
        descricao,
        endereco,
        preco: precoNumber,
      })
      .eq("id", quadraId);

    setSaving(false);

    if (error) {
      showModal({ title: "Erro", message: "Não foi possível atualizar a quadra." });
      return;
    }

    showModal({ title: "Sucesso", message: "Quadra atualizada com sucesso!" });
    navigation.goBack();
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>
          <Text style={styles.title}>Editar Quadra</Text>
          <View style={{ width: 42 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.formCard}>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome da Quadra *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="football-outline" size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={titulo}
                  onChangeText={setTitulo}
                  placeholder="Ex: Arena do Gol"
                  placeholderTextColor={colors.gray}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Endereço *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="location-outline" size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={endereco}
                  onChangeText={setEndereco}
                  placeholder="Ex: Rua das Flores, 123"
                  placeholderTextColor={colors.gray}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preço por Hora (R$) *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="cash-outline" size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={preco}
                  onChangeText={setPreco}
                  placeholder="Ex: 100.00"
                  keyboardType="numeric"
                  placeholderTextColor={colors.gray}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição</Text>
              <View style={[styles.inputContainer, styles.textAreaContainer]}>
                <TextInput
                  style={styles.textArea}
                  value={descricao}
                  onChangeText={setDescricao}
                  placeholder="Detalhes sobre a quadra..."
                  placeholderTextColor={colors.gray}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

          </View>

          <Pressable 
            style={[styles.saveButton, saving && styles.disabledButton]} 
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#0F241F" />
            ) : (
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            )}
          </Pressable>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
