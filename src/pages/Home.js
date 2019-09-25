

import React, {Fragment,useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  ImageBackground,
  TextInput
} from 'react-native';




import bg from '../assets/bg.png'

const Home = ({navigation}) => {

  const [city,setCity] = useState("")


  function openWeather(op){
    if(op==0)
      navigation.navigate('TempoByCity',{cidade:city});
    else{
      navigation.navigate('TempoByLocation');
    }
  }

  return (
    <Fragment>
      <StatusBar barStyle="white-content" backgroundColor="#7087D2"/>
      <SafeAreaView>
        <ImageBackground source={bg} style={styles.back}>
          <TextInput placeholder="Informe a cidade" style={styles.input} 
            onChangeText={setCity}
            value={city}
            placeholderTextColor="#dff" 
            returnKeyType="search" 
            onSubmitEditing={()=>{openWeather(0)}}/>
          <Text style={styles.t1}>OU</Text>
          <TouchableOpacity style={styles.b1} onPress={()=>{openWeather(1)}}>
            <Text style={styles.t2}>Minha Localização</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  back:{
    width: '100%', 
    height: '100%',
    alignItems:'center',
    justifyContent:'center',
  },
  input:{
    color:"#dff",
    width:"80%",
    height:60,
    paddingLeft:10,
    borderColor:'#dff',
    borderWidth:2,
    borderRadius:10,
    fontSize:25,
    textAlign:'center',
    fontWeight:'bold'
  },
  t1:{
    fontSize:30,
    paddingTop:30,
    fontWeight:'bold',
    color:'#dff',
    paddingBottom:30,
  },
  b1:{
    backgroundColor:"#dff",
    alignItems:'center',
    justifyContent:'center',
    width:"80%",
    height:60,
    borderColor:'#dff',
    borderWidth:2,
    borderRadius:10,
  },
  t2:{
    fontSize:30,
    paddingTop:30,
    fontWeight:'bold',
    color:'#57ACE5',
    paddingBottom:30,
  },

});

export default Home;
