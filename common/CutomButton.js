import React from 'react'
import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import { colors } from './colors';


const CustomButton = ({ text, textColor = colors.main_color, backgroundColor = '#fff', size = 'sm', style, action }) => {
    return (
        <Pressable onPress={action} style={{ ...style, width: size == 'lg' ? '85%' : '45%' }}>
            <View style={{ ...styles.buttonContainer, backgroundColor: backgroundColor }}>
                <Text style={{ ...styles.text, color: backgroundColor == '#fff' ? colors.main_color : '#fff', fontSize: 15 }}>{text}</Text>
            </View>
        </Pressable>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    buttonContainer: {
        borderWidth: 2,
        borderColor: colors.main_color,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        borderRadius: 10,
    }
})
