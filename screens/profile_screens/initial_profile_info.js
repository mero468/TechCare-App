import React, { useState, useContext, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable, ScrollView } from 'react-native'
import { Input, CheckBox, Button } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from './src/types'
import { colors } from '../../common/colors';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { domain } from '../../api_info';
import { showMessage, hideMessage } from "react-native-flash-message";

const InitialProfile = ({ navigation, route }) => {
    const { token } = route.params

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')

    const [withCountryNameButton, setWithCountryNameButton] = useState(false)
    const [country, setCountry] = useState('Jordan')
    const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(true)
    const [countryVisible, setCountryVisible] = useState(false)
    const [countryCode, setCountryCode] = useState('JO')
    const onSelect = (country) => {
        setCountry(country.name)
        setCountryCode(country.cca2)
        setRequestBody({ ...requestBody, 'country': country.name })
    }

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);

    const [requestBody, setRequestBody] = useState({})


    const setUserInfo = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${token}`);

        let formdata = new FormData();

        for (let key in requestBody)
            formdata.append(key, requestBody[key]);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${domain}/techCare/update-user/`, requestOptions)
            .then(() => {
                showMessage({
                    message: "updated successfully",
                    type: "success",
                    color: "#fff"
                });
            })
            .catch(error => console.log('error 2', error));
        setIsAuthenticated(true)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={setUserInfo}>
                    <MaterialIcon name='done' size={30} color={colors.main_color} type='MaterialIcons' />
                </Pressable>
            ),
        });
    }, [requestBody]);


    useEffect(() => {
    }, [])



    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior='height'>

                <View style={styles.inputSection}>
                    <Input
                        placeholder='e.x.  john'

                        onChangeText={e => {
                            setFirstName(e)
                            setRequestBody({ ...requestBody, 'first_name': e })
                        }}

                        containerStyle={{
                            width: '50%',
                        }}

                        label='first name'

                        labelStyle={{
                            color: colors.main_color,
                            fontSize: 16
                        }}

                        inputContainerStyle={{
                            borderColor: colors.main_color
                        }}

                        value={firstName}

                        inputStyle={{
                            fontSize: 16,
                        }}
                    />

                    <Input
                        placeholder='e.x.  snow'
                        onChangeText={e => {
                            setLastName(e)
                            setRequestBody({ ...requestBody, 'last_name': e })
                        }}

                        containerStyle={{
                            width: '50%',
                        }}

                        label='last name'

                        labelStyle={{
                            color: colors.main_color,
                            fontSize: 16
                        }}

                        inputContainerStyle={{
                            borderColor: colors.main_color
                        }}

                        value={lastName}


                        inputStyle={{
                            fontSize: 16
                        }}
                    />
                </View>

                <View style={styles.inputSection}>
                    <Input
                        placeholder='e.x.  07********'
                        onChangeText={e => {
                            setPhone(e)
                            setRequestBody({ ...requestBody, 'phone': e })
                        }}
                        containerStyle={{
                            width: '100%',
                        }}

                        label='phone'

                        labelStyle={{
                            color: colors.main_color,
                            fontSize: 16
                        }}

                        value={phone}

                        inputContainerStyle={{
                            borderColor: colors.main_color
                        }}


                        inputStyle={{
                            fontSize: 16,
                        }}

                        keyboardType='number-pad'
                    />
                </View>

                <View style={styles.inputSection}>
                    <Input
                        placeholder='e.x.  john@gmail.com'
                        onChangeText={e => {
                            setEmail(e)
                            setRequestBody({ ...requestBody, 'email': e })
                        }}
                        containerStyle={{
                            width: '100%',
                        }}

                        value={email}


                        inputContainerStyle={{
                            borderColor: colors.main_color
                        }}

                        label='email'

                        labelStyle={{
                            color: colors.main_color,
                            fontSize: 16
                        }}

                        inputStyle={{
                            fontSize: 16
                        }}
                    />
                </View>

                <View style={styles.inputSection}>
                    <Input
                        placeholder='e.x.  amman St. 33'
                        onChangeText={e => {
                            setAddress(e)
                            setRequestBody({ ...requestBody, 'address': e })
                        }}
                        containerStyle={{
                            width: '100%',
                        }}

                        value={address}

                        inputContainerStyle={{
                            borderColor: colors.main_color,
                            borderBottomWidth: 1,
                        }}

                        label='address'

                        labelStyle={{
                            color: colors.main_color,
                            fontSize: 16
                        }}

                        inputStyle={{
                            fontSize: 16
                        }}

                        multiline={true}
                    />
                </View>

                <View style={{
                    marginHorizontal: 10,
                    marginBottom: 10
                }}>
                    <Text style={{
                        color: colors.main_color,
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>country</Text>
                </View>
                <Pressable onPress={() => {
                    setCountryVisible(!countryVisible)
                }}
                    style={{
                        ...styles.inputSection, marginHorizontal: 10,
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        paddingBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.main_color,
                        justifyContent: 'space-evenly',
                        marginBottom: 30,
                    }}>
                    <CountryPicker
                        {...{
                            countryCode,
                            withFilter,
                            withFlag,
                            withCountryNameButton,
                            withAlphaFilter,
                            withEmoji,
                            onSelect,
                        }}
                        onClose={() => setCountryVisible(false)}
                        visible={countryVisible}
                    />
                    <View>{country && <Text style={{ fontSize: 16 }}>{country}</Text>}</View>
                </Pressable>


                <View style={{
                    marginHorizontal: 10,
                }}>
                    <Text style={{
                        color: colors.main_color,
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>birth date</Text>
                </View>
                <Pressable onPress={() => {
                    setOpen(true)
                }}
                    style={{
                        ...styles.inputSection, marginHorizontal: 10,
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        paddingBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.main_color,
                        justifyContent: 'space-between',
                        marginBottom: 30,
                        marginTop: 15,
                    }}>
                    <View>
                        <Text style={{ fontSize: 16 }}>{date.toISOString().slice(0, 10)}</Text>
                    </View>
                    <View>
                        <Icon name='date' size={22} color={colors.main_color} type='Fontisto' />
                    </View>
                </Pressable>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        setRequestBody({ ...requestBody, 'birth_date': date.toISOString().slice(0, 10) })
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                    mode='date'
                />

                <View style={{
                    marginHorizontal: 10,
                }}>
                    <Text style={{
                        color: colors.main_color,
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>gender</Text>
                </View>
                <View style={{ ...styles.inputSection, justifyContent: 'space-evenly', marginBottom: 30 }}>
                    <CheckBox
                        center
                        title="male"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={male}
                        onPress={() => {
                            setMale(!male)
                            setFemale(false)
                            setGender('male')
                            if (!male)
                                setRequestBody({ ...requestBody, 'gender': 'male' })
                        }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            borderWidth: 0,
                        }}
                        checkedColor={colors.main_color}
                    />
                    <CheckBox
                        center
                        title="female"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={female}
                        onPress={() => {
                            setFemale(!female)
                            setMale(false)
                            setGender('female')
                            if (!female)
                                setRequestBody({ ...requestBody, 'gender': 'female' })
                        }}
                        checkedColor={colors.main_color}
                        containerStyle={{
                            backgroundColor: '#fff',
                            borderWidth: 0,
                        }}
                    />
                </View>

            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default InitialProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 25,
    },
    inputSection: {
        flexDirection: 'row'
    }
})
