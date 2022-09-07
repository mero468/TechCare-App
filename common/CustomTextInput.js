import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { colors } from './colors'
import Icon from 'react-native-vector-icons/Ionicons';


const CustomTextInput = ({ char,placeholder, type = 'default', style, is_password = false, setValue, value = '', disabled = true, is_location }) => {
    const [text, setText] = useState(char)
    const [hide, setHide] = useState(is_password)

    return (
        <View style={{ ...styles.input, ...style, alignItems: 'center' }}>
            <TextInput
                style={{ width: '100%', fontSize: 17 }}
                onChangeText={(char) => {
                    setText(char);
                    setValue(char);
                }}
                value={text}
                placeholder={placeholder}
                keyboardType={type}
                placeholderTextColor='#7B6BA8'
                secureTextEntry={hide ? true : false}
                color={colors.main_color}
                editable={disabled}
            />
            {is_password &&
                <Pressable style={{ position: 'absolute', right: 10 }} onPress={() => setHide(!hide)}>
                    <Icon name="eye" size={25} color={colors.secondary_color} />
                </Pressable>
            }
            {is_location &&
                <View style={{ position: 'absolute', right: 10 }}>
                    <Icon name="md-locate" size={25} color={colors.main_color} />
                </View>
            }
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        width: '85%',
        borderRadius: 10,
        borderColor: '#EDECF4',
        borderWidth: 3,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
    }
})
