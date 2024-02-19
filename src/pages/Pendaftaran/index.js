import { View, Text, TouchableWithoutFeedback, Image, ActivityIndicator } from 'react-native'
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
export default function Pendaftaran({ navigation, route }) {
    const MyBack = () => {
        navigation.goBack();
    }
    const [kirim, setKirim] = useState({
        input_by: route.params.id,
        fid_pengguna: '',
        nama_jamaah: '',
        alamat_jamaah: '',
        telepon_jamaah: '',
        nomor_ktp: '',
        foto_ktp: 'https://zavalabs.com/nogambar.jpg',
        nomor_paspor: '',
        foto_paspor: 'https://zavalabs.com/nogambar.jpg',
        foto_kk: 'https://zavalabs.com/nogambar.jpg',
        foto_tambahan: 'https://zavalabs.com/nogambar.jpg',
    })
    const [pengguna, setPengguna] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        __getPengguna();
    }, []);

    const __sendServer = () => {
        console.log(kirim);
        // setLoading(true);
        if (kirim.nama_jamaah.length == 0) {
            showMessage({ message: 'Nama wajib di isi !' })
        } else if (kirim.telepon_jamaah.length == 0) {
            showMessage({ message: 'Telepon wajib di isi !' })
        } else if (kirim.nomor_ktp.length == 0) {
            showMessage({ message: 'nomor ktp wajib di isi !' })
        } else {
            setLoading(true);
            axios
                .post(apiURL + 'insert_jamaah', kirim)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
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
                        },
                            callback => navigation.goBack());

                    }


                });
        }


    }

    const [open, setOpen] = useState(false);
    const __getPengguna = () => {
        axios.post(apiURL + 'pengguna').then(res => {
            console.log(res.data);
            setPengguna(res.data);
            setKirim({
                ...kirim,
                fid_pengguna: res.data[0].value,
            });
            setOpen(true);
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            {/* HEADERS */}
            <MyHeader onPress={MyBack} judul='Pendaftaran' />

            {/* MAIN */}
            {open && <ScrollView style={{ padding: 20, }}>
                {/* REFERENSI */}
                <MyPicker onValueChange={x => setKirim({ ...kirim, fid_pengguna: x })} label="Referensi :" data={pengguna} />

                <MyGap jarak={10} />

                {/* NAMA LENGKAP */}
                <MyInputSecond onChangeText={x => setKirim({ ...kirim, nama_jamaah: x })} label="Nama Lengkap" placeholder="Nama Lengkap" />

                <MyGap jarak={10} />

                {/* NAMA LENGKAP */}
                <MyInputSecond label="Alamat" onChangeText={x => setKirim({ ...kirim, alamat_jamaah: x })} placeholder="Alamat Lengkap" />
                <MyGap jarak={10} />
                {/* NAMA LENGKAP */}
                <MyInputSecond keyboardType='phone-pad' label="Telepon" placeholder="Nomor telepon" onChangeText={x => setKirim({ ...kirim, telepon_jamaah: x })} />

                <MyGap jarak={10} />
                <MyInputSecond label="Nomor KTP" keyboardType='number-pad' maxLength={16} placeholder="Nomor KTP" onChangeText={x => setKirim({ ...kirim, nomor_ktp: x })} />
                <MyGap jarak={10} />
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
                        maxWidth: 200,
                        maxHeight: 200
                    }, response => {
                        // console.log('All Response = ', response);

                        setKirim({
                            ...kirim,
                            foto_ktp: `data:${response.type};base64, ${response.base64}`,
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
                            uri: kirim.foto_ktp
                        }} />
                    </View>
                </TouchableWithoutFeedback>

                <MyGap jarak={10} />
                {/* NAMA LENGKAP */}
                <MyInputSecond onChangeText={x => setKirim({ ...kirim, nomor_paspor: x })} label="Nomor Paspor" placeholder="Nomor Paspor" />
                <MyGap jarak={10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    color: colors.white,
                    marginBottom: 10,
                }}>Upload Foto Paspor</Text>
                <TouchableWithoutFeedback onPress={() => {
                    launchImageLibrary({
                        includeBase64: true,
                        quality: 1,
                        mediaType: "photo",
                        maxWidth: 200,
                        maxHeight: 200
                    }, response => {
                        // console.log('All Response = ', response);

                        setKirim({
                            ...kirim,
                            foto_paspor: `data:${response.type};base64, ${response.base64}`,
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
                            uri: kirim.foto_paspor
                        }} />
                    </View>
                </TouchableWithoutFeedback>
                <MyGap jarak={10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    color: colors.white,
                    marginBottom: 10,
                }}>Upload Foto Kartu Keluarga</Text>
                <TouchableWithoutFeedback onPress={() => {
                    launchImageLibrary({
                        includeBase64: true,
                        quality: 1,
                        mediaType: "photo",
                        maxWidth: 200,
                        maxHeight: 200
                    }, response => {
                        // console.log('All Response = ', response);

                        setKirim({
                            ...kirim,
                            foto_kk: `data:${response.type};base64, ${response.base64}`,
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
                            uri: kirim.foto_kk
                        }} />
                    </View>
                </TouchableWithoutFeedback>
                <MyGap jarak={10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    color: colors.white,
                    marginBottom: 10,
                }}>Upload Foto Buku Nikah / Ijazah / Akta lahir</Text>
                <TouchableWithoutFeedback onPress={() => {
                    launchImageLibrary({
                        includeBase64: true,
                        quality: 1,
                        mediaType: "photo",
                        maxWidth: 200,
                        maxHeight: 200
                    }, response => {
                        // console.log('All Response = ', response);

                        setKirim({
                            ...kirim,
                            foto_tambahan: `data:${response.type};base64, ${response.base64}`,
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
                            uri: kirim.foto_tambahan
                        }} />
                    </View>
                </TouchableWithoutFeedback>

                <MyGap jarak={20} />

                {!loading && <MyButtonSecond title="Daftar" onPress={__sendServer} />}

                {loading && <ActivityIndicator size="large" color={colors.primary} />}

                <MyGap jarak={30} />

            </ScrollView>}



        </View>
    )
}