import { NavigationContainer } from '@react-navigation/native';
import FirstScreen from './src/screens/FirstScreen';
import Login from './src/screens/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
<<<<<<< HEAD
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateEvent from './src/screens/CreateEvent';
import HomeScreen from './src/screens/HomeScreen';
import Register from './src/screens/Register';
import ListEvents from './src/screens/ListEvents';
=======
import { createNativeStackNavigator } from "@react-navigation/native-stack"; import Register from './src/screens/Register';
import EditAccount from './src/screens/EditAccount';
import { View } from 'react-native';
import HomeScreens from './src/screens/HomeScreens';
import CreateEvent from './src/screens/CreateEvent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EditEvent from './src/screens/EditEvent';
import HomeScreens2 from './src/screens/ListEvents';
;
>>>>>>> d96305c85b96b8a0817491a4db878f0fec2f3977
const Stack = createNativeStackNavigator();

const App = () => {
  return (
<<<<<<< HEAD
=======


    /* <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
  
            <Stack.Screen
              name="FirstScreen"
              component={FirstScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
            name="EditAccount"
            component={EditAccount} // Adicione a tela EditAccount aqui
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
           name="Home"
           component={HomeScreens}
           options={{
             headerShown: false,
           }} />
           <Stack.Screen
             name="EditEvent"
             component={EditEvent}
             options={{
               headerShown: false,
             }}
           />
           <Stack.Screen
             name="CreateEvent"
             component={CreateEvent}
             options={{
               headerShown: false,
             }}
           />
  
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>*/


>>>>>>> d96305c85b96b8a0817491a4db878f0fec2f3977
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
<<<<<<< HEAD
            name="FirstScreen"
            component={FirstScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="CreateEvent"
            component={CreateEvent}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
=======
            name="CreateEvent"
            component={HomeScreens2}
>>>>>>> d96305c85b96b8a0817491a4db878f0fec2f3977
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ListEvents"
            component={ListEvents}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider >
  )
};


export default App;