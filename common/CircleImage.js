import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors } from './colors'


const CircleImage = ({ width = 50, height = 50, img, letter='', letter_size = 28 }) => {
    return (
        <View style={{ ...styles.container, width: width, height: height }}>
            <Text style={{
                color: colors.light_main_color,
                fontSize: letter_size,
                fontWeight: 'bold'
            }}>{letter}</Text>
        </View>
    )
}

export default CircleImage

const styles = StyleSheet.create({
    container: {
        borderRadius: 500,
        backgroundColor: colors.main_color,
        marginHorizontal: 10,
        borderWidth: 5,
        borderColor: colors.light_main_color,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
