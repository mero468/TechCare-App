import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import CustomButton from '../../common/CutomButton';
import SpecialText from '../../common/SpecialText';
import { colors } from '../../common/colors';


const Splash_screen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/images/techare-logo.png')} style={styles.image} />
            <Image source={require('../../assets/images/splash_img_2.png')} style={{  }} />
            <View style={styles.btnContainer}>
                <CustomButton text='Login' size='lg' backgroundColor={colors.main_color} style={{ margin:10}} action={() => navigation.navigate('login')} />
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
    },
    image: {
        resizeMode: "contain",
        width:200,
        height:100,
        alignSelf:"center"
    }
})