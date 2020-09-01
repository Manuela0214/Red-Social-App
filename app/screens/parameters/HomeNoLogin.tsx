import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
  ScrollView
} from "react-native";

import SessionNavbar from "../security/SessionNavbvar";
import home from "../Main";

import Home from "../Main";

const bgImg = require("../../../assets/bg/astronauta.jpg");
//const videojuegos = require("../../assets/videojuego.jpg");
//const ofertas = require("../../assets/oferta.png");
//const publicaciones = require("../../assets/publicacion");
//const chat = require("../../assets/chat.jpg");
//const imagFont = require("../../assets/bg/demo.PNG");


export default class Main extends React.Component {
    constructor(props) {
        super(props);
      }
    
      state = {
        isLoggedIn: false
      };
    
      async componentDidMount() {
        let session = await AsyncStorage.getItem("session");
    
        if (session) {
          
          console.log(session)
          this.setState({
            
            isLoggedIn: true,
          });
        }
      }
  
  render() {
    const { navigation } = this.props;
    if(this.state.isLoggedIn === false){
        return(
        
            <ScrollView  style={{backgroundColor:"white"}}>
            <SessionNavbar navigation={navigation}></SessionNavbar>
            <Text style={styles.texto}>Sube publicaciones sobre tus videojuegos favoritos</Text>
            <Image style={styles.imagenHome} source={require('../../../assets/publicacion.jpeg')}></Image>
            <Text style={styles.texto}>Mira diferentes videojuegos</Text>
            <Image style={styles.imagenHome} source={require('../../../assets/videojuego.jpeg')}></Image>
            <Text style={styles.texto}>Conoce ofertas de tus videojuegos favoritos</Text>
            <Image style={styles.imagenHome} source={require('../../../assets/oferta.jpeg')}></Image>
            <Text style={styles.texto}>Comparte con otros usuarios con chat en vivo</Text>
            <Image style={styles.imagenHome} source={require('../../../assets/chat.jpeg')}></Image>
            </ScrollView>
          );
    }else{
        return <Home navigation={navigation}></Home>
    }
   
}
}

const styles = StyleSheet.create({
  homeeses:{
    alignItems: "center",
    justifyContent: "center",
  },

  imagenHome: {
    height:500,
    width: "100%",
    marginTop:30,
    paddingEnd:30
  },

  texto:{
    fontWeight: "800",
    fontSize: 30,
    color: "#2962FF",
    alignItems: "center",
    justifyContent: "center",
    marginStart:50
  }
});