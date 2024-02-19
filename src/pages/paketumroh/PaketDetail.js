import { View, Text, FlatList, TouchableWithoutFeedback, Image, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { MyButton, MyGap, MyHeader } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import axios from 'axios'
import { apiURL, getData } from '../../utils/localStorage'
import { MyDimensi, colors, fonts } from '../../utils'
import moment from 'moment'

export default function PaketDetail({ navigation, route }) {

    const item = route.params;

    const [user, setUser] = useState({});

    useEffect(() => {
        getData('user').then(res => {
            setUser(res)
        })
    }, [])

    const Mylist = ({ label, value }) => {
        return (
            <View style={{
                marginVertical: 5,
                borderBottomWidth: 1,
                paddingVertical: 5,
                borderBottomColor: colors.border
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                }}>{label}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                }}>{value}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="Paket Detail" onPress={() => navigation.goBack()} />
            <ScrollView style={{

            }} showsVerticalScrollIndicator={false}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 3,
                    marginBottom: 10,
                }}>{item.paket}</Text>
                <Image source={{
                    uri: item.image
                }} style={{
                    width: '100%',
                    height: 300,
                    resizeMode: 'contain'
                }} />

                <View style={{
                    padding: 10,
                }}>


                    <Mylist label="Tanggal Keberangkatan" value={moment(item.tanggal_keberangkatan).format('dddd, DD MMMM YYYY')} />
                    <Mylist label="Durasi" value={item.hari + ' hari'} />
                    <Mylist label="Hotel Madinah" value={item.hotel_madinah} />
                    <Mylist label="Hotel Mekah" value={item.hotel_mekah} />
                    <Mylist label="Maskapai" value={item.maskapai} />
                    <Mylist label="Rute" value={item.rute} />
                    <Mylist label="Harga" value={new Intl.NumberFormat().format(item.harga_paket)} />
                    <Mylist label="Jumlah Seat" value={item.seat} />
                    <Mylist label="Seat Terisi" value={item.terisi} />
                    <Mylist label="Seat Tersedia" value={item.sisa} />
                    <MyGap jarak={10} />
                    {item.sisa > 0 &&
                        <MyButton title="Daftarkan Jamaah" onPress={() => navigation.navigate('PaketDaftar', {
                            item: item,
                            user: user
                        })} />
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})