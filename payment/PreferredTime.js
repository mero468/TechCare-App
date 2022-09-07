import { StyleSheet, View, Text, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import CircleImage from '../common/CircleImage';
import { colors } from '../common/colors';
import SpecialText from '../common/SpecialText';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Fontisto';
import { CartContext } from '../context/cart_context';





const PreferredTime = () => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const {
        preferredTime,
        setPreferredTime
    } = useContext(CartContext);


    return (
        <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
            <View style={{ marginVertical: 15, flexDirection: 'row', alignItems: 'center' }}>
                <CircleImage letter="3" width={40} height={40} letter_size={18} />
                <View>
                    <SpecialText text='WHEN DO YOU LIKE TO RECEIVE' color={colors.main_color} size={20} />
                    <SpecialText text='YOUR PACKAGE' color={colors.main_color} size={20} />
                </View>
            </View>
            <View style={{ width: '100%', marginVertical: 35, alignItems: 'center' }}>
                <View style={{
                    marginHorizontal: 25,
                    marginVertical: 10,
                    alignSelf: 'flex-start'
                }}>
                    <Text style={{
                        color: colors.main_color,
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>Select Date & Time</Text>
                </View>
                <Pressable onPress={() => {
                    setOpen(true)
                }}
                    style={{
                        width: '85%',
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        alignItems: 'center',
                        paddingHorizontal: 8,
                        paddingBottom: 10,
                        borderBottomWidth: 2,
                        borderBottomColor: colors.main_color,
                        justifyContent: 'space-between',
                        marginBottom: 30,
                        marginTop: 15,
                        backgroundColor: '#fff',
                        paddingVertical: 12,
                        borderRadius: 5
                    }}>
                    <View>
                        <Text style={{ fontSize: 16 }}>{date.toISOString().slice(0, 10) + " " + date.toLocaleTimeString().slice(0, 5)}</Text>
                    </View>
                    <View>
                        <Icon name='date' size={22} color={colors.main_color} type='Fontisto' />
                    </View>
                </Pressable>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        setPreferredTime(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                    mode='datetime'
                />

            </View>
        </View>
    )
}

export default PreferredTime

const styles = StyleSheet.create({})
