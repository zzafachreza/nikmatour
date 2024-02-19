import { View, Text, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButtonSecond, MyCalendar, MyGap, MyHeader, MyPicker } from '../../components';
import { apiURL, getData } from '../../utils/localStorage';
import axios from 'axios';
import { MyDimensi, colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';
import moment from 'moment';


export default function Royalti({ navigation, route }) {
  const user = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    __getJamaah();
  }, []);


  const __getJamaah = () => {
    getData('user').then(uu => {
      axios.post(apiURL + 'royalti', {
        fid_pengguna: uu.id_pengguna
      }).then(res => {
        console.log(res.data)
        setData(res.data);


      })
    })
  }
  const BackPage = () => {
    navigation.goBack();
  }
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* HEADERS */}
      <MyHeader onPress={BackPage} judul='Royalti Saya' />

      <FlatList data={data} renderItem={({ item, index }) => {
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
                  Tanggal
                </Text>
                <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                  {moment(item.tanggal).format('dddd DD MMMM YYYY')}
                </Text>
                <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4 }}>
                  Keterangan
                </Text>
                <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                  {item.keterangan}
                </Text>
                <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4 }}>
                  Nominal
                </Text>
                <Text style={{ color: colors.primary, fontFamily: fonts.secondary[800], fontSize: MyDimensi / 2 }}>
                  {new Intl.NumberFormat().format(item.nominal)}
                </Text>



              </View>
              <View>
                <Icon type='ionicon' name='shield-checkmark-outline' size={MyDimensi / 2} color={colors.primary} />
              </View>


            </View>
          </TouchableWithoutFeedback>
        )
      }} />
    </View>
  )
}