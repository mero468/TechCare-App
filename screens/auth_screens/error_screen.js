import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors } from '../../common/colors'
import SpecialText from '../../common/SpecialText'



const Error_screen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/splash_img.png')} style={{
                marginVertical: 30, width: 250,
                height: 280
            }} />
            <SpecialText text='Opps! No Internet Connection' size={25} color={colors.main_color} />
        </View>
    )
}

export default Error_screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',

    }
})
