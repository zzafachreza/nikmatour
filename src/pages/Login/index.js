import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Animated, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking, ImageBackground } from 'react-native';
import { fonts, windowWidth, colors, windowHeight, MyDimensi } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import { color } from 'react-native-reanimated';

export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});

  const card = new Animated.Value(-30);
  const img = new Animated.Value(-20);




  const masuk = () => {


    if (kirim.username == null && kirim.password == null) {
      showMessage({
        message: 'Username dan Password tidak boleh kosong !'
      })
    } else if (kirim.username == null) {
      showMessage({
        message: 'Username tidak boleh kosong !'
      })
    } else if (kirim.password == null) {
      showMessage({
        message: 'Password tidak boleh kosong !'
      })
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('MainApp')
          }
        });



    }




  }

  useEffect(() => {
    Animated.timing(card, {
      toValue: 1,
      duration: 850,
      useNativeDriver: false,
    }).start();
    Animated.timing(img, {
      toValue: 0,
      duration: 850,
      useNativeDriver: false,
    }).start();
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })

  }, []);

  return (

    <ScrollView style={{ flex: 1, backgroundColor: colors.white, position: "relative" }}>




      <View style={{
        justifyContent: 'center',
        alignItems: 'center',



      }}>
        <ImageBackground style={{
          flex: 1,
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: "center"
        }} source={require('../../assets/bgimglogin.png')}>
          <Animated.Image source={require('../../assets/nikmatour.png')} style={{
            marginTop: 10,
            width: windowWidth / 1.9,
            height: windowWidth / 1.9,
            resizeMode: 'contain'
          }} />
        </ImageBackground>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: colors.primary, borderTopRightRadius: 50, borderTopLeftRadius: 50, position: 'relative' }}>
        <Animated.View style={{
          padding: 20,
          flex: 1, margin: 10,
          bottom: card,
          borderRadius: 10,

        }}>

          <Text style={{
            textAlign: 'center',
            fontFamily: fonts.primary[600],
            fontSize: MyDimensi / 2.5,
            marginTop: -25
          }}>
            LOGIN
          </Text>


          {/* USERNAME INPUT */}


          <MyGap jarak={50} />

          <MyInput label="Username" onChangeText={x => {
            setKirim({
              ...kirim,
              username: x
            })
          }} iconname="person" placeholder="Masukan username" />


          <MyGap jarak={20} />
          {/* PASSWORD INPUT */}


          <MyInput label="Password" onChangeText={x => {
            setKirim({
              ...kirim,
              password: x
            })
          }} iconname="key" placeholder="Masukan password" secureTextEntry={true} />


          {/* BUTTON LOGIN */}
          <TouchableOpacity onPress={() => {
            let urlWA = 'https://wa.me/' + comp.tlp + `?text=Hallo admin saya lupa password . . .`;
            Linking.openURL(urlWA)
          }} style={{
            marginTop: 0,
          }}>
            <Text style={{
              textAlign: 'right',
              fontFamily: fonts.secondary[600],
              color: colors.black,
              fontSize: MyDimensi / 4,
              marginTop: 10,

            }}>Lupa password ?</Text>
          </TouchableOpacity>

          <MyGap jarak={40} />
          <MyGap jarak={0} />

          {loading && <ActivityIndicator size="large" color={colors.black} />}
          {!loading &&





            <MyButton
              onPress={masuk}
              title="Login"


              Icons="log-in-outline"
            />


          }

          {!loading && <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
            <View style={{
              marginTop: 10,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: MyDimensi / 4,
                fontFamily: fonts.primary[400],
                textAlign: 'center',
                color: colors.black
              }}>Belum memiliki Akun ? <Text style={{
                fontSize: MyDimensi / 4,
                fontFamily: fonts.primary[600],
                textAlign: 'center',
                color: colors.black
              }}>Daftar disini</Text></Text>
            </View>
          </TouchableWithoutFeedback>}

        </Animated.View>
        <View style={{ marginTop: '100%' }}>

        </View>
      </ScrollView>




      {loading && <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator color={colors.black} size="large" />
      </View>}
    </ScrollView>




  );
}

const styles = StyleSheet.create({});
