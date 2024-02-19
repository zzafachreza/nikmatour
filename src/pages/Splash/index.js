import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';

export default function Splash({ navigation }) {

  const img = new Animated.Value(windowWidth / 3);
  const text = new Animated.Value(0);
  Animated.timing(img, {
    toValue: windowWidth / 1.2,
    duration: 750,
    useNativeDriver: false,
  }).start();

  Animated.timing(text, {
    toValue: windowHeight / 4.5,
    duration: 1000,
    useNativeDriver: false,
  }).start();

  useEffect(() => {
    setTimeout(() => {
      getData('user').then(res => {
        if (!res) {
          navigation.replace('Login')
        } else {
          // navigation.replace('GetStarted')
          navigation.replace('MainApp')
        }
      })
    }, 1200)
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
      padding: 0,
      backgroundColor: colors.white,
      justifyContent: 'center',
      position: 'relative'

    }}>


      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:colors.white
      
      }}>
     <ImageBackground source={require('../../assets/bgsplash.png')} style={{
      flex:1,
      width:'100%',
      height:'100%',
      justifyContent: 'center',
    alignItems: 'center',
    
     }}>
     <Animated.Image
          source={require('../../assets/nikmatour.png')}
          resizeMode="contain"
          style={{
            width: img,
            height: img
          }}
        />
        {/* <Animated.Text style={{
          fontFamily: fonts.secondary[800],
          fontSize: MyDimensi/4,
          color: colors.white,
          marginTop: 10,
          marginBottom: text,
          textAlign: 'center',
        }}>Monitoring Asupan MPASI</Animated.Text> */}

        <ActivityIndicator color={colors.secondary} size="large" />
     </ImageBackground>
      </View>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
