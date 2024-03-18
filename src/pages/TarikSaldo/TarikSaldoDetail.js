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

export default function TarikSaldoDetail({ navigation, route }) {
    const user = route.params;

    const MyBack = () => {
        navigation.goBack();
    }

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [cair, setCair] = useState(0);
    const [hold, setHold] = useState(0);
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            __getDaftar();
        }
    }, [isFocus]);

    const __getDaftar = () => {
        axios.post(apiURL + 'tarik', {
            fid_pengguna: user.id_pengguna
        }).then(res => {
            console.log(res.data);
            setData(res.data)
            let byr = 0
            let hold = 0;
            let cair = 0;
            res.data.map(i => {
                byr += i.jumlah !== null ? parseFloat(i.jumlah) : 0;
                hold += i.jumlah !== null && i.status_tarik == 'Dalam Proses' ? parseFloat(i.jumlah) : 0;
                cair += i.jumlah !== null && i.status_tarik !== 'Dalam Proses' ? parseFloat(i.jumlah) : 0;
            });
            setTotal(byr);
            setCair(cair);
            setHold(hold);
            setData(res.data);
        })
    }
    var totalBayar = 0;
    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            {/* HEADERS */}
            <MyHeader onPress={MyBack} judul='Riwayat Tarik Saldo' />

            {/* MAIN */}
            <ScrollView style={{ padding: 20, }}>
                {/* TANGGAL KEBERANGKATAN */}

                <MyGap jarak={20} />
                <FlatList data={data} renderItem={({ item, index }) => {


                    return (
                        <TouchableWithoutFeedback>
                            <View style={{
                                marginVertical: 2,
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
                                    }}>Tanggal Tarik</Text>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: MyDimensi / 4
                                    }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
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
                                    }}>Status</Text>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: MyDimensi / 4,
                                        color: item.status_tarik == 'Dalam Proses' ? colors.warning : colors.success,
                                    }}>{item.status_tarik}</Text>
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
                                    }}>Tanggal Transfer</Text>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: MyDimensi / 4
                                    }}>{item.tanggal_transfer == '0000-00-00' ? '-' : moment(item.tanggal_transfer).format('DD MMMM YYYY')}</Text>
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
                                    }}>{new Intl.NumberFormat().format(item.jumlah)}</Text>
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
                }}>Total Tarik Saldo</Text>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 3,
                    color: colors.white,
                }}>{new Intl.NumberFormat().format(total)}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                padding: 10,
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    color: colors.white,
                }}>Total Dalam Proses</Text>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 3,
                    color: colors.white,
                }}>{new Intl.NumberFormat().format(hold)}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                padding: 10,
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    color: colors.white,
                }}>Total Sudah Ditransfer</Text>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 3,
                    color: colors.white,
                }}>{new Intl.NumberFormat().format(cair)}</Text>
            </View>
        </View >
    )
}