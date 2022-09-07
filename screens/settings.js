import React, { useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import { colors } from '../common/colors';
import SpecialText from '../common/SpecialText';
import SettingItem from '../components/SettingItem';
import CircleImage from '../common/CircleImage';
import OverImageButton from '../components/OverImageButton';
import storage from '../async storage/asyncStorge';
import { Context } from '../context/context';
import {useSelector,useDispatch} from 'react-redux';
import {setUser,setToken,setIsAuthenticated} from '../statemanagement/actions/auth'




const Settings = ({ navigation }) => {
    const {user,token,authenticated} = useSelector(state => state.loginReducer);
    console.log('user from settings ', user)
    const dispatch = useDispatch();

    let l = user.user_info ? user.user_info[0].toUpperCase() : '';

    const logout = () => {
        try {
            storage.remove({
                key: 'user'
            })
        } catch (error) {
            console.log('from logout', error)
        }

        dispatch(setUser(''));
        dispatch(setToken(''));
        dispatch(setIsAuthenticated(false));
        navigation.navigate('Auth')
    }

    return (
        <SafeAreaView style={styles.container}>
            <SpecialText text='Settings' size={25} color={colors.main_color} weight='bold' style={{ marginBottom: 15 }} />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                    <View style={{ position: 'relative' }}>
                        <CircleImage width={120} height={120} letter={l}  letter_size={45} />
                        {/* <OverImageButton /> */}
                    </View>
                    <SpecialText text={user.username} size={25} color={colors.main_color} />
                </View>
                <View style={{ width: '95%' }}>
                    <SettingItem
                        icon={{
                            name: 'person',
                            size: 28,
                            type: 'Ionicons',
                            color: colors.secondary_color
                        }}
                        label={{
                            text: 'My Profile',
                            size: 20,
                            color: colors.main_color,
                            weight: 'normal',
                        }}
                        action={() => navigation.navigate('profile')}
                    />
                    <SettingItem
                        icon={{
                            name: 'notifications',
                            size: 28,
                            type: 'Ionicons',
                            color: colors.secondary_color
                        }}
                        label={{
                            text: 'Notification',
                            size: 20,
                            color: colors.main_color,
                            weight: 'normal',
                        }}
                    />
                    <SettingItem
                        icon={{
                            name: 'remove-red-eye',
                            size: 28,
                            type: 'MaterialIcons',
                            color: colors.secondary_color
                        }}
                        label={{
                            text: 'Appearance',
                            size: 20,
                            color: colors.main_color,
                            weight: 'normal',
                        }}
                    />
                    <SettingItem
                        icon={{
                            name: 'shield',
                            size: 28,
                            type: 'Ionicons',
                            color: colors.secondary_color
                        }}
                        label={{
                            text: 'Privacy & Security',
                            size: 20,
                            color: colors.main_color,
                            weight: 'normal',
                        }}
                    />
                    <SettingItem
                        icon={{
                            name: 'volume-up',
                            size: 28,
                            type: 'MaterialIcons',
                            color: colors.secondary_color
                        }}
                        label={{
                            text: 'Sound',
                            size: 20,
                            color: colors.main_color,
                            weight: 'normal',
                        }}
                    />
                    <SettingItem
                        icon={{
                            name: 'language',
                            size: 28,
                            type: 'Ionicons',
                            color: colors.secondary_color
                        }}
                        label={{
                            text: 'Language',
                            size: 20,
                            color: colors.main_color,
                            weight: 'normal',
                        }}
                    />
                    <SettingItem
                        icon={{
                            name: 'logout',
                            size: 28,
                            type: 'Ionicons',
                            color: colors.secondary_color
                        }}
                        label={{
                            text: 'Log out',
                            size: 20,
                            color: colors.main_color,
                            weight: 'normal',
                        }}
                        action={logout}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
