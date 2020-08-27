import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, Alert, Button, AsyncStorage } from "react-native";

export default class SessionNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoggedIn: false,
    name: "",
  };

  async componentDidMount() {
    let session = await AsyncStorage.getItem("session");

    if (session) {
      this.setState({
        isLoggedIn: true,
        name: JSON.parse(session).data.nombre_usuario,
      });
    }
  }

  signOut = () => {
    Alert.alert("Salir de la sesión", "Quieres salir?", [
      {
        text: "Si",
        onPress: () => {
          AsyncStorage.removeItem("session");
          this.setState({
            isLoggedIn: false,
            name: "",
          });
        },
      },
      {
        text: "No hombre no",
      },
    ]);
  };

  render() {
    if (this.state.isLoggedIn) {
      return <Text style={styles.sesion} onPress={this.signOut}>En sesion {this.state.name}</Text>;
    } else {
      return (
        <Button
          title="Ingresar"
          onPress={() => this.props.navigation.push("Login")}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    alignItems: "center",
    marginBottom: 50,
    zIndex: 1,
  },
  sesion:{
    fontSize: 12,
    color:"green",
  }
});