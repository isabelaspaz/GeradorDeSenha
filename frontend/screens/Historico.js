import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

import ShowIcon from '../components/icons/ShowIcon';
import CopyIcon from '../components/icons/CopyIcon';
import { useSenhas } from '../context/SenhasContext';export default function Historico({ navigation }) {
    const { senhas, removerSenhaLocal } = useSenhas();

    const [visiveis, setVisiveis] = useState({});

    const alternarVisibilidade = (id) => {
        setVisiveis((estadoAnterior) => ({
            ...estadoAnterior,
            [id]: !estadoAnterior[id],
        }));
    };

    const copiarSenha = async (senha) => {
        await Clipboard.setStringAsync(senha);
    };

    const deletarSenha = (idLocal) => {
        removerSenhaLocal(idLocal);
    };

    return (
        <View className="flex-1 bg-white pt-[55px] items-center">
            <Text className="text-[28px] font-bold text-[#eb6589] mb-5">
                Histórico de senhas
            </Text>

            {senhas.length === 0 ? (
                <Text className="text-[#eb6589] mt-2 font-medium">
                    Você não possui senhas!
                </Text>
            ) : (
                <View style={{ width: '60%' }} className="items-center">
                    {senhas.map((item) => (
                        <View
                            key={item.idLocal}
                            className="w-full bg-[#fff5f8] border-2 border-[#eb6589] rounded-[18px] py-[18px] px-5 mb-[18px] flex-row justify-between items-center"
                        >
                            <View className="flex-1 justify-center">
                                <Text className="text-[17px] font-bold text-[#d94f79] mb-1.5">
                                    {item.nomeAplicativo}
                                </Text>

                                <Text className="text-[15px] text-[#c97b95] font-semibold tracking-[0.5px]">
                                    {visiveis[item.idLocal]
                                        ? item.senha
                                        : '********'}
                                </Text>

                            
                                <Text className="text-[11px] mt-1 text-gray-400">
                                    {item.pending
                                        ? 'Senha pendente de sincronização'
                                        : 'Senha sincronizada ♥'}
                                </Text>
                            </View>

                            <View className="flex-row items-center ml-[18px]">
                                <Pressable
                                    onPress={() =>
                                        alternarVisibilidade(item.idLocal)
                                    }
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
                                    onPress={() =>
                                        deletarSenha(item.idLocal)
                                    }
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