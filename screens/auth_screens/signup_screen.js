import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native'
import CustomButton from '../../common/CutomButton';
import SpecialText from '../../common/SpecialText';
import { colors } from '../../common/colors';
import CustomTextInput from '../../common/CustomTextInput';
import PressableText from '../../common/PressableText';
import { Input, Icon } from 'react-native-elements';
import { domain } from '../../api_info';
import storage, { getDataFromAsyncStorage } from '../../async storage/asyncStorge';
import { Context } from '../../context/context';
import { showMessage, hideMessage } from "react-native-flash-message";



const Signup_screen = ({ navigation }) => {
    const { setUser, setIsAuthenticated, setToken } = useContext(Context);

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [isValid, setIsValid] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    const IsEmptyValidation = () => {
        if (username.length == 0 || password.length == 0 || name.length == 0) {
            setIsValid(false);
            showMessage({
                message: "you have to insert your information!",
                type: "danger",
                color: "#fff"
            });
            return false;
        } else
            setIsValid(true)
        return true;
    }


    const signupUser = async () => {
        IsEmptyValidation();
        if (isValid) {

            let formdata = new FormData();
            formdata.append("username", username);
            formdata.append("password", password);


            let requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            await fetch(`${domain}/techCare/register-user/`, requestOptions)
                .then(res => res.json())
                .then((res) => {
                    const { public_id, public_token } = res;
                    setUser({
                        username: name,
                        user_id: public_id,
                        is_patient: false
                    })
                    setToken(public_token)
                    return res;
                })
                .then(result => {
                    const { public_id, public_token } = result;
                    try {
                        storage.save({
                            key: 'user',
                            data: {
                                token: public_token,
                                userid: public_id,
                                username: name,
                                is_patient: false,
                            },
                            expires: null
                        });
                    } catch (e) {
                        console.log('error: save user info using async storge', e)
                    }
                    return public_token
                })
                .then((token) => {

                    storage.load({
                        key: 'user',
                    }).then(res => {
                        console.log(res.token)
                    })
                        .catch((err) => console.log('err from getdata', err))
                    navigation.navigate('initial-profile', {
                        'token': token
                    })
                }
                )
                .catch(err => console.log(err))
        }
    }


    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior='position'>
                <SafeAreaView style={styles.container}>
                    <SpecialText text='Hello Beautiful' size={22} weight='bold' color={colors.main_color} />
                    <SpecialText text='Sign Up' size={38} weight='bold' color={colors.main_color} />
                    <View style={{ marginVertical: 20 }}>
                        <Image source={require('../../assets/images/splash_img.png')} style={{ height: 280, width: 250 }} />
                    </View>

                    <View style={[styles.inputContainer, styles.btnContainer]}>
                        <CustomTextInput
                            placeholder='Full Name'
                            style={{ marginVertical: 5 }}
                            setValue={setName}
                        />
                        <CustomTextInput placeholder='Email' type='email-address' style={{ marginVertical: 5 }} setValue={setUsername} />
                        <CustomTextInput placeholder='Password' style={{ marginVertical: 5 }} is_password={true} setValue={setPassword} />
                        <View style={styles.pressableTextContainer}>
                            <PressableText text='Forgot Password?' size={13} />
                        </View>
                    </View>

                    <View style={styles.btnContainer}>
                        <CustomButton text='Sign Up' size='lg' backgroundColor={colors.main_color} style={{ marginVertical: 5 }} action={signupUser} />
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <Text>Dont't have an account?</Text>
                        <PressableText text=' Login' size={14} action={() => navigation.navigate('login')} />
                    </View>

                </SafeAreaView>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Signup_screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 25,
    },
    btnContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    inputContainer: {
        marginBottom: 15,
    },
    pressableTextContainer: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
})
