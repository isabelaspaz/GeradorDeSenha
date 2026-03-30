import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Historico({ historico, limparHistorico }) {

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Suas senhas geradas:</Text>

            <View style={styles.lista}>
                {historico.length === 0 ? (
                    <Text style={styles.empty}>Você não possui senhas!</Text>
                ) : (
                    historico.map((senha, index) => (
                        <View key={index} style={styles.codeArea}>
                            <Text style={styles.codeText}>{senha}</Text>
                        </View>
                    ))
                )}
            </View>

            <Pressable style={styles.deleteButton} onPress={limparHistorico}>
                <Text style={styles.deleteText}>Apagar histórico</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 60,
        alignItems: "center"
    },

    title: {
        color: "#eb6589",
        fontSize: 28,
        fontWeight: "bold"
    },

    lista: {
        width: "30%",
        alignItems: "center"
    },

    codeArea: {
        backgroundColor: "#ffe7ed",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#eb6589",
        marginBottom: 10,
        width: "100%"
    },

    codeText: {
        color: "#eb6589",
        textAlign: "center",
        fontWeight: "bold"
    },

    empty: {
        color: "#eb6589",
        marginTop: 10,
        fontWeight: "500"
    },

    deleteButton: {
        marginTop: 20,
        backgroundColor: "#eb6589",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },

    deleteText: {
        color: "white",
        fontWeight: "bold"
    }
    , subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#eb6589",
        marginBottom: 20
    },
});