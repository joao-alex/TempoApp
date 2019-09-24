import React,{Fragment} from 'react';
import { SafeAreaView,Text,StyleSheet ,ImageBackground,StatusBar} from 'react-native';

import bg from '../assets/bg.png'

export default function TempoByCity({navigation}) {
  const cidade = navigation.getParam('cidade')
  return (
    <Fragment>
      <StatusBar barStyle="white-content" backgroundColor="#7087D2"/>
      <SafeAreaView>
        <ImageBackground source={bg} style={styles.back}>
          <Text style={styles.t1}>{cidade}</Text>
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
});
