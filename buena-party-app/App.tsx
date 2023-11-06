import { NavigationContainer } from '@react-navigation/native';
import FirstScreen from './src/screens/FirstScreen';
import Login from './src/screens/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateEvent from './src/screens/CreateEvent';
import HomeScreen from './src/screens/HomeScreen';
import Register from './src/screens/Register';
import ListEvents from './src/screens/ListEvents';
import EditEvent from './src/screens/EditEvent';
import ManageEvent from './src/screens/ManageEvent';
import Guests from './src/screens/Guest';
import InviteCodeScreen from './src/screens/InviteCodeScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
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
            name="CreateEvent"
            component={CreateEvent}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
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

          <Stack.Screen
            name="EditEvent"
            component={EditEvent}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider >*/
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>


          <Stack.Screen
            name="EditEvent"
            component={InviteCodeScreen}
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