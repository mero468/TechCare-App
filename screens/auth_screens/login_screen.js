import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native'
import CustomButton from '../../common/CutomButton';
import SpecialText from '../../common/SpecialText';
import { colors } from '../../common/colors';
import CustomTextInput from '../../common/CustomTextInput';
import PressableText from '../../common/PressableText';
import { Context } from '../../context/context';
import { domain } from '../../api_info';
import storage from '../../async storage/asyncStorge';
import { showMessage} from "react-native-flash-message";
import {useSelector,useDispatch} from 'react-redux';
import {setUser,setToken,setIsAuthenticated} from '../../statemanagement/actions/auth'


const Login_test = ({ navigation }) => {
    // const { setUser, setIsAuthenticated, setToken } = useContext(Context);
    const {user,token,authenticated} = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    const IsEmptyValidation = () => {
        if (username.length == 0 || password.length == 0) {
            showMessage({
                message: "you have to insert you username and password!",
                type: "danger",
                color: "#fff"
            });
            return false;
        }
        return true;
    }

    const inputValidation = (response = 1) => {

        if (response == -1) {
            setIsCorrect(false)
            showMessage({
                message: "your username or password is wrong!",
                type: "danger",
                color: "#fff"
            });
            return false;
        } else{

            setIsCorrect(true)
            return true;
        }
    }

    const loginUser = async () => {
        if (IsEmptyValidation()) {
            let formdata = new FormData();
            formdata.append("username", username);
            formdata.append("password", password);
            let requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            await fetch(`${domain}/techCare/login-user/`, requestOptions)
                .then(response => response.json())
                .then((res) => {
                    let complete = inputValidation(res.res)
                    if (complete) {
                        const { user_id, user_info, is_patient, token } = res;

                    }
                    return { ...res, 'is_correct': complete };
                })
                .then(result => {
                    const { token, user_id, user_info, is_patient, is_correct } = result;
                    dispatch(setUser(result));
                    console.log(result);
                    dispatch(setUser(result));
                    console.log(result.token);
                    dispatch(setToken(result.token));
                    try {
                        storage.save({
                            key: 'user', // Note: Do not use underscore("_") in key!
                            data: {
                                token: token,
                                userid: user_id,
                                username: user_info,
                                is_patient: is_patient
                            },
                            expires: null
                        });
                        if (is_correct)
                            dispatch(setIsAuthenticated(true));
                    } catch (e) {
                        console.log('error: save user info using async storge', e)
                    }
                    return is_correct;
                }).then((correct) => { if (correct) {
                    navigation.navigate('Main');
                 }
                    
                })
                .catch(error => console.log('error', error));
        }
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.container}>
                    <View >
                        <Image source={require('../../assets/images/splash_img.png')} style={{ height: 320, width: 250 }} />
                    </View>
                    <View style={[styles.inputContainer, styles.btnContainer]}>
                        <CustomTextInput placeholder='Email' type='email-address' char={username} style={{ marginVertical: 5 }} setValue={setUsername} />
                        <CustomTextInput placeholder='Password' style={{ marginVertical: 5 }} char={password} is_password={true} setValue={setPassword} />
                        <View style={styles.pressableTextContainer}>
                            <PressableText text='Forgot Password?' size={13} />
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <CustomButton text='Login' size='lg' backgroundColor={colors.main_color} style={{ marginVertical: 5 }} action={() => {
                            loginUser();
                        }} />
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <Text>Dont't have an account?</Text>
                        <PressableText text=' Sign Up' size={14} action={() => navigation.navigate('signup')} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Login_test

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
    }
})
