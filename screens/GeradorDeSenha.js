import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { buscarToken } from '../services/storage';
import { API_URL } from '../services/api';

export default function GeradorDeSenha({ navigation }) {
    const [senha, setSenha] = useState('Gere sua senha!');
    const [modalVisible, setModalVisible] = useState(false);
    const [nomeAplicativo, setNomeAplicativo] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const generatePassword = () => {
        let password = '';
        let characters = 'AaEeIiOoUu12345!@#$%';
        let passwordLength = 8;

        for (let i = 0; i < passwordLength; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
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

            const token = await buscarToken();
            if (!token) {
                setErro('Usuário não autenticado.');
                return;
            }

            const response = await fetch(`${API_URL}/senhas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nomeAplicativo: nomeAplicativo.trim(),
                    senha: senha,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErro(data.erro || 'Erro ao salvar senha.');
                return;
            }

            setModalVisible(false);
            setNomeAplicativo('');
        } catch (error) {
            console.log('ERRO AO SALVAR SENHA:', error);
            setErro('Erro ao conectar com o servidor.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerador de senha</Text>

            <Image source={require('../assets/cadeadinho.jpg')} style={styles.image} />

            <View style={styles.codeArea}>
                <Text style={styles.codeAreaText}>{senha}</Text>
            </View>

            {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

            <View style={styles.buttonsArea}>
                <Pressable style={styles.button} onPress={generatePassword}>
                    <Text style={styles.buttonText}>Gerar ♥</Text>
                </Pressable>

                <Pressable
                    style={[styles.button, styles.marginTop, senha === 'Gere sua senha!' && styles.buttonDisabled]}
                    onPress={abrirModal}
                    disabled={senha === 'Gere sua senha!'}
                >
                    <Text style={styles.buttonText}>Salvar ♥</Text>
                </Pressable>

                <Pressable
                    style={[styles.button, styles.marginTop, senha === 'Gere sua senha!' && styles.buttonDisabled]}
                    onPress={copyToClipboard}
                    disabled={senha === 'Gere sua senha!'}
                >
                    <Text style={styles.buttonText}>Copiar ♥</Text>
                </Pressable>
            </View>

            <Pressable style={{ marginTop: 15 }} onPress={() => navigation.navigate('Historico')}>
                <Text style={{ color: '#eb6589' }}>Acessar senhas</Text>
            </Pressable>

            <Modal visible={modalVisible} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={[styles.modalTitle, { color: '#eb6589' }]}>Cadastro de senha</Text>

                        <Text style={[styles.label, { color: '#eb6589' }]}>Nome do aplicativo</Text>
                        <TextInput
                            style={styles.input}
                            value={nomeAplicativo}
                            onChangeText={setNomeAplicativo}
                            placeholder="ex: Facebook"
                        />

                        <Text style={[styles.label, { color: '#eb6589' }]}>Senha gerada</Text>
                        <TextInput style={styles.input} value={senha} editable={false} />

                        {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

                        <Pressable
                            style={[
                                styles.modalButton,
                                (!nomeAplicativo || senha === 'Gere sua senha!' || carregando) && styles.buttonDisabled,
                            ]}
                            onPress={criarSenha}
                            disabled={!nomeAplicativo || senha === 'Gere sua senha!' || carregando}
                        >
                            <Text style={styles.buttonText}>{carregando ? 'Salvando...' : 'Salvar'}</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.modalButton, styles.marginTop]}
                            onPress={() => {
                                setModalVisible(false);
                                setNomeAplicativo('');
                                setErro('');
                            }}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    title: { color: '#eb6589', fontSize: 28, fontWeight: 'bold' },
    image: { width: 120, height: 120 },
    codeArea: {
        backgroundColor: '#ffe7ed',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#eb6589',
        width: '35%',
    },
    codeAreaText: { color: '#eb6589', textAlign: 'center', fontSize: 14, fontWeight: 'bold' },
    buttonsArea: { width: '100%', alignItems: 'center', marginTop: 10 },
    button: {
        backgroundColor: '#eb6589',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#c10a38',
        width: '35%',
    },
    modalButton: {
        backgroundColor: '#eb6589',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#c10a38',
        width: '100%',
        marginTop: 10,
    },
    buttonText: { color: 'white', textAlign: 'center' },
    marginTop: { marginTop: 10 },
    buttonDisabled: { opacity: 0.5 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center' },
    modalBox: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 20 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    label: { marginBottom: 5, fontWeight: 'bold' },
    input: { borderWidth: 1, borderColor: '#999', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 12 },
    errorText: { color: '#d62839', fontSize: 13, marginTop: 6, textAlign: 'center' },
});