import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, Alert, Button, AsyncStorage, View } from "react-native";
import{ActivityIndicator, Colors, Appbar} from 'react-native-paper';


export default class SessionNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoggedIn: false,
    name: "",
    nombre:""
  };

  async componentDidMount() {
    let session = await AsyncStorage.getItem("session");

    if (session) {
      
      console.log(session)
      this.setState({
        
        isLoggedIn: true,
        name: JSON.parse(session).data.nombre_usuario,
        nombre: JSON.parse(session).data.nombre
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
      return <View>
        <Appbar.Header>
            <Appbar.Content title="gamesGG" subtitle={`Hola!, ¿Cómo estás hoy ${this.state.nombre} ?`} />
            <Appbar.Action icon="chat" onPress={() => this.props.navigation.push("ChatLogin")} />
            <Appbar.Action icon="dots-vertical" onPress={() => { }} />
          </Appbar.Header>
          <View style={styles.videojuegosView}>
            
          <Text style={styles.sesion} onPress={this.signOut}>En sesion {this.state.name}</Text>
          </View>
          </View>
    } else {
      return (
        <View>
        <Appbar.Header>
            <Appbar.Content title="gamesGG" subtitle={'Bienvenido/a!'} />
            <Appbar.Action icon="login" onPress={() => this.props.navigation.push("Login")} />
            <Appbar.Action icon="book" onPress={() => this.props.navigation.push("Registro")} />
          </Appbar.Header>
          </View>
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
    fontWeight : "100",
        fontSize:17,
        color:"#F10085",
  },
  videojuegosView: {
    alignItems: "flex-start",
    alignContent: "flex-start"
  }
});