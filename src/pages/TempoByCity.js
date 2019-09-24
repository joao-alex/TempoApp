import React,{Fragment} from 'react';
import { SafeAreaView,Text,StyleSheet ,ImageBackground,StatusBar,TouchableOpacity} from 'react-native';

import bg from '../assets/bg.png'
import api from '../services/api'


export default function TempoByCity({navigation}) {
  const cidade = navigation.getParam('cidade')
  async function getPrevisao(){
    const response = await api.get(`/weather/1.0/report.json?product=forecast_7days_simple&name=${cidade}&app_id=7rd3QaqjDYvrNjEBrRzm&app_code=dmVGpNKtkpDjt68N-k4XqA&language=pt-BR`)
    console.log(response)
  }
  return (
    <Fragment>
      <StatusBar barStyle="white-content" backgroundColor="#7087D2"/>
      <SafeAreaView>
        <ImageBackground source={bg} style={styles.back}>
          <Text style={styles.t1}>{cidade}</Text>
          <TouchableOpacity style={styles.b1} onPress={getPrevisao}>
            <Text style={styles.t2}>Minha Localização</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  back:{
    width: '100%', 
    height: '100%',
    alignItems:'center',
    justifyContent:'center',
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
