import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../common/colors'
import SpecialText from '../common/SpecialText';
import { Icon } from 'react-native-elements';




const NotificationItem = () => {
    return (
        <View style={styles.container}>
            <Icon name='dot-single' size={35} color={colors.main_color} type='entypo' />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                <SpecialText text='Notification Title' color={colors.main_color} size={20} weight='normal' />
                <Text style={{ width: '90%', color: colors.secondary_color }}>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, ipsum dolor</Text>
            </View>
        </View>
    )
}

export default NotificationItem

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.light_main_color,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginVertical: 10,
        flexDirection: 'row',
    }
})
