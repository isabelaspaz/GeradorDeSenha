import { View, Text, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import { buscarToken } from '../services/storage';
import { API_URL } from '../services/api';
import ShowIcon from '../components/icons/ShowIcon';
import CopyIcon from '../components/icons/CopyIcon';

export default function Historico({ navigation }) {
    const [historico, setHistorico] = useState([]);
    const [visiveis, setVisiveis] = useState({});
    const [erro, setErro] = useState('');

    const carregarHistorico = async () => {
        try {
            setErro('');

            const token = await buscarToken();

            if (!token) {
                setHistorico([]);
                setVisiveis({});
                setErro(' ♥ Usuário não autenticado. ♥');
                return;
            }

            const response = await fetch(`${API_URL}/senhas`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setHistorico([]);
                setVisiveis({});
                setErro(data.erro || ' ♥ Erro ao carregar histórico. ♥');
                return;
            }

            setHistorico(data);
            setVisiveis({});
        } catch (error) {
            console.log('ERRO AO CARREGAR HISTÓRICO:', error);
            setHistorico([]);
            setVisiveis({});
            setErro(' ♥ Erro ao conectar com o servidor ♥');
        }
    };

    useFocusEffect(
        useCallback(() => {
            carregarHistorico();
        }, [])
    );

    const alternarVisibilidade = (id) => {
        setVisiveis((estadoAnterior) => ({
            ...estadoAnterior,
            [id]: !estadoAnterior[id],
        }));
    };

    const copiarSenha = async (senha) => {
        await Clipboard.setStringAsync(senha);
    };

    const deletarSenha = async (id) => {
        try {
            const token = await buscarToken();

            if (!token) {
                setErro('Usuário não autenticado.');
                return;
            }

            const response = await fetch(`${API_URL}/senhas/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setErro(data.erro || ' ♥ Erro ao excluir senha. ♥');
                return;
            }

            const novoHistorico = historico.filter((item) => item.id !== id);
            setHistorico(novoHistorico);
        } catch (error) {
            console.log('ERRO AO EXCLUIR SENHA:', error);
            setErro(' ♥ Erro ao conectar com o servidor ♥');
        }
    };

    return (
        <View className="flex-1 bg-white pt-[55px] items-center">
            <Text className="text-[28px] font-bold text-[#eb6589] mb-5">
                Histórico de senhas
            </Text>

            {erro !== '' && (
                <Text className="text-[#d62839] mb-3 font-semibold">
                    {erro}
                </Text>
            )}

            {historico.length === 0 ? (
                <Text className="text-[#eb6589] mt-2 font-medium">
                    Você não possui senhas!
                </Text>
            ) : (
                <View style={{ width: '60%' }} className="items-center">
                    {historico.map((item) => (
                        <View
                            key={item.id}
                            className="w-full bg-[#fff5f8] border-2 border-[#eb6589] rounded-[18px] py-[18px] px-5 mb-[18px] flex-row justify-between items-center"
                        >
                            <View className="flex-1 justify-center">
                                <Text className="text-[17px] font-bold text-[#d94f79] mb-1.5">
                                    {item.nomeAplicativo}
                                </Text>
                                <Text className="text-[15px] text-[#c97b95] font-semibold tracking-[0.5px]">
                                    {visiveis[item.id]
                                        ? item.senha
                                        : '********'}
                                </Text>
                            </View>

                            <View className="flex-row items-center ml-[18px]">
                                <Pressable
                                    onPress={() => alternarVisibilidade(item.id)}
                                    className="w-[34px] h-[34px] justify-center items-center ml-[6px] rounded-lg"
                                >
                                    <ShowIcon />
                                </Pressable>

                                <Pressable
                                    onPress={() => copiarSenha(item.senha)}
                                    className="w-[34px] h-[34px] justify-center items-center ml-[6px] rounded-lg"
                                >
                                    <CopyIcon />
                                </Pressable>

                                <Pressable
                                    onPress={() => deletarSenha(item.id)}
                                    className="w-[34px] h-[34px] justify-center items-center ml-[6px] rounded-lg"
                                >
                                    <Text className="text-[20px] text-[#eb6589] font-bold">
                                        ✕
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            <Pressable
                style={{ width: '22%' }}
                className="mt-5 bg-[#eb6589] border-2 border-[#c10a38] py-3 rounded-[14px] items-center"
                onPress={() => navigation.goBack()}
            >
                <Text className="text-white font-bold text-base">
                    Voltar
                </Text>
            </Pressable>
        </View>
    );
}