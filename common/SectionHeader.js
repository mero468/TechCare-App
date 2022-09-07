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
                <SpecialText text={label} size={24} weight='bold' color={colors.main_color} style={{ marginRight: 25, width: 120, flexWrap: 'wrap' }} />
                <Image source={img} style={styles.image} />
            </View>
        </View>
    )
}

export default SectionHeader

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginHorizontal: 20,
        width: '93%',
    },
    content_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 18,
        paddingRight: 15,
        paddingVertical: 5,
        marginVertical: 5,
        backgroundColor: colors.light_main_color,
        borderRadius: 10,
        width: '100%',
        paddingVertical: 1

    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    }
})
