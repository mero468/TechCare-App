import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from './colors'


const PressableText = ({ text, size = 13, weight = 'normal', color = colors.main_color, action }) => {
    return (
        <Pressable onPress={action} style={{ ...styles.aroundText }}>
            <Text style={{ ...styles.text, fontSize: size, fontWeight: weight, color: color }}>{text}</Text>
        </Pressable>
    )
}

export default PressableText

const styles = StyleSheet.create({
    aroundText: {
        // paddingVertical: 5,
    },
    text: {
        fontFamily: 'Raleway',
    }
})

