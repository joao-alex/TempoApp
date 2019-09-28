import React from 'react';
import { View,StyleSheet,TouchableOpacity,Image,Text } from 'react-native';

import backArrow from '../assets/backArrow.png'


export default function Header(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.backFunction}>
        <Image source={backArrow}/>
      </TouchableOpacity>
      <Text style={styles.t1}>{props.city}</Text>
      <Image source={backArrow}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    width:'100%',
    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
    justifyContent:'space-between',
    borderWidth:2,
    borderColor:'red'
  },
  t1:{
    fontSize:30,
    fontWeight:'bold',
    color:'#dff',
  },
})