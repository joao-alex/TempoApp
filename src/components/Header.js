import React from 'react';
import { View,StyleSheet } from 'react-native';

import Icon from 'react-native-elements'

// import { Container } from './styles';

export default function Header(backFunction) {
  return (
    <View style={styles.container}>
      <Icon
        name='arrow_back'
        onPress={backFunction}
        color='#dff'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    width:'100%',
    height:40,
  }
})