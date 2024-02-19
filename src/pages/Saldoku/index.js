import { View, Text, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButtonSecond, MyCalendar, MyGap, MyHeader, MyPicker } from '../../components';
import { apiURL } from '../../utils/localStorage';
import axios from 'axios';
import { MyDimensi, colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';


export default function Saldoku({ navigation, route }) {
  const user = route.params;
  const [jamaah, setJamaah] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    __getJamaah();
  }, []);


  const __getJamaah = () => {
    axios.post(apiURL + 'jamaah', {
      input_by: user.id_pengguna
    }).then(res => {
      console.log(res.data);
      setJamaah(res.data.data);
      setTotal(res.data.total_bayar)


    })
  }
  const BackPage = () => {
    navigation.goBack();
  }
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* HEADERS */}
      <MyHeader onPress={BackPage} judul='SaldoKu' />

      <View style={{
        flex: 1,
      }}>
        <FlatList data={jamaah} renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback>
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
                  <Text style={{ fontFamily: fonts.secondary[800], ontSize: MyDimensi / 3 }}>
                    {new Intl.NumberFormat().format(item.bayar)}
                  </Text>
                </View>


              </View>
            </TouchableWithoutFeedback>
          )
        }} />
      </View>
      <Text style={{
        fontFamily: fonts.secondary[800],
        fontSize: MyDimensi / 2.5,
        color: colors.white,
        textAlign: 'center'
      }}>{new Intl.NumberFormat().format(total)}</Text>
    </View>
  )
}