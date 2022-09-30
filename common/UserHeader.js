import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors } from './colors';
import SpecialText from './SpecialText';
import CircleImage from './CircleImage';
import { Context } from '../context/context';
import {useSelector,useDispatch} from 'react-redux';


const UserHeader = ({ imageIcon}) => {
    const {user} = useSelector(state => state.loginReducer);
    const username = user.user_info ? user.user_info.split(' ')[0] : '';
    let l = user.user_info ? user.user_info[0].toUpperCase() : '';
    const {language} = useSelector(state => state.GeneralReducer);
    console.log(language)
    return (
        <>
        
        { language ? 
            <>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                    <Image source={imageIcon} style={{ height: 30, width: 30, paddingVertical: 9, marginHorizontal: 10 }} />
                    <SpecialText text={`Hi ${username}!`} size={28} weight='bold' color={colors.dark_color} />
                </View>
                <Image source={require('../assets/images/techare-logo.png')} style={styles.image} />
            </View>
        </>

            :
            <>
            
                <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                    <Image source={imageIcon} style={{ height: 30, width: 30, paddingVertical: 9, marginHorizontal: 10 }} />
                    <SpecialText text={`اهلا بك  ${username}!`} size={28} weight='bold' color={colors.dark_color} />
                </View>
                <Image source={require('../assets/images/techare-logo.png')} style={styles.image} />


                {/* <CircleImage letter={l} letter_size={28} /> */}
                </View>
            
            </>

    }
    </>)
}

export default UserHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 100,
        backgroundColor: '#fff',
    },
    image: {
        resizeMode: "contain",
        width:100,
        height:100,
    }
})

