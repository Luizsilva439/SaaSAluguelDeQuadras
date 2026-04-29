import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from './styles';
import Title from '../../components/Title';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../services/supabase';
import { useAppModal } from '../../contexts/AppModalContext';

export default function AddFunds() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { showModal } = useAppModal();
  
  const initialAmount = route.params?.initialAmount || '';
  const [amount, setAmount] = useState(initialAmount);
  const [showQrCode, setShowQrCode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const presets = ['50,00', '100,00', '150,00'];

  const handleGenerateQR = () => {
    const value = parseFloat(amount.replace(',', '.'));
    if (isNaN(value) || value <= 0) {
      showModal({ title: 'Erro', message: 'Digite um valor válido para depósito.' });
      return;
    }
    setShowQrCode(true);
  };

  const simulatePayment = async () => {
    setIsProcessing(true);
    
    // Simulate network/processing delay
    setTimeout(async () => {
      try {
        const user = await supabase.auth.getUser();
        if (!user.data.user) throw new Error("Usuário não autenticado");

        const depositValue = parseFloat(amount.replace(',', '.'));

        // Fetch current saldo
        const { data: userData, error: fetchError } = await supabase
          .from('Users')
          .select('saldo')
          .eq('id', user.data.user.id)
          .single();

        if (fetchError) throw fetchError;

        const currentSaldo = userData?.saldo || 0;
        const newSaldo = currentSaldo + depositValue;

        // Update saldo
        const { error: updateError } = await supabase
          .from('Users')
          .update({ saldo: newSaldo })
          .eq('id', user.data.user.id);

        if (updateError) throw updateError;

        setIsProcessing(false);
        showModal({ title: 'Sucesso!', message: `Depósito de R$ ${depositValue.toFixed(2)} recebido com sucesso.` });
        
        // Go back to profile
        navigation.goBack();
      } catch (error: any) {
        setIsProcessing(false);
        showModal({ title: 'Erro', message: error.message || 'Falha ao realizar depósito.' });
      }
    }, 1500); // 1.5 seconds delay
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Title title="Adicionar Fundos" size={20} />
      </View>

      <View style={styles.content}>
        {!showQrCode ? (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.currencyPrefix}>R$</Text>
              <TextInput
                style={styles.input}
                placeholder="0,00"
                placeholderTextColor={colors.gray}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <View style={styles.presetContainer}>
              {presets.map((preset) => (
                <Pressable
                  key={preset}
                  style={styles.presetButton}
                  onPress={() => setAmount(preset)}
                >
                  <Text style={styles.presetButtonText}>R$ {preset}</Text>
                </Pressable>
              ))}
            </View>

            <Pressable style={styles.actionButton} onPress={handleGenerateQR}>
              <Text style={styles.actionButtonText}>Gerar QR Code de Depósito</Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.qrContainer}>
            <Title title={`Valor a depositar: R$ ${parseFloat(amount.replace(',', '.')).toFixed(2)}`} size={18} marginBottom={20} />
            
            <View style={styles.mockQrCode}>
              <Ionicons name="qr-code-outline" size={150} color={colors.dark} />
              <Text style={styles.qrText}>Escaneie este código</Text>
            </View>

            <Pressable 
              style={[styles.actionButton, styles.simulateButton]} 
              onPress={simulatePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color={colors.dark} />
              ) : (
                <Text style={styles.actionButtonText}>Simular Leitura do QR Code</Text>
              )}
            </Pressable>

            <Pressable 
              style={styles.cancelButton} 
              onPress={() => setShowQrCode(false)}
              disabled={isProcessing}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
