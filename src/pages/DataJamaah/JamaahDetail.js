import { View, Text, TouchableWithoutFeedback, Image, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native'
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
import { ListItem } from 'react-native-elements'
export default function JamaahDetail({ navigation, route }) {
    const item = route.params;

    const MYlist = ({ label, value }) => {
        return (
            <View style={{
                marginVertical: 1,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginHorizontal: 20,
                backgroundColor: colors.white,
            }}>
                <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4 }}>
                    {label}
                </Text>
                <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.black
        }}>
            <MyHeader judul="Detail Jamaah" onPress={() => navigation.goBack()} />
            <ScrollView>


                <MYlist label="Nama Jamaah" value={item.nama_jamaah} />
                <MYlist label="Alamat Jamaah" value={item.alamat_jamaah} />
                <MYlist label="Nomor KTP" value={item.nomor_ktp} />
                <View style={{
                    marginVertical: 10,
                    backgroundColor: colors.white,
                    marginHorizontal: 20,
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 4,
                    }}>Foto KTP</Text>
                    <Image source={{
                        uri: item.foto_ktp
                    }} style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'contain'
                    }} />
                </View>
                <MYlist label="Nomor Paspor" value={item.nomor_paspor} />
                <View style={{
                    marginVertical: 10,
                    backgroundColor: colors.white,
                    marginHorizontal: 20,
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 4,
                    }}>Foto Paspor</Text>
                    <Image source={{
                        uri: item.foto_paspor
                    }} style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'contain'
                    }} />
                </View>
                <View style={{
                    marginVertical: 10,
                    backgroundColor: colors.white,
                    marginHorizontal: 20,
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 4,
                    }}>Foto Kartu Keluarga</Text>
                    <Image source={{
                        uri: item.foto_kk
                    }} style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'contain'
                    }} />
                </View>

                <View style={{
                    marginVertical: 10,
                    backgroundColor: colors.white,
                    marginHorizontal: 20,
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 4,
                    }}>Foto Buku Nikah / Ijazah / Akta Kelahiran</Text>
                    <Image source={{
                        uri: item.foto_tambahan
                    }} style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'contain'
                    }} />
                </View>

                <View style={{
                    marginVertical: 10,
                    backgroundColor: colors.white,
                    marginHorizontal: 20,
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 4,
                    }}>Pas Foto Latar Belakang Putih</Text>
                    <Image source={{
                        uri: item.foto_wajah
                    }} style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'contain'
                    }} />
                </View>

                <View style={{
                    marginVertical: 10,
                    backgroundColor: colors.white,
                    marginHorizontal: 20,
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 4,
                    }}>Foto Keterangan</Text>
                    <Image source={{
                        uri: item.foto_keterangan
                    }} style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'contain'
                    }} />
                </View>

                <View style={{
                    padding: 20,
                }}>
                    <MyButton onPress={() => navigation.navigate('JamaahAgen', item)} warna={colors.primary} title="Jadikan Jamaah Agen" />
                    <MyGap jarak={20} />
                    <MyButton onPress={() => navigation.navigate('JamaahEdit', item)} colorText={colors.primary} warna={colors.white} title="Edit Data Jamaah" />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})