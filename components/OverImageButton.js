import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../common/colors'


const OverImageButton = ({ action }) => {
    return (
        <Pressable onPress={action} style={styles.container}>
            <Icon name='edit' type='MaterialIcons' color={colors.main_color} size={25} />
        </Pressable>
    )
}

export default OverImageButton

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        elevation: 15,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
