import Title from '../../components/Title';
import New_buttom from '../../components/New_buttom';
import TextLink from '../../components/TextLink';

import { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors } from '../../constants/colors';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';



export default function Auth() {

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleLogin() {
    setIsLoading(true);
  }

  useEffect(() => {
    if(email != '' && password?.length >= 5){
      setIsClicked(true);
    }else{
      setIsClicked(false);
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.name_project}>
          <Title title="PlayTime" size={18} />
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
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder='Senha'
              placeholderTextColor={colors.text}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <New_buttom title='Entrar' colorText={colors.dark} isLoading={isLoading} onPress={() => (navigation as any).replace('Main')} isClicked={isClicked} />

            <View style={styles.link}>
              <TextLink title='Esqueceu sua senha?' />
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


