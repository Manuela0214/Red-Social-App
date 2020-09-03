import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import {Ionicons} from '@expo/vector-icons'
export default class InfoScreen extends React.Component {

    
    render() {
        return(
            <Image style={styles.info} source={require('../../../assets/info.png')}></Image>
        
        );
       
    }
}



const styles = StyleSheet.create({

    info: {
        height:"90%",
        width: "100%"
      },


});