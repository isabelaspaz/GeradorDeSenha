import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { buscarHistorico, salvarHistorico } from "../services/storage";

export default function Historico({ navigation }) {
    const [historico, setHistorico] = useState([]);
    const [visiveis, setVisiveis] = useState({});

    const carregarHistorico = async () => {
        const dados = await buscarHistorico();
        setHistorico(dados);
        setVisiveis({});
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
        const novoHistorico = historico.filter((item) => item.id !== id);
        setHistorico(novoHistorico);
        await salvarHistorico(novoHistorico);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Histórico de senhas</Text>

            <View style={styles.lista}>
                {historico.length === 0 ? (
                    <Text style={styles.empty}>Você não possui senhas!</Text>
                ) : (
                    historico.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <View>
                                <Text style={styles.appText}>{item.nomeAplicativo}</Text>
                                <Text style={styles.senhaText}>
                                    {visiveis[item.id] ? item.senha : "********"}
                                </Text>
                            </View>

                            <View style={styles.actions}>
                                <Text
                                    style={styles.icon}
                                    onPress={() => alternarVisibilidade(item.id)}
                                >
                                    {visiveis[item.id] ? "○" : "👁"}
                                </Text>

                                <Text
                                    style={styles.icon}
                                    onPress={() => copiarSenha(item.senha)}
                                >
                                    ⧉
                                </Text>

                                <Text
                                    style={styles.icon}
                                    onPress={() => deletarSenha(item.id)}
                                >
                                    ✕
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </View>

            <Pressable
                style={styles.voltarButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.voltarText}>VOLTAR</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 60,
        alignItems: "center",
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#eb6589",
        marginBottom: 30,
    },

    lista: {
        width: "80%",
        alignItems: "center",
    },

    card: {
        width: "100%",
        borderWidth: 2,
        borderColor: "#222",
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 18,
        marginBottom: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    appText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 6,
    },

    senhaText: {
        fontSize: 16,
        color: "#222",
    },

    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    icon: {
        fontSize: 20,
        marginLeft: 12,
        color: "#222",
        fontWeight: "bold"
    },

    empty: {
        color: "#eb6589",
        marginTop: 10,
        fontWeight: "500",
    },

    voltarButton: {
        marginTop: 20,
        backgroundColor: "#eb6589",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },

    voltarText: {
        color: "white",
        fontWeight: "bold",
    },
});