import { View, Text, FlatList, TouchableWithoutFeedback, Image, StyleSheet, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import { MyButton, MyGap, MyHeader, MyPicker } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import axios from 'axios'
import { MYAPP, apiURL, getData } from '../../utils/localStorage'
import { MyDimensi, colors, fonts } from '../../utils'
import moment from 'moment'
import SweetAlert from 'react-native-sweet-alert';
export default function PaketDaftar({ navigation, route }) {
    const item = route.params.item;
    const user = route.params.user;
    console.log(user)

    const [kirim, setKirim] = useState({
        fid_paket: item.id,
        input_by: user.id_pengguna,
        fid_jamaah: '',
        fid_tambahan: '',
        addon: 0,
        total: item.harga_paket,
    });

    const [jamaah, setJamaah] = useState([]);
    const [tambahan, setTambahan] = useState([]);

    useEffect(() => {

        __getJamaah();
        __getTambahan();

    }, []);

    const sendData = () => {
        console.log(kirim);
        Alert.alert(MYAPP, 'Apakah kamu yakin akan simpan ini ?', [
            { text: 'Cek kembali' },
            {
                text: 'Simpan',
                onPress: () => {
                    axios.post(apiURL + 'insert_daftar', kirim).then(res => {
                        if (res.data.status == 404) {
                            SweetAlert.showAlertWithOptions({
                                title: MYAPP,
                                subTitle: res.data.message,
                                style: 'error',
                                cancellable: true
                            });

                        } else {
                            SweetAlert.showAlertWithOptions({
                                title: MYAPP,
                                subTitle: res.data.message,
                                style: 'success',
                                cancellable: true
                            });

                        }
                    })
                }
            }
        ])
    }


    const __getJamaah = () => {
        axios.post(apiURL + 'jamaah', {
            input_by: user.id_pengguna
        }).then(res => {
            setJamaah(res.data);
            setKirim({
                ...kirim,
                fid_jamaah: res.data[0].value
            })

        })
    }

    const __getTambahan = () => {
        axios.post(apiURL + 'tambahan').then(res => {
            setTambahan(res.data);
            setKirim({
                ...kirim,
                fid_tambahan: res.data[0].value.split("#")[0],
                addon: res.data[0].value.split("#")[1],
            })
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.black
        }}>
            <MyHeader judul="Daftarkan jamaah" />
            <ScrollView showsVerticalScrollIndicato={false}>

                <View style={{
                    padding: 20,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 3,
                        color: colors.white
                    }}>{item.paket}</Text>

                    <MyGap jarak={20} />
                    <MyPicker label="Pilih Jamaah" onValueChange={x => {
                        setKirim({
                            ...kirim,
                            fid_jamaah: x
                        })
                    }} data={jamaah} />
                    <MyGap jarak={20} />
                    <MyPicker label="Pilih Tambahan / AddOn" data={tambahan} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            fid_tambahan: x.split("#")[0],
                            addon: parseFloat(x.split("#")[1]),
                            total: parseFloat(item.harga_paket) + parseFloat(x.split("#")[1])
                        });


                    }} />
                    <MyGap jarak={20} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Harga Paket</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[800],
                            fontSize: MyDimensi / 3,
                            color: colors.white,
                            textAlign: 'right'
                        }}>{new Intl.NumberFormat().format(item.harga_paket)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Tambahan / Addon</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: MyDimensi / 3,
                            color: colors.white,
                            textAlign: 'right'
                        }}>{kirim.addon > 0 ? '+' : ''} {new Intl.NumberFormat().format(kirim.addon)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Total Biaya</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[800],
                            fontSize: MyDimensi / 2,
                            color: colors.white,
                            textAlign: 'right'
                        }}>{new Intl.NumberFormat().format(kirim.total)}</Text>
                    </View>

                    <MyGap jarak={20} />
                    <MyButton title="Simpan Data" warna={colors.primary} onPress={sendData} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})