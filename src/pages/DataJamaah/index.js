import { View, Text, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButtonSecond, MyCalendar, MyGap, MyHeader, MyPicker } from '../../components';
import { apiURL } from '../../utils/localStorage';
import axios from 'axios';
import { MyDimensi, colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';


export default function DataJamaah({ navigation, route }) {
  const user = route.params;
  const [jamaah, setJamaah] = useState([]);
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      __getJamaah();
    }
  }, [isFocus]);


  const __getJamaah = () => {
    axios.post(apiURL + 'jamaah', {
      input_by: user.id_pengguna,
      level: user.level,
    }).then(res => {
      setJamaah(res.data.data);


    })
  }
  const BackPage = () => {
    navigation.goBack();
  }
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* HEADERS */}
      <MyHeader onPress={BackPage} judul='Data Jamaah' />

      <FlatList data={jamaah} renderItem={({ item, index }) => {
        return (
          <TouchableWithoutFeedback onPress={() => navigation.navigate('JamaahDetail', item)}>
            <View style={{
              marginVertical: 5,
              borderRadius: 10,
              backgroundColor: colors.white,
              padding: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                flex: 1,
              }}>
                <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4 }}>
                  Nomor KTP
                </Text>
                <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                  {item.nomor_ktp}
                </Text>
                <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4 }}>
                  Nama Jamaah
                </Text>
                <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                  {item.nama_jamaah}
                </Text>
                <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4 }}>
                  Nomor Telepon
                </Text>
                <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                  {item.telepon_jamaah}
                </Text>
              </View>
              <View>
                <Icon type='ionicon' name='chevron-forward-circle-outline' size={MyDimensi / 2} color={colors.primary} />
              </View>


            </View>
          </TouchableWithoutFeedback>
        )
      }} />
    </View>
  )
}