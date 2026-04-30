import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, View, Text, Pressable, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../services/supabase";
import { useAppModal } from "../../contexts/AppModalContext";
import { colors } from "../../constants/colors";

import Header from "./components/Header";
import BalanceCard from "./components/BalanceCard";
import PresetAmounts from "./components/PresetAmounts";
import CustomAmountInput from "./components/CustomAmountInput";
import PaymentMethod from "./components/PaymentMethod";
import SecureFooter from "./components/SecureFooter";

export default function AddFunds() {
  const navigation = useNavigation();
  const { showModal } = useAppModal();

  const [saldo, setSaldo] = useState<number>(0);

  // valores fixos só pra mostrar na tela (você pode puxar isso do banco depois)
  const [totalAdded] = useState<number>(320);
  const [totalUsed] = useState<number>(200);

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const presets = useMemo(() => [20, 50, 100, 150, 200, 300], []);

  function formatMoney(value: number) {
    return value.toFixed(2).replace(".", ",");
  }

  function getFinalAmount() {
    if (selectedAmount) return selectedAmount;

    const parsed = parseFloat(customAmount.replace(",", "."));
    if (isNaN(parsed)) return 0;

    return parsed;
  }

  async function fetchSaldo() {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { data, error } = await supabase
        .from("Users")
        .select("saldo")
        .eq("id", user.data.user.id)
        .single();

      if (error) throw error;

      setSaldo(data?.saldo || 0);
    } catch (err: any) {
      showModal({
        title: "Erro",
        message: err.message || "Erro ao carregar saldo.",
      });
    }
  }

  async function handleAddFunds() {
    const value = getFinalAmount();

    if (!value || value <= 0) {
      showModal({
        title: "Erro",
        message: "Selecione ou digite um valor válido.",
      });
      return;
    }

    setLoading(true);

    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error("Usuário não autenticado.");

      const { data: userData, error: fetchError } = await supabase
        .from("Users")
        .select("saldo")
        .eq("id", user.data.user.id)
        .single();

      if (fetchError) throw fetchError;

      const currentSaldo = userData?.saldo || 0;
      const newSaldo = currentSaldo + value;

      const { error: updateError } = await supabase
        .from("Users")
        .update({ saldo: newSaldo })
        .eq("id", user.data.user.id);

      if (updateError) throw updateError;

      setSaldo(newSaldo);
      setSelectedAmount(null);
      setCustomAmount("");

      showModal({
        title: "Sucesso!",
        message: `Depósito de R$ ${formatMoney(value)} realizado com sucesso.`,
      });

      navigation.goBack();
    } catch (err: any) {
      showModal({
        title: "Erro",
        message: err.message || "Falha ao adicionar saldo.",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSaldo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.logoArea}>
          <Text style={styles.logoText}>Jarenaz</Text>
        </View>

        <BalanceCard saldo={saldo} totalAdded={totalAdded} totalUsed={totalUsed} />

        <Text style={styles.sectionTitle}>Adicionar saldo</Text>

        <PresetAmounts
          presets={presets}
          selected={selectedAmount}
          onSelect={(value) => {
            setSelectedAmount(value);
            setCustomAmount("");
          }}
        />

        <CustomAmountInput
          value={customAmount}
          onChange={(text) => {
            setCustomAmount(text);
            setSelectedAmount(null);
          }}
        />

        <Text style={styles.sectionTitle}>Forma de pagamento</Text>

        <PaymentMethod />

        <Pressable
          style={[styles.mainButton, loading && styles.mainButtonDisabled]}
          onPress={handleAddFunds}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.dark} />
          ) : (
            <Text style={styles.mainButtonText}>Adicionar saldo</Text>
          )}
        </Pressable>

        <SecureFooter />
      </View>
    </SafeAreaView>
  );
}