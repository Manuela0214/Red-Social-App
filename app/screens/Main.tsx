import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Colors, Card, BottomNavigation, Banner } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';



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
  Button,
} from "react-native";

import SessionNavbar from "./security/SessionNavbvar";


const MORE_ICON = Platform.OS === 'android' ? 'dots-horizontal' : 'dots-vertical';


const bgImgHome = require("../../assets/bg/astronauta.jpg");
const bgImg = require("../../assets/bg/mobile_bg.jpg");

//<ImageBackground source={bgImg} style={styles.backgroundApp}></ImageBackground>

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      videojuegos: [],
      url:
        'http://192.168.1.55:3000/videojuego?filter={"include":[{"relation":"categoria"},{"relation":"imagenes"}]}',
    };
  }




  componentDidMount = () => {
    this.getVideojuegos();
  };

  getVideojuegos = () => {
    this.setState({ loading: true });
    fetch(this.state.url)
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          videojuegos: data,
          loading: false,
        });
      })
      .catch((err) => {
        //console.log(err);
        Alert.alert("Error", "Error loading videojuegos.");
      });
  };

  render() {
    const { navigation } = this.props;
    if (this.state.loading) {
      return (
        <View style={styles.dataViewLoading}>
          
          <ImageBackground source={bgImg} style={styles.backgroundApp}>
          <ActivityIndicator style={styles.animacion} animating={true} color={Colors.cyan500} size={'large'} />
          <Text style={styles.cargandito}>Cargando... mientras tanto...¿Todo bien por casita?</Text>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View >
           <ImageBackground source={bgImgHome} style={styles.backgroundApp}>
          <SessionNavbar navigation={navigation}></SessionNavbar>
        
          <View style={styles.videojuegosView}>
         
            <Text style={{ color: "#9BEE02", fontSize: 25, fontWeight : "100",}}>VIDEOJUEGOS</Text>

            <FlatList data={this.state.videojuegos} renderItem={({ item }) => (
                <View style={styles.videojuegoViewContent}>
                  <TouchableHighlight
                    onPress={() => {
                      Alert.alert(`Videojuego: ${item.nombre}`);
                    }}
                  >
                    <Image
                      source={{
                        width: 150,
                        height: 150,
                        uri: `http://192.168.1.55:3000/files/2/${item.imagenes[0].id}`,
                      }}
                    />
                  </TouchableHighlight>
                  <Text style={styles.videojuegoName}>{item.nombre}</Text>
                  <Text style={styles.Categoria}>Categoria:{item.categoria.nombre}</Text>
                </View>
              )}
            ></FlatList>
           
          </View>
          </ImageBackground>
        </View>

      );
    }
  }
}

const styles = StyleSheet.create({
  videojuegoViewContent: {
    borderColor: "#8CEE02",
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundApp: {
    flex: 1,
    width: "100%",
  },
  animacion: {
    margin: 150,
    alignItems: "center",
    justifyContent: "center"

  },
  videojuegoName: {
    fontSize: 18,
    color: "#ff0000",
  },
  Categoria: {
    color: "#8CEE02",
  },
  videojuegosView: {
    alignItems: "center",
    alignContent: "center"
  },
  dataViewLoading: {
    alignItems: "center",
    alignContent: "center",
    flex: 1,
  },
  button: {
    alignSelf: "center",
    alignContent: "flex-start",
  },
  itemTitle: {
    padding: 10,
    fontSize: 25,
    height: 44,
    fontWeight: "bold",
  },
  flatList: {
    backgroundColor:"red",
    alignContent: "space-between",
    textAlign: "center",
    alignSelf: "center",
  },
  img: {
    width: 150,
    height: 150,
  },
  separator: {
    height: 4,
    backgroundColor: "white",
    width: Dimensions.get("window").width / 2,
  },
  cargandito: {
    fontWeight: "800",
    fontSize: 30,
    color: "#CEF897",
    alignItems: "center",
    justifyContent: "center",
  },
  probando:{
    backgroundColor: "brown"
  }
});