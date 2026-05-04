import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { useSenhas } from '../context/SenhasContext';
import { useSyncSenhas } from '../hooks/useSyncSenhas';


export default function GeradorDeSenha({ navigation }) {
    const [senha, setSenha] = useState('Gere sua senha!');
    const [modalVisible, setModalVisible] = useState(false);
    const [nomeAplicativo, setNomeAplicativo] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const { adicionarSenha } = useSenhas();

    useSyncSenhas();

    const generatePassword = () => {
        let password = '';
        let characters = 'AaEeIiOoUu12345!@#$%';
        let passwordLength = 8;

        for (let i = 0; i < passwordLength; i++) {
            password += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }

        setSenha(password);
        setErro('');
    };

    const copyToClipboard = () => {
        if (senha && senha !== 'Gere sua senha!') {
            Clipboard.setStringAsync(senha);
        }
    };

    const abrirModal = () => {
        if (senha !== 'Gere sua senha!') {
            setErro('');
            setModalVisible(true);
        }
    };

    const criarSenha = async () => {
        if (!nomeAplicativo || !senha || senha === 'Gere sua senha!') return;

        try {
            setCarregando(true);
            setErro('');

            await adicionarSenha({
                nomeAplicativo: nomeAplicativo.trim(),
                senha: senha,
            });

            setModalVisible(false);
            setNomeAplicativo('');
        } catch (error) {
            console.log('ERRO AO SALVAR LOCAL:', error);
            setErro('Erro ao salvar localmente.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <View className="flex-1 bg-white items-center justify-center">
            <Text className="text-[#eb6589] text-[28px] font-bold">
                Gerador de senha
            </Text>

            <Image
                source={require('../assets/cadeadinho.jpg')}
                style={{ width: 120, height: 120 }}
            />

            <View
                style={{ width: '35%' }}
                className="bg-[#ffe7ed] py-[10px] px-5 rounded-xl border-2 border-[#eb6589]"
            >
                <Text className="text-[#eb6589] text-center text-sm font-bold">
                    {senha}
                </Text>
            </View>

            {erro !== '' && (
                <Text className="text-[#d62839] text-[13px] mt-1 text-center">
                    {erro}
                </Text>
            )}

            <View className="w-full items-center mt-2.5">
                <Pressable
                    style={{ width: '35%' }}
                    className="bg-[#eb6589] py-[10px] px-5 rounded-xl border-2 border-[#c10a38]"
                    onPress={generatePassword}
                >
                    <Text className="text-white text-center">Gerar ♥</Text>
                </Pressable>

                <Pressable
                    style={{ width: '35%' }}
                    className={`bg-[#eb6589] py-[10px] px-5 rounded-xl border-2 border-[#c10a38] mt-2.5 ${senha === 'Gere sua senha!' ? 'opacity-50' : ''
                        }`}
                    onPress={abrirModal}
                    disabled={senha === 'Gere sua senha!'}
                >
                    <Text className="text-white text-center">Salvar ♥</Text>
                </Pressable>

                <Pressable
                    style={{ width: '35%' }}
                    className={`bg-[#eb6589] py-[10px] px-5 rounded-xl border-2 border-[#c10a38] mt-2.5 ${senha === 'Gere sua senha!' ? 'opacity-50' : ''
                        }`}
                    onPress={copyToClipboard}
                    disabled={senha === 'Gere sua senha!'}
                >
                    <Text className="text-white text-center">Copiar ♥</Text>
                </Pressable>
            </View>

            <Pressable
                className="mt-[15px]"
                onPress={() => navigation.navigate('Historico')}
            >
                <Text className="text-[#eb6589]">Acessar senhas</Text>
            </Pressable>

            <Modal visible={modalVisible} transparent animationType="fade">
                <View className="flex-1 bg-black/50 justify-center items-center">
                    <View className="w-[80%] bg-white rounded-xl p-5">
                        <Text className="text-[#eb6589] text-lg font-bold mb-[15px] text-center">
                            Cadastro de senha
                        </Text>

                        <Text className="mb-1 font-bold text-[#eb6589]">
                            Nome do aplicativo
                        </Text>

                        <TextInput
                            className="border border-gray-400 rounded-lg px-[10px] py-2 mb-3"
                            value={nomeAplicativo}
                            onChangeText={setNomeAplicativo}
                            placeholder="ex: Facebook"
                        />

                        <Text className="mb-1 font-bold text-[#eb6589]">
                            Senha gerada
                        </Text>

                        <TextInput
                            className="border border-gray-400 rounded-lg px-[10px] py-2 mb-3"
                            value={senha}
                            editable={false}
                        />

                        {erro !== '' && (
                            <Text className="text-[#d62839] text-[13px] mt-1 text-center">
                                {erro}
                            </Text>
                        )}

                        <Pressable
                            className={`bg-[#eb6589] py-[10px] px-5 rounded-xl border-2 border-[#c10a38] mt-2.5 ${!nomeAplicativo ||
                                senha === 'Gere sua senha!' ||
                                carregando
                                ? 'opacity-50'
                                : ''
                                }`}
                            onPress={criarSenha}
                            disabled={
                                !nomeAplicativo ||
                                senha === 'Gere sua senha!' ||
                                carregando
                            }
                        >
                            <Text className="text-white text-center">
                                {carregando ? 'Salvando...' : 'Salvar'}
                            </Text>
                        </Pressable>

                        <Pressable
                            className="bg-[#eb6589] py-[10px] px-5 rounded-xl border-2 border-[#c10a38] mt-2.5"
                            onPress={() => {
                                setModalVisible(false);
                                setNomeAplicativo('');
                                setErro('');
                            }}
                        >
                            <Text className="text-white text-center">
                                Cancelar
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <StatusBar style="auto" />
        </View>
    );
}