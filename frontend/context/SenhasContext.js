import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useReducer } from 'react';

const STORAGE_KEY = '@senhas_offline';

const SenhasContext = createContext();

const initialState = {
    senhas: [],
};

function senhasReducer(state, action) {
    switch (action.type) {
        case 'CARREGAR_SENHAS':
            return {
                ...state,
                senhas: action.payload,
            };

        case 'ADICIONAR_SENHA':
            return {
                ...state,
                senhas: [action.payload, ...state.senhas],
            };

        case 'MARCAR_COMO_SINCRONIZADA':
            return {
                ...state,
                senhas: state.senhas.map((senha) =>
                    action.payload.includes(senha.idLocal)
                        ? { ...senha, pending: false }
                        : senha
                ),
            };

        case 'REMOVER_SENHA':
            return {
                ...state,
                senhas: state.senhas.filter(
                    (senha) => senha.idLocal !== action.payload
                ),
            };

        default:
            return state;
    }
}

export function SenhasProvider({ children }) {
    const [state, dispatch] = useReducer(senhasReducer, initialState);

    useEffect(() => {
        async function carregarSenhas() {
            try {
                const senhasSalvas = await AsyncStorage.getItem(STORAGE_KEY);

                if (senhasSalvas) {
                    dispatch({
                        type: 'CARREGAR_SENHAS',
                        payload: JSON.parse(senhasSalvas),
                    });
                }
            } catch (error) {
                console.log('Erro ao carregar senhas locais:', error);
            }
        }

        carregarSenhas();
    }, []);

    useEffect(() => {
        async function salvarSenhas() {
            try {
                await AsyncStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(state.senhas)
                );
            } catch (error) {
                console.log('Erro ao salvar senhas locais:', error);
            }
        }

        salvarSenhas();
    }, [state.senhas]);

    const adicionarSenha = async ({ nomeAplicativo, senha }) => {
        const novaSenha = {
            idLocal: Date.now().toString(),
            nomeAplicativo,
            senha,
            criadoEm: new Date().toISOString(),
            pending: true,
        };

        dispatch({
            type: 'ADICIONAR_SENHA',
            payload: novaSenha,
        });
    };

    const marcarComoSincronizada = (idsLocais) => {
        dispatch({
            type: 'MARCAR_COMO_SINCRONIZADA',
            payload: idsLocais,
        });
    };

    const removerSenhaLocal = (idLocal) => {
        dispatch({
            type: 'REMOVER_SENHA',
            payload: idLocal,
        });
    };

    return (
        <SenhasContext.Provider
            value={{
                senhas: state.senhas,
                adicionarSenha,
                marcarComoSincronizada,
                removerSenhaLocal,
            }}
        >
            {children}
        </SenhasContext.Provider>
    );
}

export function useSenhas() {
    const context = useContext(SenhasContext);

    if (!context) {
        throw new Error('useSenhas deve ser usado dentro de SenhasProvider');
    }

    return context;
}