import { View, Text, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButtonSecond, MyCalendar, MyGap, MyHeader, MyPicker } from '../../components';
import { apiURL, getData } from '../../utils/localStorage';
import axios from 'axios';
import { MyDimensi, colors, fonts, windowHeight } from '../../utils';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import Modal from "react-native-modal";
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';

export default function Royalti({ navigation, route }) {
  const user = route.params;
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([
    {
      keterangan: '',
      tanggal: '',
      agen: '',
      jamaah: '',
      nominal: ''

    }
  ]);
  const [IDX, setIDX] = useState(0);
  const [open, setOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      __getJamaah();
    }
  }, [isFocus]);


  const __getJamaah = () => {
    getData('user').then(uu => {
      axios.post(apiURL + 'royalti', {
        fid_pengguna: uu.id_pengguna
      }).then(res => {
        console.log(res.data);
        if (res.data.length > 0) {

          setData(res.data);
          let byr = 0
          res.data.map(i => {
            byr += parseFloat(i.nominal);
          });
          setTotal(byr);
          setOpen(true);
        } else {
          showMessage({
            message: 'Data belum ada !'
          })
        }

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

      {open && <>
        <FlatList data={data} renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback onPress={() => {
              try {
                setIDX(index)
              } catch (error) {

              } finally {
                setModalVisible(!isModalVisible);
              }
            }}>
              <View style={{
                marginVertical: 1,
                borderRadius: 5,
                backgroundColor: colors.white,
                padding: 10,
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={{
                  flex: 1,
                }}>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: MyDimensi / 4 }}>
                    {item.agen} Mendaftarkan {item.jamaah}
                  </Text>

                  <View style={{
                    flexDirection: 'row'
                  }}>
                    <Text style={{ flex: 1, fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4 }}>
                      {moment(item.tanggal).format('DD/MM/yyyy')}
                    </Text>
                    <Text style={{ color: colors.primary, fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4 }}>
                      {new Intl.NumberFormat().format(item.nominal)}
                    </Text>
                  </View>



                </View>



              </View>
            </TouchableWithoutFeedback>
          )
        }} />
        <View style={{
          flexDirection: 'row',
          padding: 10,
        }}>
          <Text style={{
            flex: 1,
            fontFamily: fonts.secondary[600],
            fontSize: MyDimensi / 4,
            color: colors.white,
          }}>Total Royalti</Text>
          <Text style={{
            fontFamily: fonts.secondary[800],
            fontSize: MyDimensi / 3,
            color: colors.white,
          }}>{new Intl.NumberFormat().format(total)}</Text>
        </View>


        <Modal animationIn="fadeIn" animationOut="fadeOut" isVisible={isModalVisible} onBackButtonPress={() => {
          setModalVisible(false)
        }}>
          <View style={{
            flex: 1,
            justifyContent: 'center'
          }}>
            <View style={{
              backgroundColor: colors.white,
              height: windowHeight / 2,
              borderRadius: 10,
              overflow: 'hidden'
            }}>
              <View style={{
                backgroundColor: colors.primary,
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 10,
                alignItems: 'center'
              }}>
                <Text style={{
                  flex: 1,
                  fontFamily: fonts.secondary[800],
                  fontSize: MyDimensi / 4,
                  color: colors.white,
                }}>Informasi Royalti</Text>
                <TouchableWithoutFeedback onPress={() => {
                  setModalVisible(false)
                }}>
                  <View style={{
                    paddingHorizontal: 10,
                  }}>
                    <Icon type='ionicon' name='close' color={colors.white} size={MyDimensi / 2} />
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <View style={{
                padding: 20,
              }}>
                <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, marginBottom: 10, }}>
                  {moment(data[IDX].tanggal).format('dddd, DD MMMM YYYY')}
                </Text>
                <Text style={{ fontFamily: fonts.secondary[600], fontSize: MyDimensi / 4, marginBottom: 10, }}>
                  {data[IDX].keterangan}
                </Text>
                <Text style={{ color: colors.primary, fontFamily: fonts.secondary[800], fontSize: MyDimensi / 2 }}>
                  {new Intl.NumberFormat().format(data[IDX].nominal)}
                </Text>
              </View>

            </View>

          </View>
        </Modal >

      </>}
    </View >
  )
}