import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { colors } from './colors';
import SpecialText from './SpecialText';



const SectionLabel = ({ label, img, action }) => {
    return (
        <TouchableOpacity onPress={action} style={styles.container}>
            <SpecialText text={label} size={24} weight='bold' color={colors.main_color} style={{ marginRight: 25, width: 120, flexWrap: 'wrap' }} />
            <Image source={img} style={styles.image} />
        </TouchableOpacity>
    )
}

export default SectionLabel

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        backgroundColor: colors.light_main_color,
        width: '90%',
        borderRadius: 10
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    }
})
