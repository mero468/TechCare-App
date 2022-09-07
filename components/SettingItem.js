import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { colors } from '../common/colors';
import SpecialText from '../common/SpecialText';


const SettingItem = ({ icon, label, action = () => { } }) => {
    return (
        <TouchableOpacity style={styles.continer} onPress={action}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                // justifyContent: 'space-around',
                width: '80%'
            }}>
                <Icon name={icon.name} size={icon.size} color={icon.color} type={icon.type} style={{ marginRight: 10 }} />
                <SpecialText text={label.text} size={label.size} weight={label.weight} color={label.color} />
            </View>
            <Icon name='keyboard-arrow-right' size={35} color={colors.main_color} type='MaterialIcons' />
        </TouchableOpacity>
    )
}

export default SettingItem

const styles = StyleSheet.create({
    continer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    }
})
