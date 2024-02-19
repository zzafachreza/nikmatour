import { View, Text, FlatList, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { MyCalendar, MyGap, MyHeader } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'
import { MyDimensi, colors, fonts } from '../../utils'
import moment from 'moment'

export default function Pembayaran({ navigation, route }) {
  const user = route.params;

  const MyBack = () => {
    navigation.goBack();
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    __getDaftar();
  }, []);

  const __getDaftar = () => {
    axios.post(apiURL + 'daftar', {
      input_by: user.id_pengguna
    }).then(res => {
      console.log(res.data);
      setData(res.data);
    })
  }
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* HEADERS */}
      <MyHeader onPress={MyBack} judul='Pembayaran' />

      {/* MAIN */}
      <ScrollView style={{ padding: 20, }}>
        {/* TANGGAL KEBERANGKATAN */}
        <MyCalendar label="Tanggal Keberangkatan :" />

        <MyGap jarak={20} />
        <FlatList data={data} renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('BayarDetail', item)}>
              <View style={{
                marginVertical: 10,
                backgroundColor: colors.white,
                padding: 10,
              }}>
                <View style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Nomor KTP</Text>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>{item.nomor_ktp}</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Nama Jamaah</Text>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>{item.nama_jamaah}</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Telepon Jamaah</Text>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>{item.telepon_jamaah}</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Keberangkatan</Text>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>{moment(item.tanggal_keberangkatan).format('DD MMMM YYYY')}</Text>
                </View>
                <View style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    color: colors.primary,
                    fontSize: MyDimensi / 4
                  }}>{item.paket}</Text>
                </View>

                <View style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Total Biaya</Text>
                  <Text style={{
                    flex: 1,
                    textAlign: 'right',
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 3
                  }}>{new Intl.NumberFormat().format(item.total)}</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Sudah Bayar</Text>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[400],
                    fontSize: MyDimensi / 3
                  }}>{new Intl.NumberFormat().format(item.bayar)}</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Kurang Bayar</Text>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    textAlign: 'right',
                    fontSize: MyDimensi / 3
                  }}>{new Intl.NumberFormat().format(item.total - item.bayar)}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
        }} />
        <MyGap jarak={20} />
      </ScrollView>
    </View >
  )
}