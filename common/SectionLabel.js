import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { colors } from './colors';
import SpecialText from './SpecialText';
import {useSelector,useDispatch} from 'react-redux';



const SectionLabel = ({ label, img, action }) => {
    const {language} = useSelector(state => state.GeneralReducer);

    return (
        <>
        
        { language ? 
        <TouchableOpacity onPress={action} style={styles.container}>
            <SpecialText text={label} size={20} weight='bold' color={colors.secondary_color} style={{ marginRight: 20, width: 120, flexWrap: 'wrap' }} />
            <Image source={img} style={styles.image} />
        </TouchableOpacity>
        :    
        <TouchableOpacity onPress={action} style={styles.container}>
            <Image source={img} style={styles.image} />
            <SpecialText text={label} size={20} weight='bold' color={colors.secondary_color} style={{ marginRight: 20, width: 120, flexWrap: 'wrap' }} />
        </TouchableOpacity>
    }
        </>
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
        width:200,
        height:180
    }
})
