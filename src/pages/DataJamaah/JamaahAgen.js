import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts, windowWidth } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker, MyCalendar } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';
import SweetAlert from 'react-native-sweet-alert';
import { color } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
export default function JamaahAgen({ navigation, route }) {




    const [loading, setLoading] = useState(false);
    const [sama, setSama] = useState(true)
    const [data, setData] = useState({
        api_token: api_token,
        ref_pengguna: route.params.input_by,
        username: '',
        nama_lengkap: route.params.nama_jamaah,
        telepon: route.params.telepon_jamaah,
        alamat: route.params.alamat_jamaah,
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        bank: '',
        rekening: '',
        foto_ktpagen: 'https://zavalabs.com/nogambar.jpg',
        password: '',
        repassword: '',


    });

    const simpan = () => {


        console.log(data);
        if (
            data.nama_lengkap.length === 0 &&
            data.username.length === 0 &&
            data.telepon.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Formulir pendaftaran tidak boleh kosong !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Masukan nama lengkap ibu',
            });
        }

        else if (data.telepon.length === 0) {
            showMessage({
                message: 'Masukan nomor telepon',
            });
        }
        else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else if (data.repassword.length === 0) {
            showMessage({
                message: 'Ulangi kata sandi kamu',
            });
        } else {

            console.log(data)

            setLoading(true);
            axios
                .post(apiURL + 'register_jamaah', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'error',
                            cancellable: true
                        },
                            callback => navigation.goBack());

                    } else {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'success',
                            cancellable: true
                        },
                            callback => navigation.goBack());

                    }


                });
        }
    };



    return (

        <ScrollView
            style={{
                flex: 1,
                backgroundColor: colors.white,

                position: 'relative',


            }}>

            <View style={{ flex: 1, }}>
                <ImageBackground source={require('../../assets/bgimglogin.png')} style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={require('../../assets/nikmatour.png')} style={{
                        marginTop: 10,
                        width: windowWidth / 1.9,
                        height: windowWidth / 1.9,
                        resizeMode: 'contain'
                    }} />
                </ImageBackground>
            </View>

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>




                <View style={{
                    paddingHorizontal: 0,
                }}>
                    <Text style={{
                        fontSize: MyDimensi / 2.5,
                        fontFamily: fonts.primary[600],
                        color: colors.black,
                        textAlign: 'center'
                    }}>REGISTER</Text>
                    <Text style={{
                        fontSize: MyDimensi / 4,
                        fontFamily: fonts.primary[400],
                        color: colors.primary,
                        marginBottom: 10,
                    }}>Silahkan daftar agar bisa login</Text>

                    {/* NAMA LENGKAP */}
                    <MyInput value={data.nama_lengkap} label='Nama Lengkap' onChangeText={x => setData({
                        ...data,
                        nama_lengkap: x
                    })} iconname='person' placeholder='Nama Lengkap' />
                    <MyGap jarak={20} />

                    {/* USERNAME */}
                    <MyInput value={data.username} label='Username' onChangeText={x => setData({
                        ...data,
                        username: x
                    })} iconname='person' placeholder='Username' />
                    <MyGap jarak={20} />

                    {/* NOMOR TELEPON */}
                    <MyInput value={data.telepon} label='Nomor Telepon' keyboardType='phone-pad' onChangeText={x => setData({
                        ...data,
                        telepon: x
                    })} iconname='call' placeholder='Nomor Telepon' />
                    <MyGap jarak={20} />


                    {/* ALAMAT */}
                    <MyInput value={data.alamat} label='Alamat' onChangeText={x => setData({
                        ...data,
                        alamat: x
                    })} iconname='home' placeholder='Alamat Lengkap' />
                    <MyGap jarak={20} />


                    {/* TANGGAL LAHIR */}
                    <MyCalendar label='Tanggal Lahir' onDateChange={x => {
                        setData({
                            ...data,
                            tanggal_lahir: x
                        })
                    }} placeholder='Tanggal Lahir' value={data.tanggal_lahir} iconname='calendar' />

                    <MyGap jarak={20} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 4,
                        color: colors.white,
                        marginBottom: 10,
                    }}>Upload Foto KTP</Text>
                    <TouchableWithoutFeedback onPress={() => {
                        launchImageLibrary({
                            includeBase64: true,
                            quality: 1,
                            mediaType: "photo",
                            maxWidth: 500,
                            maxHeight: 500
                        }, response => {
                            // console.log('All Response = ', response);

                            setData({
                                ...data,
                                foto_ktpagen: `data:${response.type};base64, ${response.base64}`,
                            });
                        });
                    }}>
                        <View style={{
                            backgroundColor: colors.white,
                            borderRadius: 10,
                            overflow: 'hidden'
                        }}>
                            <Image style={{
                                width: '100%',
                                height: 200,
                                resizeMode: 'contain'
                            }} source={{
                                uri: data.foto_ktpagen
                            }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <MyGap jarak={20} />
                    {/* NOMOR TELEPON */}
                    <MyInput label='Nama Bank' onChangeText={x => setData({
                        ...data,
                        bank: x
                    })} iconname='home' placeholder='Nama Bank' />
                    <MyGap jarak={20} />

                    {/* NOMOR TELEPON */}
                    <MyInput label='Nomor Rekening' keyboardType='phone-pad' onChangeText={x => setData({
                        ...data,
                        rekening: x
                    })} iconname='card' placeholder='Nomor Rekening' />

                    <MyGap jarak={20} />

                    {/*INPUT KATA SANDI */}
                    <MyInput
                        placeholder="Kata Sandi..."
                        label="Kata Sandi"
                        iconname="lock-closed"
                        value={data.password}
                        secureTextEntry={true}
                        onChangeText={value =>
                            setData({
                                ...data,
                                password: value,
                            })
                        }
                    />


                    {/* INPUT KATA SANDI ULANG */}
                    <MyGap jarak={20} />
                    <MyInput
                        borderColor={sama ? colors.primary : colors.danger}
                        borderWidth={sama ? 1 : 1}
                        placeholder="Masukan ulang kata sandi"
                        label="Masukan ulang kata sandi"
                        iconname="lock-closed"
                        secureTextEntry
                        value={data.repassword}
                        onChangeText={value => {

                            if (value !== data.password) {
                                setSama(false)
                            } else {
                                setSama(true)
                            }

                            setData({
                                ...data,
                                repassword: value,
                            })
                        }

                        }
                    />
                </View>
                <MyGap jarak={20} />




                {!loading &&
                    <>
                        <MyButton


                            title="Daftar"
                            Icons="log-in"
                            onPress={simpan}
                        />

                    </>
                }

                <MyGap jarak={10} />
                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.secondary} size="large" />
                </View>}
            </ScrollView>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
        position: 'relative',
        backgroundColor: colors.primary,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,

    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
