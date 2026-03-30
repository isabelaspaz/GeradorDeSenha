import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import * as Clipboard from 'expo-clipboard';

export default function Home({ navigation, historico, setHistorico }) {
    const [senha, setSenha] = useState("Gere sua senha!");

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const senhasSalvas = window.localStorage.getItem("historicoSenhas");

            if (senhasSalvas) {
                setHistorico(JSON.parse(senhasSalvas));
            }
        }
    }, []);

    const generatePassword = () => {
        let password = "";
        let characters = "AaEeIiOoUu12345!@#$%";
        let passwordLength = 8;

        for (let i = 0; i < passwordLength; i++) {
            password += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }

        setSenha(password);

        const novoHistorico = [password, ...historico];
        setHistorico(novoHistorico);

        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem(
                "historicoSenhas",
                JSON.stringify(novoHistorico)
            );
        }
    };

    const copyToClipboard = () => {
        if (senha && senha !== "Gere sua senha!") {
            Clipboard.setStringAsync(senha);
        }
    };

    const limparHistorico = () => {
        setHistorico([]);

        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.removeItem("historicoSenhas");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerador de senha</Text>

            <Image
                source={require('../assets/cadeadinho.jpg')}
                style={styles.image}
            />

            <View style={styles.codeArea}>
                <Text style={styles.codeAreaText}>{senha}</Text>
            </View>

            <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                <Pressable style={styles.button} onPress={generatePassword}>
                    <Text style={{ color: "white", textAlign: "center" }}>Gerar ♥</Text>
                </Pressable>

                <Pressable
                    style={[styles.button, { marginTop: 10 }]}
                    onPress={copyToClipboard}
                >
                    <Text style={{ color: "white", textAlign: "center" }}>Copiar ♥</Text>
                </Pressable>
            </View>

            <Pressable
                style={{ marginTop: 15 }}
                onPress={() => navigation.navigate("Historico")}
            >
                <Text style={{ color: "#eb6589" }}>Ver senhas</Text>
            </Pressable>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: "#eb6589",
        fontSize: 28,
        fontWeight: "bold"
    },
    image: {
        width: 120,
        height: 120
    },
    codeArea: {
        backgroundColor: "#ffe7ed",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#eb6589",
        width: "35%"
    },
    codeAreaText: {
        color: "#eb6589",
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "#eb6589",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#c10a38",
        width: "35%"
    }
});