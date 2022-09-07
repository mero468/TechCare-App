import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors } from './colors';
import SpecialText from './SpecialText';
// import { Icon } from 'react-native-elements/dist/icons/Icon'
import Icon from 'react-native-vector-icons/MaterialIcons';




const Item = ({ date, text, data, action = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={action}
            style={{
                width: '95%',
                backgroundColor: '#fff',
                marginVertical: 10,
                paddingHorizontal: 16,
                paddingVertical: 16,
                borderRadius: 12,
                elevation: 7,
                position: 'relative',
            }}>
            <SpecialText text={date.slice(0, 10)} size={20} weight='normal' color={colors.main_color} />
            <Text style={{ color: colors.secondary_color, fontSize: 17 }}>Lab: {text.length > 30 ? text.substr(0, 50) + '...' : text}</Text>
            <Text style={{ color: colors.secondary_color, fontSize: 17 }}>Branch: {text.length > 30 ? text.substr(0, 50) + '...' : data.branch_name}</Text>
            <Icon name='read-more' size={32} color={colors.main_color} type='MaterialIcons' style={{
                position: 'absolute',
                bottom: 15,
                right: 20
            }} />
        </TouchableOpacity>
    )
}

export default Item

const styles = StyleSheet.create({})
