import { Linking } from "react-native";

export function formatPhone(phone: string) {
  const onlyNumbers = phone.replace(/\D/g, "");

  if (onlyNumbers.startsWith("55")) return onlyNumbers;

  return "55" + onlyNumbers;
}

export async function sendWhatsAppMessage(phone: string, message: string) {
  const formattedPhone = formatPhone(phone);

  const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
    message
  )}`;

  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error("Não foi possível abrir o WhatsApp.");
  }

  await Linking.openURL(url);
}