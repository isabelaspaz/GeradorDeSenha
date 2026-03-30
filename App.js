import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import Home from './screens/Home';
import Historico from './screens/Historico';

const Stack = createNativeStackNavigator();

export default function App() {

  const [historico, setHistorico] = useState([]);

  const limparHistorico = () => {
    setHistorico([]);

    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem("historicoSenhas");
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#eb6589",
          headerTitleStyle: { fontWeight: "bold" }
        }}
      >

        <Stack.Screen name="Home" options={{ title: "Gerador de senha ♥" }}>
          {(props) => (
            <Home
              {...props}
              historico={historico}
              setHistorico={setHistorico}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Historico" options={{ title: "Histórico de senhas ♥" }}>
          {(props) => (
            <Historico
              {...props}
              historico={historico}
              limparHistorico={limparHistorico}
            />
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}