import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import LoginScreen from './views/Login/LoginScreen';
import RegisterScreen from './views/Register/RegisterScreen';

export default function App() {
  return (
    LoginScreen()
  );
}