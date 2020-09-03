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
  ScrollView
} from "react-native";

import md5 from "md5";

const bgImg = require("../../../assets/bg/sky.jpg");

export default class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    celular: "",
    email: "",
    pais: "",
    ciudad: "",
    fecha_nacimiento: "",
    //foto_perfil:String; 
    genero: "",
    intereses: "",
    mensajesId: "",
    url: "http://192.168.0.15:3000/usuarios",
  };

  async onRegister() {
    const pn = this.state.primer_nombre;
    const sg = this.state.segundo_nombre;
    const pa = this.state.primer_apellido;
    const sa = this.state.segundo_apellido;
    const c = this.state.celular;
    const e = this.state.email;
    const p = this.state.pais;
    const ciu = this.state.ciudad;
    const fn = this.state.fecha_nacimiento;
    const g = this.state.genero;
    const i = this.state.intereses;
    //const p = md5(this.state.contrasena);
    fetch(this.state.url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        primer_nombre: pn,
        segundo_nombre: sg,
        primer_apellido: pa,
        segundo_apellido: sa,
        celular: c,
        email: e, 
        pais: p,
        ciudad: ciu,
        fecha_nacimiento: fn,
        genero: g,
        intereses: i
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("------------");
        console.log(data);

        if (data.error) {
            console.log(data.error);
            
          Alert.alert("App Message", "Formulario invalido");
        } else {
          this.state.primer_nombre = "";
          this.state.segundo_nombre = "";
          this.state.primer_apellido = "";
          this.state.segundo_apellido = "";
          this.state.celular = "";
          this.state.email = "";
          this.state.pais = "";
          this.state.ciudad = "";
          this.state.fecha_nacimiento = "";
          this.state.genero = "";
          this.state.intereses = "";
          this.props.navigation.push("Login");
        }
      })

      .catch((err) => {
        Alert.alert("App Message", "Formulario invalido");
        console.log(err);
        
      });
    //Alert.alert("Credentials", `username: ${username} - password: ${password}`);
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
      <ImageBackground source={bgImg} style={styles.backgroundApp}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleText}>Registrate!</Text>
          <TextInput
            value={this.state.primer_nombre}
            keyboardType="default"
            onChangeText={(primer_nombre) => this.setState({primer_nombre})}
            placeholder="Primer nombre"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.segundo_nombre}
            keyboardType="default"
            onChangeText={(segundo_nombre) => this.setState({segundo_nombre})}
            placeholder="Segundo nombre"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.primer_apellido}
            keyboardType="default"
            onChangeText={(primer_apellido) => this.setState({primer_apellido})}
            placeholder="Primer apellido"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.segundo_apellido}
            keyboardType="default"
            onChangeText={(segundo_apellido) => this.setState({segundo_apellido})}
            placeholder="Segundo apellido"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.celular}
            keyboardType="default"
            onChangeText={(celular) => this.setState({celular})}
            placeholder="Celular"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.email}
            keyboardType="default"
            onChangeText={(email) => this.setState({email})}
            placeholder="Email"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.pais}
            keyboardType="default"
            onChangeText={(pais) => this.setState({pais})}
            placeholder="Pais"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.ciudad}
            keyboardType="default"
            onChangeText={(ciudad) => this.setState({ciudad})}
            placeholder="Ciudad"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.fecha_nacimiento}
            keyboardType="default"
            onChangeText={(fecha_nacimiento) => this.setState({fecha_nacimiento})}
            placeholder="Fecha de nacimiento"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.genero}
            keyboardType="default"
            onChangeText={(genero) => this.setState({genero})}
            placeholder="Genero"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.intereses}
            keyboardType="default"
            onChangeText={(intereses) => this.setState({intereses})}
            placeholder="Intereses"
            placeholderTextColor="gray"
            style={styles.input}
          />
          
          <TouchableOpacity
            style={styles.button}
            onPress={this.onRegister.bind(this)}
          >
            <Text style={styles.buttonText}> Register </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
      </ScrollView>
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
    paddingTop:30,
    paddingBottom:30
  },
  button: {
    alignItems: "center",
    backgroundColor: "#AA7CED",
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
    justifyContent: "center",
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