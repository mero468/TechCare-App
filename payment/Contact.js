import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../common/colors';
import CustomTextInput from '../common/CustomTextInput';
import SpecialText from '../common/SpecialText';
import CircleImage from '../common/CircleImage';

const Contact = ({ fullName = '', email = '', phone = '', setFullName, setPhone, setEmail }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ marginVertical: 15, flexDirection: 'row', alignItems: 'center' }}>
                <CircleImage letter="1" width={40} height={40} letter_size={18} />
                <SpecialText text='CONTACT DETAILS' color={colors.main_color} size={22} />
            </View>
            <View style={[styles.inputContainer, styles.btnContainer]}>
                <CustomTextInput placeholder='full name' value={fullName} style={{ marginVertical: 5 }} setValue={setFullName} />
                <CustomTextInput placeholder='email' type='email-address' value={email} style={{ marginVertical: 5 }} setValue={setEmail} />
                <CustomTextInput placeholder='phone number' value={phone} style={{ marginVertical: 5 }} setValue={setPhone} />
            </View>
        </View>
    )
}

export default Contact

const styles = StyleSheet.create({})