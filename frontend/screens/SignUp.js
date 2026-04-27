import { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { API_URL } from '../services/api';

export default function SignUp({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [erroCadastro, setErroCadastro] = useState('');

    const emailValido = useMemo(() => {
        const emailFormatado = email.trim();
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFormatado);
    }, [email]);

    const senhasIguais = senha === confirmarSenha;

    const podeRegistrar =
        nome.trim() !== '' &&
        email.trim() !== '' &&
        senha.trim() !== '' &&
        confirmarSenha.trim() !== '' &&
        emailValido &&
        senhasIguais &&
        !carregando;

    const handleChangeNome = (valor) => {
        setNome(valor);
        if (erroCadastro) setErroCadastro('');
    };

    const handleChangeEmail = (valor) => {
        setEmail(valor);
        if (erroCadastro) setErroCadastro('');
    };

    const handleChangeSenha = (valor) => {
        setSenha(valor);
        if (erroCadastro) setErroCadastro('');
    };

    const handleChangeConfirmarSenha = (valor) => {
        setConfirmarSenha(valor);
        if (erroCadastro) setErroCadastro('');
    };

    const registrar = async () => {
        try {
            setCarregando(true);
            setErroCadastro('');

            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome.trim(),
                    email: email.trim(),
                    senha: senha.trim(),
                    confirmarSenha: confirmarSenha.trim(),
                }),
            });

            let data = {};
            try {
                data = await response.json();
            } catch (e) {
                console.log('Erro ao converter resposta do cadastro:', e);
            }

            if (!response.ok) {
                setErroCadastro(
                    data.erro || data.mensagem || '♥ Não foi possível realizar o cadastro. ♥'
                );
                return;
            }

            navigation.navigate('SignIn', { email: email.trim() });
        } catch (error) {
            console.log('ERRO FETCH SIGNUP:', error);
            setErroCadastro('♥ Erro ao conectar. Tente novamente! ♥');
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
                Cadastro
            </Text>

            <Text className="text-sm text-[#eb6589] mb-6 text-center">
                Crie sua conta para continuar
            </Text>

            <TextInput
                style={{ width: '50%' }}
                className="bg-[#ffe7ed] border-2 border-[#eb6589] rounded-xl px-[14px] py-3 mb-[14px] text-[#eb6589] text-[15px]"
                placeholder="Nome"
                placeholderTextColor="#c97b95"
                value={nome}
                onChangeText={handleChangeNome}
            />

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

            <TextInput
                style={{ width: '50%' }}
                className="bg-[#ffe7ed] border-2 border-[#eb6589] rounded-xl px-[14px] py-3 mb-[14px] text-[#eb6589] text-[15px]"
                placeholder="Confirmar senha"
                placeholderTextColor="#c97b95"
                value={confirmarSenha}
                onChangeText={handleChangeConfirmarSenha}
                secureTextEntry
            />

            {confirmarSenha !== '' && !senhasIguais && (
                <Text
                    style={{ width: '50%' }}
                    className="text-[#ff265c] text-[13px] -mt-1.5 mb-2.5"
                >
                    ♥ As senhas precisam ser iguais! ♥
                </Text>
            )}

            {erroCadastro !== '' && (
                <Text
                    style={{ width: '50%' }}
                    className="text-[#ff265c] text-[13px] -mt-1.5 mb-2.5"
                >
                    {erroCadastro}
                </Text>
            )}

            <Pressable
                style={{ width: '50%' }}
                className={`bg-[#eb6589] border-2 border-[#c10a38] rounded-xl py-3 mt-1.5 mb-[18px] ${!podeRegistrar ? 'opacity-50' : ''
                    }`}
                disabled={!podeRegistrar}
                onPress={registrar}
            >
                <Text className="text-white text-center font-bold text-base">
                    {carregando ? 'Cadastrando...' : 'Cadastrar'}
                </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('SignIn')}>
                <Text className="text-[#eb6589] text-sm">
                    Já possui conta?{' '}
                    <Text className="font-bold underline">Entrar</Text>
                </Text>
            </Pressable>
        </View>
    );
}