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
} from "react-native";

import SessionNavbar from "./security/SessionNavbvar";

const bgImg = require("../../assets/bg/astronauta.jpg");

//const bgImg = require("../../assets/bg/astronauta.jpg");
 
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
          <Text>Cargando..., mientras tanto...¿Todo bien por casita?</Text>
        </View>
      );
    } else {
      return (
        <ImageBackground source={bgImg} style={styles.backgroundApp}>
        <View style={styles.videojuegosView}>
         <SessionNavbar navigation={navigation}></SessionNavbar>
          <Text style={{ color: "orange", fontSize: 25 }}>Videojuegos List</Text>
          <FlatList
            style={styles.flatList}
            data={this.state.videojuegos}
            renderItem={({ item }) => (
              <View style={styles.videojuegoViewContent}>
                <TouchableHighlight
                  onPress={() => {
                    Alert.alert("Image Tapped", `Videojuego: ${item.nombre}`);
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
                
                <Text style={styles.Categoria}>Categoria: {item.categoria.nombre}</Text>
              </View>
            )}
          ></FlatList>
        </View>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  videojuegoViewContent: {
    borderColor: "gray",
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
  videojuegoName: {
    fontSize: 18,
    color: "#ff0000",
  },
  Categoria:{
    color: "white",
  },
  videojuegosView: {
    alignItems: "center",
    alignContent: "center",
    flex: 1,
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
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
  img: {
    width: 100,
    height: 100,
  },
  separator: {
    height: 4,
    backgroundColor: "white",
    width: Dimensions.get("window").width / 2,
  },
});