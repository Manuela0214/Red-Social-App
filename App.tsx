import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatLogin from "./app/screens/chat/ChatLoginScreen";
import ChatScreen from "./app/screens/chat/ChatScreen";
import HomeScreen from "./app/screens/Main";
import LoginScreen from "./app/screens/security/Login";
import Regustro from "./app/screens/security/Registro"
import HomeScreen2 from "./app/screens/parameters/HomeNoLogin"
import Info from "./app/screens/chat/InfoScreen";

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Bienvenido">
        
      <Stack.Screen name="Bienvenido" component={HomeScreen2} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name = "Registro" component = {Regustro}/>
        <Stack.Screen name="ChatLogin" component={ChatLogin} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Info" component={Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

