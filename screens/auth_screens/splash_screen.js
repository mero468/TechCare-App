import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import CustomButton from '../../common/CutomButton';
import SpecialText from '../../common/SpecialText';
import { colors } from '../../common/colors';


const Splash_screen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <SpecialText text='Welcome to' size={22} weight='bold' color={colors.main_color} />
            <SpecialText text='TechCare' size={38} weight='bold' color={colors.main_color} />
            <Image source={require('../../assets/images/splash_img.png')} style={{ marginVertical: 20 }} />
            <View style={styles.btnContainer}>
                <CustomButton text='Sign Up' size='lg' backgroundColor={colors.main_color} style={{ marginVertical: 10 }} action={() => navigation.navigate('signup')} />
                <CustomButton text='Login' size='lg' backgroundColor='#fff' style={{ marginVertical: 5 }} action={() => navigation.navigate('login2')} />
            </View>
        </SafeAreaView>
    )
}

export default Splash_screen

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
    }
})