import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "./stylesHeaderImage";

type Props = {
  imagens: string[];
  disponivel?: boolean;
  onBack: () => void;
  isFavorite?: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
};

export default function HeaderImage({
  imagens,
  disponivel,
  onBack,
  isFavorite = false,
  onToggleFavorite,
  onShare,
}: Props) {
  const [indexAtual, setIndexAtual] = useState(0);

  const imagemAtual = imagens.length > 0 ? imagens[indexAtual] : undefined;

  function nextImage() {
    if (indexAtual < imagens.length - 1) {
      setIndexAtual(indexAtual + 1);
    }
  }

  function prevImage() {
    if (indexAtual > 0) {
      setIndexAtual(indexAtual - 1);
    }
  }

  return (
    <View style={styles.imageWrapper}>
      {imagemAtual ? (
        <Image
          source={{ uri: imagemAtual }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.noImage}>
          <Ionicons name="image-outline" size={40} color={colors.gray} />
          <Text style={styles.noImageText}>Sem imagem</Text>
        </View>
      )}

      {/* VOLTAR */}
      <Pressable style={styles.backButton} onPress={onBack}>
        <Ionicons name="chevron-back" size={22} color={colors.text} />
      </Pressable>

      {/* ICONES DIREITA */}
      <View style={styles.rightButtons}>
        <Pressable style={styles.iconButton} onPress={onToggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? "#ff6666" : colors.text}
          />
        </Pressable>

        <Pressable style={styles.iconButton} onPress={onShare}>
          <Ionicons name="share-social-outline" size={20} color={colors.text} />
        </Pressable>
      </View>

      {/* DISPONÍVEL */}
      {disponivel && (
        <View style={styles.badge}>
          <Ionicons name="flash" size={14} color={colors.text} />
          <Text style={styles.badgeText}>Disponível agora</Text>
        </View>
      )}

      {/* CONTADOR */}
      {imagens.length > 0 && (
        <View style={styles.counter}>
          <Ionicons name="images-outline" size={16} color={colors.text} />
          <Text style={styles.counterText}>
            {indexAtual + 1}/{imagens.length}
          </Text>
        </View>
      )}

      {/* BOTÕES PARA TROCAR IMAGEM */}
      {imagens.length > 1 && (
        <>
          <Pressable style={styles.leftArrow} onPress={prevImage}>
            <Ionicons name="chevron-back" size={26} color={colors.text} />
          </Pressable>

          <Pressable style={styles.rightArrow} onPress={nextImage}>
            <Ionicons name="chevron-forward" size={26} color={colors.text} />
          </Pressable>
        </>
      )}
    </View>
  );
}