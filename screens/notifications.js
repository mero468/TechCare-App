import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { colors } from '../common/colors';
import SpecialText from '../common/SpecialText';
import NotificationItem from '../components/NotificationItem';




const Notifications = () => {
    return (
        <View style={styles.container}>
            <SpecialText text='Notifications' size={25} color={colors.main_color} weight='bold' style={{ marginBottom: 15 }} />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{ alignItems: 'center' }}>
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                </View>
            </ScrollView>
        </View>
    )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 25,
    }
})
