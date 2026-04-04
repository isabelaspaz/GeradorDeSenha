import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_TOKEN = '@token';
const CHAVE_USUARIO = '@usuarioLogado';

function getChaveHistorico(usuarioId) {
    return `@historicoSenhas_${usuarioId}`;
}

export async function buscarHistorico(usuarioId) {
    if (!usuarioId) return [];
    const dados = await AsyncStorage.getItem(getChaveHistorico(usuarioId));
    return dados ? JSON.parse(dados) : [];
}

export async function salvarHistorico(usuarioId, lista) {
    if (!usuarioId) return;
    await AsyncStorage.setItem(getChaveHistorico(usuarioId), JSON.stringify(lista));
}

export async function salvarToken(token) {
    await AsyncStorage.setItem(CHAVE_TOKEN, token);
}

export async function buscarToken() {
    return await AsyncStorage.getItem(CHAVE_TOKEN);
}

export async function removerToken() {
    await AsyncStorage.removeItem(CHAVE_TOKEN);
}

export async function salvarUsuario(usuario) {
    await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
}

export async function buscarUsuario() {
    const dados = await AsyncStorage.getItem(CHAVE_USUARIO);
    return dados ? JSON.parse(dados) : null;
}

export async function removerUsuario() {
    await AsyncStorage.removeItem(CHAVE_USUARIO);
}