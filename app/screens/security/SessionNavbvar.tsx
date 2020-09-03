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

  getName(){
    console.log(this.componentDidMount());
    
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
        text: "Cancelar",
      },
    ]);
  };

  render() {
    if (this.state.isLoggedIn) {
      return <View>
        <Appbar.Header>
            <Appbar.Content title="gamesGG" subtitle={`Hola!, ¿Cómo estás hoy ${this.state.name} ?`} />
            <Appbar.Action icon="chat" onPress={() => this.props.navigation.push("ChatLogin")} />
            <Appbar.Action icon="dots-vertical" onPress={() => this.props.navigation.push("Info")} />
          </Appbar.Header>
          <View style={styles.videojuegosView}>
            
          <Text style={styles.sesion} onPress={this.signOut}>En Linea</Text>
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
    fontSize:20,
    color:"#12B7FF",
  },
  videojuegosView: {
    alignItems: "flex-start",
    alignContent: "flex-start"
  }
});