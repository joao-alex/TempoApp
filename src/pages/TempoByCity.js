import React,{Fragment,useState,useEffect} from 'react';
import { SafeAreaView,Text,StyleSheet ,ImageBackground,StatusBar,TouchableOpacity,ActivityIndicator,FlatList,View,ScrollView,Dimensions} from 'react-native';

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
      console.log(response.data)
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
              <ScrollView>
                <View style={styles.container}>
                  <FlatList
                    data={data.dailyForecasts.forecastLocation.forecast}
                    renderItem={({item,index})=>(
                      <View style={styles.container}>
                        { index == 0 ? (<>
                          <Text>{item.weekday}</Text>
                        </>)  
                        : (<>                       
                          <TouchableOpacity style={styles.b1}>
                            <Text style={styles.t2}>{item.weekday}</Text>
                          </TouchableOpacity>
                        </>) }
                        <Text style={styles.t1}> ─────── </Text>
                      </View>
                    )}
                    keyExtractor={(item) => item.weekday}
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
        </ImageBackground>
      </SafeAreaView>
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
  },
  b1:{
    flex:1,
    backgroundColor:"#dff",
    alignItems:'center',
    justifyContent:'center',
    width:(Dimensions.get('window').width-(Dimensions.get('window').width*0.2)),
    height:60,
    borderColor:'#dff',
    borderWidth:0,
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
