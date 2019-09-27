import React ,{useState,useEffect,Fragment}from 'react';
import { SafeAreaView,ImageBackground,TouchableOpacity,Text,StatusBar ,ActivityIndicator,StyleSheet} from 'react-native';

import Geolocation from '@react-native-community/geolocation'

import bg from '../assets/bg.png'
import api from '../services/api'
import Header from '../components/Header'

export default function TempoByLocation({navigation}) {
  const [data,setData] = useState({})
	const [status,setStatus] = useState(false);

	useEffect( () => {

		Geolocation.getCurrentPosition(position=>{
			console.log(`/weather/1.0/report.json?product=forecast_7days_simple&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&app_id=7rd3QaqjDYvrNjEBrRzm&app_code=dmVGpNKtkpDjt68N-k4XqA&language=pt-BR`)
			async function getPrevisao(){
				const response = await api.get(`/weather/1.0/report.json?product=forecast_7days_simple&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&app_id=7rd3QaqjDYvrNjEBrRzm&app_code=dmVGpNKtkpDjt68N-k4XqA&language=pt-BR`)
        console.log(response.data)
        setData(response.data)
        setStatus(true)
			}
      getPrevisao()
			},error=> alert(error.message),{timeout:20000,maximumAge:1000}
		);
		
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
