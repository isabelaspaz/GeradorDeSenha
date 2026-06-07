import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    buscarHistorico,
    buscarToken,
    buscarUsuario,
    removerToken,
    salvarHistorico,
    salvarToken,
    salvarUsuario,
} from './storage';

describe('storage service', () => {
    beforeEach(async () => {
        await AsyncStorage.clear();
    });

    test('salva e busca o token', async () => {
        await salvarToken('token-123');

        await expect(buscarToken()).resolves.toBe('token-123');
    });

    test('remove o token salvo', async () => {
        await salvarToken('token-123');
        await removerToken();

        await expect(buscarToken()).resolves.toBeNull();
    });

    test('salva e busca o usuario logado', async () => {
        const usuario = {
            id: 1,
            nome: 'Isabela',
            email: 'isabela@email.com',
        };

        await salvarUsuario(usuario);

        await expect(buscarUsuario()).resolves.toEqual(usuario);
    });

    test('retorna null quando nao existe usuario salvo', async () => {
        await expect(buscarUsuario()).resolves.toBeNull();
    });

    test('salva e busca o historico de senhas do usuario', async () => {
        const historico = [
            {
                idLocal: '1',
                nomeAplicativo: 'Instagram',
                senha: 'Aa123!@#',
                criadoEm: '2026-06-07T12:00:00.000Z',
                pending: true,
            },
        ];

        await salvarHistorico(10, historico);

        await expect(buscarHistorico(10)).resolves.toEqual(historico);
    });
});
