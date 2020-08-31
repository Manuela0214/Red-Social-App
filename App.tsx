import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatLogin from "./app/screens/chat/ChatLoginScreen";
import ChatScreen from "./app/screens/chat/ChatScreen";
import HomeScreen from "./app/screens/Main";
import LoginScreen from "./app/screens/security/Login";
import Regustro from "./app/screens/security/Registro"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name = "Registro" component = {Regustro}/>
        <Stack.Screen name="ChatLogin" component={ChatLogin} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

