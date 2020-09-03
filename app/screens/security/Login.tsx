import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  SafeAreaView,
  Button,
  AsyncStorage,
} from "react-native";

import md5 from "md5";

const bgImg = require("../../../assets/bg/sky.jpg");

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    nombre_usuario: "",
    contrasena: "",
    url: "http://192.168.0.15:3000/login",
  };

  async onLogin() {
    const u = this.state.nombre_usuario;
    const p = md5(this.state.contrasena);
    fetch(this.state.url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_usuario: u,
        contrasena: p,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("------------");
        
        console.log(data);
        if (data.error) {
          Alert.alert("App Message", "Invalid data.");
        } else {
          this.state.nombre_usuario = "";
          this.state.contrasena = "";
          AsyncStorage.setItem("session", JSON.stringify(data));
          this.props.navigation.push("Home");
        }
      })

      .catch((err) => {
        Alert.alert("App Message", "Invalid data.");
      });
    //Alert.alert("Credentials", `username: ${username} - password: ${password}`);
  }

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={bgImg} style={styles.backgroundApp}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleText}>Inicia Sesion</Text>
          <TextInput
            value={this.state.nombre_usuario}
            keyboardType="default"
            onChangeText={(nombre_usuario) => this.setState({nombre_usuario})}
            placeholder="username"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.contrasena}
            onChangeText={(contrasena) => this.setState({contrasena})}
            placeholder={"password"}
            secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this.onLogin.bind(this)}
          >
            <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundApp: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    padding:10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#A471EF",
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center"
    
  },
  input: {
    width: 300,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10
  },
});