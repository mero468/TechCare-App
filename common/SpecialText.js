import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SpecialText = ({ text, size = 15, weight = 'normal', color = '#000', style, lineHeight = 35 }) => {
    return (
        <View style={{ ...styles.aroundText, ...style }}>
            <Text style={{ ...styles.text, fontSize: size, fontWeight: weight == 'normal' ? '600' : 'bold', color: color, lineHeight: lineHeight, }}>{text}</Text>
        </View>
    )
}

export default SpecialText

const styles = StyleSheet.create({
    aroundText: {
        flexDirection: 'row'
    },
    text: {
        letterSpacing: -1,
        flexWrap: 'wrap'
    }
})
