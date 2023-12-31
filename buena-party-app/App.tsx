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
import React, { useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EnterEvent from './src/screens/EnterEvent';
import EventInfo from './src/screens/EventInfo';
import Feed from './src/screens/Feed';
import ResetPassword from './src/screens/ResetPassword';
import { Linking } from 'react-native';


const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      ResetPassword: 'reset/:resetToken',
    },
  },
}

const App = () => {

  /*const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = async () => {
    // Check if the user is logged in (e.g., by verifying an auth token)
    const authToken = await AsyncStorage.getItem('authToken');
    setUserIsLoggedIn(!!authToken); // Set userIsLoggedIn based on the presence of an authToken
  };*/

  return (
   <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          {/*{userIsLoggedIn ? (
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : (
          <Stack.Screen
            name="FirstScreen"
            component={FirstScreen}
            options={{
              headerShown: false,
            }}
          />
          )}*/}
          <Stack.Screen
            name="FirstScreen"
            component={FirstScreen}
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
          <Stack.Screen
            name="InviteCode"
            component={InviteCodeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ManageEvent"
            component={ManageEvent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Guests"
            component={Guests}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EnterEvent"
            component={EnterEvent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EventInfo"
            component={EventInfo}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Feed"
            component={Feed}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
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