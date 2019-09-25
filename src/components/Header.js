import React from 'react';
import { View,StyleSheet,TouchableOpacity,Image } from 'react-native';

import backArrow from '../assets/backArrow.png'


export default function Header(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.backFunction}>
        <Image source={backArrow}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    width:'100%',
    height:40,
    paddingTop:10,
    paddingLeft:10,
  },
})