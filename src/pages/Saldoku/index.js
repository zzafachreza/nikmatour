import { View, Text, FlatList, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { MyCalendar, MyGap, MyHeader } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'
import { MyDimensi, colors, fonts } from '../../utils'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'

export default function Saldoku({ navigation, route }) {
  const user = route.params;

  const MyBack = () => {
    navigation.goBack();
  }

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      __getDaftar();
    }
  }, [isFocus]);

  const __getDaftar = () => {
    axios.post(apiURL + 'daftar', {
      input_by: user.id_pengguna,
    }).then(res => {
      console.log(res.data);
      let byr = 0
      res.data.map(i => {
        byr += i.fee !== null ? parseFloat(i.fee) : 0;
      });
      setTotal(byr);
      setData(res.data);
    })
  }
  var totalBayar = 0;
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* HEADERS */}
      <MyHeader onPress={MyBack} judul='Saldoku' />

      {/* MAIN */}
      <ScrollView style={{ padding: 20, }}>
        {/* TANGGAL KEBERANGKATAN */}

        <MyGap jarak={20} />
        <FlatList data={data} renderItem={({ item, index }) => {


          return (
            <TouchableWithoutFeedback>
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
                  }}>Total Fee</Text>
                  <Text style={{
                    flex: 1,
                    textAlign: 'right',
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 3
                  }}>{new Intl.NumberFormat().format(item.fee)}</Text>
                </View>

              </View>
            </TouchableWithoutFeedback>
          )
        }} />
        <MyGap jarak={20} />
      </ScrollView>
      <View style={{
        flexDirection: 'row',
        padding: 10,
      }}>
        <Text style={{
          flex: 1,
          fontFamily: fonts.secondary[600],
          fontSize: MyDimensi / 4,
          color: colors.white,
        }}>Total Fee</Text>
        <Text style={{
          fontFamily: fonts.secondary[800],
          fontSize: MyDimensi / 3,
          color: colors.white,
        }}>{new Intl.NumberFormat().format(total)}</Text>
      </View>
    </View >
  )
}