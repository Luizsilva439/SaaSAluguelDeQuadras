import { View, Text, Pressable, TextInput, Platform, ToastAndroid } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Title from "../../components/Title";
import { colors } from "../../constants/colors";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import New_buttom from "../../components/New_buttom";


export default function SignUp() {

    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        if (isChecked) {
            setIsClicked(true);
        }  else {
            setIsClicked(false);
        }
    });

    function handleSignUp() {
        if (!isChecked){
            Platform.OS === 'android' ? ToastAndroid.show('Você precisa aceitar os termos de serviço', ToastAndroid.SHORT)
            : alert('Você precisa aceitar os termos de serviço');
        } else {
            setIsLoading(true);
        }
    }

    function checking() {
        if (isChecked) {
            setIsChecked(false);
        } else {
            setIsChecked(true);
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
                        />
                    </View>

                    <View style={{ gap: 8 }}>
                        <Title title="Email" size={16} />
                        <TextInput
                            style={styles.input}
                            placeholder='Digite sue email'
                            placeholderTextColor={colors.text}
                        />
                    </View>

                    <View style={{ gap: 8 }}>
                        <Title title="Senha" size={16} />
                        <TextInput
                            style={styles.input}
                            placeholder='Digite sua senha'
                            secureTextEntry={true}
                            placeholderTextColor={colors.text}
                        />
                    </View>

                    <View style={{ gap: 8 }}>
                        <Title title="Confirme a senha" size={16} />
                        <TextInput
                            style={styles.input}
                            placeholder='Digite novamente sua senha'
                            secureTextEntry={true}
                            placeholderTextColor={colors.text}
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

            </View>
        </SafeAreaView>
    );
}