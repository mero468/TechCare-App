import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import { colors } from '../common/colors';
import SpecialText from '../common/SpecialText';


const CustomNavHeader = ({ goBack, title = '' }) => {
    return (
        <View style={styles.navContainer} >
            <Pressable style={{ width: '10%' }} onPress={() => goBack()}>
                <Icon name='arrow-back' size={30} color={colors.main_color} type='ionicons' />
            </Pressable>
            {
                title.length > 0 &&
                <View style={styles.textContainer} >
                    <SpecialText text={title} color={colors.main_color} stye={{ textAlign: 'center' }} size={23} weight='normal' />
                </View>
            }
        </View>
    )
}

export default CustomNavHeader

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 12,
        paddingBottom: 5,
        backgroundColor: '#fff',
        margin: 0,
        alignItems: 'center'
    },
    textContainer: {
        marginHorizontal: '33%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})