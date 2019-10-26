import React,{Fragment,useState,useEffect} from 'react';
import { SafeAreaView,Text,StyleSheet ,ImageBackground,StatusBar,TouchableOpacity,Dimensions,ActivityIndicator,FlatList,View,ScrollView,Image} from 'react-native';

import bg from '../assets/bg.png'
import api from '../services/api'
import Header from '../components/Header'

export default function TempoByCity({navigation}) {
  const cidade = navigation.getParam('cidade')
  const [status,setStatus] = useState(false);
  const [data,setData] = useState({});
  const [visibleDays,setVisibleDays] = useState([false,false,false,false,false,false])
  const [refresh,setRefresh] = useState(false);
  const [atual,setAtual]=useState({});
  
  function handleDays(index){
    let aux=visibleDays;
    if(aux[index])
      aux[index]=false;
    else aux[index]=true;
    setVisibleDays(aux)
    if(refresh)
      setRefresh(false)
    else setRefresh(true)
  }


  useEffect( () => {
    async function getPrevisao(){
      let response = await api.get(`/weather/1.0/report.json?product=forecast_7days_simple&name=${cidade}&app_id=7rd3QaqjDYvrNjEBrRzm&app_code=dmVGpNKtkpDjt68N-k4XqA&language=pt-BR`)
      setData(response.data)
      response = await api.get(`/weather/1.0/report.json?product=observation&name=${cidade}&app_id=7rd3QaqjDYvrNjEBrRzm&app_code=dmVGpNKtkpDjt68N-k4XqA&language=pt-BR`)
      setAtual(response.data)
      setStatus(true)
    }

    getPrevisao()
		
	}, [])

  return (
    <Fragment>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#7087D2"/>
        <ImageBackground source={bg} style={styles.back}>
          <SafeAreaView>
          {status ? (
              <ScrollView>
                <View style={styles.container}>
                  <View style={styles.atual}>
                    <Text style={styles.t1}>Atual: {parseInt(atual.observations.location[0].observation[0].temperature)}°</Text>
                    <Text style={styles.t1}>Mín: {parseInt(atual.observations.location[0].observation[0].lowTemperature)}° | Máx: {parseInt(atual.observations.location[0].observation[0].highTemperature)}°</Text>
                    <Text style={styles.t1}>{atual.observations.location[0].observation[0].description}</Text>
                  </View>
                  <FlatList
                    data={data.dailyForecasts.forecastLocation.forecast}
                    renderItem={({item,index})=>(
                      <View style={styles.container}>  
                        <Text style={styles.t1}> ─────── </Text>            
                        <TouchableOpacity style={styles.b1} onPress={()=>handleDays(index-1)}>
                          <Text style={styles.t2}>{item.weekday.toUpperCase()}</Text>
                        </TouchableOpacity>
                        {visibleDays[index-1] && (
                          <View style={styles.atual}>
                            <Text style={styles.t1}>Chuva: {item.rainFall!=="*" ? Math.round(parseFloat(item.rainFall*25.4)) : 0} mm</Text>
                            <Text style={styles.t1}>Mín: {parseInt(item.lowTemperature)}° | Máx: {parseInt(item.highTemperature)}°</Text>
                            <Text style={styles.t1}>{item.description}</Text>
                          </View>
                        ) }
                      </View>
                    )}
                    keyExtractor={(item) => item.weekday}
                    extraData={refresh}
                  />
                </View>
              </ScrollView>
            )
            :(
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#dff"/>
              </View> 
            )
            }
          </SafeAreaView>
        </ImageBackground>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  back:{
    width: '100%', 
    height: '100%',
  },
  loading:{
    flex:1,
    alignContent:'center',
    justifyContent:'center',
  },
  container:{
    width:'100%',
    flex:1,
    alignItems:'center'
  },
	t1:{
    fontSize:30,
    paddingTop:5,
    fontWeight:'bold',
    color:'#dff',
    paddingBottom:5,
    textAlign:'center',
  },
  b1:{
    flex:1,
    backgroundColor:"#dff",
    alignItems:'center',
    justifyContent:'center',
    width:(Dimensions.get('window').width-(Dimensions.get('window').width*0.1)),
    height:60,
    borderColor:'#dff',
    borderWidth:0,
    borderRadius:10,
  },
  t2:{
    fontSize:30,
    fontWeight:'bold',
    color:'#57ACE5',
  },
  atual:{
    flex:1,
    alignItems:'center',
    borderColor:'#dff',
    borderWidth:2,
    borderRadius:10,
    width:(Dimensions.get('window').width-(Dimensions.get('window').width*0.1)),
  },
});
