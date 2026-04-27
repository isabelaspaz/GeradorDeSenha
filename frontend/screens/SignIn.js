import { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { salvarToken, salvarUsuario } from '../services/storage';
import { API_URL } from '../services/api';

export default function SignIn({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [erroLogin, setErroLogin] = useState('');

    useEffect(() => {
        if (route.params?.email) {
            setEmail(route.params.email);
        }
    }, [route.params?.email]);

    const emailValido = useMemo(() => {
        const emailFormatado = email.trim();
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFormatado);
    }, [email]);

    const podeEntrar =
        email.trim() !== '' &&
        senha.trim() !== '' &&
        emailValido &&
        !carregando;

    const handleChangeEmail = (valor) => {
        setEmail(valor);
        if (erroLogin) setErroLogin('');
    };

    const handleChangeSenha = (valor) => {
        setSenha(valor);
        if (erroLogin) setErroLogin('');
    };

    const entrar = async () => {
        try {
            setCarregando(true);
            setErroLogin('');

            const response = await fetch(`${API_URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    senha: senha.trim(),
                }),
            });

            let data = {};
            try {
                data = await response.json();
            } catch (e) {
                console.log('Erro ao converter resposta do login:', e);
            }

            if (!response.ok) {
                console.log('ERRO LOGIN:', data);
                setErroLogin(
                    data.erro || data.mensagem || '♥ E-mail ou senha inválidos. ♥'
                );
                return;
            }

            await salvarToken(data.token);
            await salvarUsuario(data.usuario);

            navigation.reset({
                index: 0,
                routes: [{ name: 'GeradorDeSenha' }],
            });
        } catch (error) {
            console.log('ERRO FETCH SIGNIN:', error);
            setErroLogin('♥ Erro ao conectar. Tente novamente! ♥');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <View className="flex-1 bg-white px-7 items-center justify-center">
            <Image
                source={require('../assets/cadeadinho.jpg')}
                style={{ width: 110, height: 110, marginBottom: 16 }}
            />

            <Text className="text-[30px] font-bold text-[#eb6589] mb-2">
                Login
            </Text>

            <Text className="text-sm text-[#eb6589] mb-6 text-center">
                Entre para gerenciar suas senhas
            </Text>

            <TextInput
                style={{ width: '50%' }}
                className="bg-[#ffe7ed] border-2 border-[#eb6589] rounded-xl px-[14px] py-3 mb-[14px] text-[#eb6589] text-[15px]"
                placeholder="E-mail"
                placeholderTextColor="#c97b95"
                value={email}
                onChangeText={handleChangeEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            {email.trim() !== '' && !emailValido && (
                <Text
                    style={{ width: '50%' }}
                    className="text-[#ff265c] text-[13px] -mt-1.5 mb-2.5"
                >
                    ♥ Informe um e-mail válido! ♥
                </Text>
            )}

            <TextInput
                style={{ width: '50%' }}
                className="bg-[#ffe7ed] border-2 border-[#eb6589] rounded-xl px-[14px] py-3 mb-[14px] text-[#eb6589] text-[15px]"
                placeholder="Senha"
                placeholderTextColor="#c97b95"
                value={senha}
                onChangeText={handleChangeSenha}
                secureTextEntry
            />

            {erroLogin !== '' && (
                <Text
                    style={{ width: '50%' }}
                    className="text-[#ff265c] text-[13px] -mt-1.5 mb-2.5"
                >
                    {erroLogin}
                </Text>
            )}

            <Pressable
                style={{ width: '50%' }}
                className={`bg-[#eb6589] border-2 border-[#c10a38] rounded-xl py-3 mt-1.5 mb-[18px] ${!podeEntrar ? 'opacity-50' : ''
                    }`}
                disabled={!podeEntrar}
                onPress={entrar}
            >
                <Text className="text-white text-center font-bold text-base">
                    {carregando ? 'Entrando...' : 'Entrar'}
                </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('SignUp')}>
                <Text className="text-[#eb6589] text-sm">
                    Não possui conta?{' '}
                    <Text className="font-bold underline">Cadastre-se</Text>
                </Text>
            </Pressable>
        </View>
    );
}