import { View, Text, TouchableWithoutFeedback, Image, ActivityIndicator, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyButtonSecond, MyGap, MyHeader, MyInput, MyInputSecond, MyPicker } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import MyCarouser from '../../components/MyCarouser'
import axios from 'axios'
import { MYAPP, apiURL } from '../../utils/localStorage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MyDimensi, colors, fonts } from '../../utils'
import SweetAlert from 'react-native-sweet-alert';
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'

export default function BayarDetail({ navigation, route }) {
    const item = route.params;

    const [data, setData] = useState([]);


    useEffect(() => {
        __getBayar();
    }, []);


    const __getBayar = () => {
        axios.post(apiURL + 'bayar', {
            fid_daftar: item.id,
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.black
        }}>
            <MyHeader judul="Detail Pembayaran" />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    marginVertical: 5,
                    borderRadius: 10,
                    backgroundColor: colors.white,
                    padding: 10,
                    marginHorizontal: 20,
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
                        Paket
                    </Text>
                    <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                        {item.paket}
                    </Text>

                </View>

                <View style={{
                    marginVertical: 5,
                    borderRadius: 10,
                    backgroundColor: colors.white,
                    padding: 10,
                    marginHorizontal: 20,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Harga Paket
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                            {new Intl.NumberFormat().format(item.harga_paket)}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Tambahan/addon{'\n'}
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: MyDimensi / 5
                            }}>{item.deskripsi}</Text>
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[400], ontSize: MyDimensi / 4 }}>
                            {item.addon > 0 ? '+' : ''} {new Intl.NumberFormat().format(item.addon)}
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Total Biaya
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 2.5 }}>
                            {new Intl.NumberFormat().format(item.total)}
                        </Text>
                    </View>
                    <MyGap jarak={10} />
                    <MyButton warna={colors.primary} title="Update Pembayaran" onPress={() => navigation.navigate('BayarAdd', item)} />


                </View>

                <View style={{
                    marginTop: 10,
                    borderRadius: 10,
                    padding: 10,
                    flex: 1,
                    backgroundColor: colors.white,
                    marginHorizontal: 20,
                }}>
                    <FlatList data={data} renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                marginVertical: 5,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[800],
                                    }}>Tanggal Bayar</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                    }}>{moment(item.tanggal_bayar).format('DD MMMM YYYY')}</Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontFamily: fonts.secondary[800],
                                    }}>{new Intl.NumberFormat().format(item.nominal)}</Text>
                                </View>

                            </View>
                        )
                    }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})