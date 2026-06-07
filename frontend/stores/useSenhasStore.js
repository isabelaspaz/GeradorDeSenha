import AsyncStorage from '@react-native-async-storage/async-storage';

const { create } = require('zustand');
const { persist } = require('zustand/middleware');

export const useSenhasStore = create(
    persist(
        (set) => ({
            senhas: [],

            adicionarSenha: ({ nomeAplicativo, senha }) =>
                set((state) => ({
                    senhas: [
                        {
                            idLocal: Date.now().toString(),
                            nomeAplicativo,
                            senha,
                            criadoEm: new Date().toISOString(),
                            pending: true,
                        },
                        ...state.senhas,
                    ],
                })),

            removerSenhaLocal: (idLocal) =>
                set((state) => ({
                    senhas: state.senhas.filter(
                        (item) => item.idLocal !== idLocal
                    ),
                })),

            marcarComoSincronizada: (ids) =>
                set((state) => ({
                    senhas: state.senhas.map((item) =>
                        ids.includes(item.idLocal)
                            ? { ...item, pending: false }
                            : item
                    ),
                })),
        }),
        {
            name: 'senhas-storage',
            storage: AsyncStorage,
        }
    )
);
