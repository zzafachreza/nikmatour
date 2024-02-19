import { View, Text, FlatList, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { MyHeader } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'
import { MyDimensi, colors, fonts } from '../../utils'

export default function PaketUmrah({ navigation }) {
  const MyBack = () => {
    navigation.goBack();
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    __getPaket();
  }, [])

  const __getPaket = () => {
    setLoading(true);
    axios.post(apiURL + 'paket').then(res => {
      console.log(res.data);
      setData(res.data);
    })
  }


  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* HEADERS */}
      <MyHeader onPress={MyBack} judul='Paket Haji & Umroh' />
      <View style={{
        flex: 1,
        padding: 20,
      }}>
        <FlatList data={data} renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('PaketDetail', item)}>
              <View style={{
                backgroundColor: colors.white,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
                <Image source={{
                  uri: item.image
                }} style={{
                  width: '100%',
                  height: 200,
                }} />
                <View style={{
                  padding: 10,
                }}>
                  <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: MyDimensi / 4
                  }}>{item.paket}</Text>
                  <Text style={{
                    fontFamily: fonts.primary[800],
                    fontSize: MyDimensi / 2.5,
                    color: colors.primary,
                  }}>{new Intl.NumberFormat().format(item.harga_paket)}</Text>
                  {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                    <Text style={{
                      backgroundColor: colors.secondary,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      color: colors.white,
                      fontFamily: fonts.secondary[400],
                      fontSize: MyDimensi / 4
                    }}>Seat : {item.seat}</Text>
                    <Text style={{
                      backgroundColor: colors.primary,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      color: colors.white,
                      fontFamily: fonts.secondary[400],
                      fontSize: MyDimensi / 4
                    }}>Terisi : {item.terisi}</Text>
                    <Text style={{
                      backgroundColor: colors.success,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      color: colors.white,
                      fontFamily: fonts.secondary[400],
                      fontSize: MyDimensi / 4
                    }}>Tersedia : {item.sisa}</Text>
                  </View> */}
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
        }} />
      </View>
    </View>
  )
}