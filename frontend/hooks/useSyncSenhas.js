import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

import { useSenhas } from '../context/SenhasContext';
import { buscarToken } from '../services/storage';
import { API_URL } from '../services/api';

export function useSyncSenhas() {
    const { senhas, marcarComoSincronizada } = useSenhas();

    const sincronizarSenhas = async () => {
        const senhasPendentes = senhas.filter((item) => item.pending);

        if (senhasPendentes.length === 0) return;

        try {
            const token = await buscarToken();

            if (!token) {
                console.log('Usuário não autenticado. Sincronização não realizada.');
                return;
            }

            const idsSincronizados = [];

            for (const item of senhasPendentes) {
                const response = await fetch(`${API_URL}/senhas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        nomeAplicativo: item.nomeAplicativo,
                        senha: item.senha,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    idsSincronizados.push(item.idLocal);
                } else {
                    console.log(
                        'Erro ao sincronizar senha:',
                        data.erro || 'Erro desconhecido'
                    );
                }
            }

            if (idsSincronizados.length > 0) {
                marcarComoSincronizada(idsSincronizados);
            }
        } catch (error) {
            console.log('Erro na sincronização offline first:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                sincronizarSenhas();
            }
        });

        sincronizarSenhas();

        return () => unsubscribe();
    }, [senhas]);
}