import Title from '../../components/Title';
import New_buttom from '../../components/New_buttom';
import { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Pressable, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors } from '../../constants/colors';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import TextLink from '../../components/TextLink';


export default function Auth() {

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    setIsLoading(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.name_project}>
          <Title title="Nome Projeto" size={18} />
        </View>
        <View style={styles.content}>
          <Title
            title='Bem-vindo de volta'
            marginBottom={24}
            size={22} />

          <View style={{ gap: 24 }}>
            <TextInput
              style={styles.input}
              placeholder='Email'
              placeholderTextColor={colors.text}
            />

            <TextInput
              style={styles.input}
              placeholder='Senha'
              placeholderTextColor={colors.text}
              secureTextEntry={true}
            />

            <New_buttom title='Entrar' colorText={colors.dark} isLoading={isLoading} onPress={handleLogin} />

            <View style={styles.link}>
              <TextLink title='Esqueceu sua senha?'/>
            </View>
          </View>

          <View style={styles.esqueceuSenha}>
            <TextLink
              title='Não tem uma conta? Criar conta'
              onPress={() => (navigation as any).navigate('SignUp')} />
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}


