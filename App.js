import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text } from 'react-native';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/GeradorDeSenha';
import Historico from './screens/Historico';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#eb6589',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: 'Home',
            headerLeft: () => null,
            headerBackVisible: false,
            gestureEnabled: false,

            headerRight: () => (
              <Pressable
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignIn' }],
                  })
                }
                style={{
                  paddingRight: 12,   // 👈 resolve o corte
                  paddingVertical: 4,
                }}
              >
                <Text
                  style={{
                    color: '#eb6589',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  Sair
                </Text>
              </Pressable>
            ),
          })}
        />

        <Stack.Screen
          name="Historico"
          component={Historico}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}