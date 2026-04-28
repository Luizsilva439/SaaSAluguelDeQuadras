import { Modal, ActivityIndicator, View } from "react-native";
import { supabase } from "../../../services/supabase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

type ModalLoginProps = {
  email: string;
  senha: string;
  visible: boolean;
  onClose: () => void;
  onError?: (message: string) => void;
};

export default function ModalLogin({ email, senha, visible, onClose, onError }: ModalLoginProps) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(visible);

  useEffect(() => {
    setIsLoading(visible);

    if (visible) {
      login(email, senha);
    }
  }, [visible]);

  async function login(email: string, senha: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      onError?.("Erro: " + error.message);
      setIsLoading(false);
      onClose();
      return;
    }

    setIsLoading(false);
    onClose();

    (navigation as any).replace("Splash");
  }

  return (
    <Modal visible={isLoading} transparent animationType="fade">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      </View>
    </Modal>
  );
}