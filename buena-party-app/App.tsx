import { NavigationContainer } from '@react-navigation/native';
import FirstScreen from './src/screens/FirstScreen';
import Login from './src/screens/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from "@react-navigation/native-stack"; import Register from './src/screens/Register';
import EditAccount from './src/screens/EditAccount';
import { View } from 'react-native';
import HomeScreens from './src/screens/HomeScreens';
import CreateEvent from './src/screens/CreateEvent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EditEvent from './src/screens/EditEvent';
import HomeScreens2 from './src/screens/HomeScreens2';
;
const Stack = createNativeStackNavigator();

const App = () => {
  return (


    <SafeAreaProvider>
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
     </SafeAreaProvider>
   
  )
};


export default App;