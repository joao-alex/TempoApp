import React,{Fragment,useState,useEffect} from 'react';
import { SafeAreaView,Text,StyleSheet ,ImageBackground,StatusBar,TouchableOpacity,ActivityIndicator} from 'react-native';

import bg from '../assets/bg.png'
import api from '../services/api'
import Header from '../components/Header'


export default function TempoByCity({navigation}) {
  const cidade = navigation.getParam('cidade')
  const [status,setStatus] = useState(false);
  const [data,setData] = useState({})

  useEffect( () => {
    async function getPrevisao(){
      const response = await api.get(`/weather/1.0/report.json?product=forecast_7days_simple&name=${cidade}&app_id=7rd3QaqjDYvrNjEBrRzm&app_code=dmVGpNKtkpDjt68N-k4XqA&language=pt-BR`)
      setData(response.data)
      setStatus(true)
    }

    getPrevisao()
		
	}, [])

  return (
    <Fragment>
      <StatusBar barStyle="white-content" backgroundColor="#7087D2"/>
      <SafeAreaView>
        <ImageBackground source={bg} style={styles.back}>
          {status ? (
              <Header 
                backFunction={()=>{navigation.navigate('Home')}}
                city={data.dailyForecasts.forecastLocation.city}
              />
            ):(
              <ActivityIndicator size="large" color="#dff"/>
            )}
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
