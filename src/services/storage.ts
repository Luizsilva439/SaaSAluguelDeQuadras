import { supabase } from "./supabase";
import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base-64";

export async function uploadQuadraImages(quadraId: string, imagens: string[]) {
  const uploadedUrls: string[] = [];

  for (let i = 0; i < imagens.length; i++) {
    const uri = imagens[i];
    const fileName = `${quadraId}/${Date.now()}_${i}.jpg`;

    // lê em base64
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // converte base64 para arraybuffer
    const byteCharacters = decode(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let j = 0; j < byteCharacters.length; j++) {
      byteNumbers[j] = byteCharacters.charCodeAt(j);
    }

    const byteArray = new Uint8Array(byteNumbers);

    const { error } = await supabase.storage
      .from("quadras")
      .upload(fileName, byteArray, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      throw new Error("Erro ao enviar imagem: " + error.message);
    }

    const { data: publicData } = supabase.storage
      .from("quadras")
      .getPublicUrl(fileName);

    uploadedUrls.push(publicData.publicUrl);
  }

  return uploadedUrls;
}