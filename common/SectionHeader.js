import React from 'react'
import { StyleSheet, Text, View, Image, Button, Pressable, Dimensions } from 'react-native'
import { colors } from './colors';
import SpecialText from './SpecialText';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const screenWidth = Dimensions.get('screen').width

const SectionHeader = ({ label, img }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container} >
            <View style={styles.content_container}>
                <Image source={img} style={styles.image} />
                <SpecialText text={label} size={18} weight='bold' color={colors.main_color} style={{  flexWrap: 'wrap' }} />

            </View>
        </View>
    )
}

export default SectionHeader

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        width: '100%',
        backgroundColor: "#FFF",
    },
    content_container: {
        flexDirection: 'column',
        alignSelf:"stretch",
        alignItems:'center',
        paddingLeft: 18,
        paddingRight: 15,
        backgroundColor: colors.light_main_color,
        borderRadius: 10,
        width: '100%',
    },
    image: {
        resizeMode: "contain",
        width:200,
        height:100,
        alignSelf:"center"
    }
})
