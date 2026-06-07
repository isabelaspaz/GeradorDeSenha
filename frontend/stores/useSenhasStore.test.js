import { useSenhasStore } from './useSenhasStore';

const ESTADO_INICIAL = useSenhasStore.getState();

describe('useSenhasStore', () => {
    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(new Date('2026-06-07T12:00:00.000Z'));
        jest.spyOn(Date, 'now').mockReturnValue(123456789);
        useSenhasStore.setState(ESTADO_INICIAL, true);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
    });

    test('adiciona uma senha no inicio da lista com dados locais', () => {
        useSenhasStore.getState().adicionarSenha({
            nomeAplicativo: 'Instagram',
            senha: 'Aa123!@#',
        });

        expect(useSenhasStore.getState().senhas).toEqual([
            {
                idLocal: '123456789',
                nomeAplicativo: 'Instagram',
                senha: 'Aa123!@#',
                criadoEm: '2026-06-07T12:00:00.000Z',
                pending: true,
            },
        ]);
    });

    test('remove uma senha pelo idLocal', () => {
        useSenhasStore.setState({
            senhas: [
                {
                    idLocal: '1',
                    nomeAplicativo: 'Email',
                    senha: 'senha-1',
                    criadoEm: '2026-06-07T12:00:00.000Z',
                    pending: true,
                },
                {
                    idLocal: '2',
                    nomeAplicativo: 'Banco',
                    senha: 'senha-2',
                    criadoEm: '2026-06-07T12:05:00.000Z',
                    pending: true,
                },
            ],
        });

        useSenhasStore.getState().removerSenhaLocal('1');

        expect(useSenhasStore.getState().senhas).toEqual([
            {
                idLocal: '2',
                nomeAplicativo: 'Banco',
                senha: 'senha-2',
                criadoEm: '2026-06-07T12:05:00.000Z',
                pending: true,
            },
        ]);
    });

    test('marca como sincronizada somente as senhas informadas', () => {
        useSenhasStore.setState({
            senhas: [
                {
                    idLocal: '1',
                    nomeAplicativo: 'Email',
                    senha: 'senha-1',
                    criadoEm: '2026-06-07T12:00:00.000Z',
                    pending: true,
                },
                {
                    idLocal: '2',
                    nomeAplicativo: 'Banco',
                    senha: 'senha-2',
                    criadoEm: '2026-06-07T12:05:00.000Z',
                    pending: true,
                },
            ],
        });

        useSenhasStore.getState().marcarComoSincronizada(['2']);

        expect(useSenhasStore.getState().senhas).toEqual([
            expect.objectContaining({ idLocal: '1', pending: true }),
            expect.objectContaining({ idLocal: '2', pending: false }),
        ]);
    });
});
