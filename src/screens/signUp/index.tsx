import { View, Pressable, TextInput, Platform, ToastAndroid } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Title from "../../components/Title";
import { colors } from "../../constants/colors";
import Checkbox from "expo-checkbox";
import { useEffect, useState, useContext } from "react";
import New_buttom from "../../components/New_buttom";
import TextLink from "../../components/TextLink";
import { registrar } from "./supabase/functions";
import { AuthContext } from "../../contexts/AuthContext";
import { useAppModal } from "../../contexts/AppModalContext";


export default function SignUp() {

    const { setUserName, reload } = useContext(AuthContext);
    const { showModal } = useAppModal();

    const navigation = useNavigation();

    // Informações do formulário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');


    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    useEffect(() => {

        validateAndSignUp();

        // Verificar senha e confirmacao de senha
        if (senha !== confirmarSenha) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    });

    //vlidar campos e criar conta
    function validateAndSignUp() {
        if (!nome || !email || !senha || !passwordsMatch || !isChecked) {
            setIsClicked(false);
        } else {
            setIsClicked(true);
        }
    }

    // Alterna o estado do checkbox
    function checking() {
        if (isChecked) {
            setIsChecked(false);
        } else {
            setIsChecked(true);
        }
    }
     

    async function handleSignUp() {
        setIsLoading(true);
        try {
            await registrar({ email, senha, nome });
            await reload();
            showModal({ title: "Sucesso", message: "Conta criada com sucesso!" });
            (navigation as any).replace('Splash');
        } catch (error: any) {
            showModal({
                title: "Erro",
                message: error?.message || "Não foi possível criar a conta.",
            });
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable style={styles.back} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </Pressable>
                    <Title title="Criar conta" size={18} />
                </View>

                <View style={styles.content}>
                    <View style={{ gap: 8 }}>
                        <Title title="Nome completo" size={16} />
                        <TextInput
                            style={styles.input}
                            placeholder='Seu nome'
                            placeholderTextColor={colors.text}
                            value={nome}
                            onChangeText={setNome}
                        />
                    </View>

                    <View style={{ gap: 8 }}>
                        <Title title="Email" size={16} />
                        <TextInput
                            style={styles.input}
                            placeholder='Digite sue email'
                            placeholderTextColor={colors.text}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={{ gap: 8 }}>
                        <Title title="Senha" size={16} />
                        <TextInput
                            style={styles.input}
                            placeholder='Digite sua senha'
                            secureTextEntry={true}
                            placeholderTextColor={colors.text}
                            value={senha}
                            onChangeText={setSenha}
                        />
                    </View>

                    <View style={{ gap: 8 }}>
                        <Title title="Confirme a senha" size={16} />
                        <TextInput
                            style={passwordsMatch ? styles.input : [styles.inputNotMatch]}
                            placeholder='Digite novamente sua senha'
                            secureTextEntry={true}
                            placeholderTextColor={colors.text}
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                        />
                    </View>
                    <Pressable style={styles.checkboxContainer} onPress={() => checking()}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            color={colors.primary}
                            onValueChange={setIsChecked} />
                        <Title title="Eu aceito os termos de serviço" size={16} />
                    </Pressable>

                    <New_buttom title="Cadastrar" isLoading={isLoading} onPress={() => handleSignUp()} isClicked={isClicked} />
                </View>

                <View style={styles.facaLogin}>
                    <TextLink
                    title="Ja tem uma conta? Faça login"
                    onPress={() => (navigation as any).replace('Auth')}/>
                </View>

            </View>
        </SafeAreaView>
    );
}