import { View, Text, FlatList, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { MyHeader } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'
import { colors } from 'react-native-elements'
import { MyDimensi, fonts } from '../../utils'

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
            <TouchableWithoutFeedback>
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
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>{item.paket}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
        }} />
      </View>
    </View>
  )
}