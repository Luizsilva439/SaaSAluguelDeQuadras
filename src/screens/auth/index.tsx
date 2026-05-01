import Title from '../../components/Title';
import New_buttom from '../../components/New_buttom';
import TextLink from '../../components/TextLink';

import { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors } from '../../constants/colors';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { strings } from '../../constants/strings';
import ModalLogin from './supabase/supabase';
import { useAppModal } from '../../contexts/AppModalContext';



export default function Auth() {
  const { showModal } = useAppModal();

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);


  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleLogin() {
    setIsLoading(true);
  }

  useEffect(() => {
    if (email != '' && password?.length >= 5) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.name_project}>
          <Image
            source={require('../../assets/logo.png')}
            style={{
              width: 400,
              height: 400,
              resizeMode: 'contain'
            }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.text_welcome}>
            <Title
              title='Bem-vindo'
              marginBottom={24}
              size={22} />
          </View>


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

            <New_buttom title='Entrar' colorText={colors.dark} isLoading={isLoading} onPress={() => setIsLoading(true)} isClicked={isClicked} />

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

        <ModalLogin
          email={email}
          senha={password}
          visible={isLoading}
          onClose={() => setIsLoading(false)}
          onError={(message) => showModal({ title: "Erro", message })}
        />      </View>
    </SafeAreaView>
  );
}


