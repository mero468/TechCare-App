import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../common/colors';
import CustomTextInput from '../common/CustomTextInput';
import SpecialText from '../common/SpecialText';
import CircleImage from '../common/CircleImage';
import { CheckBox } from 'react-native-elements';
import { CartContext } from '../context/cart_context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const PaymentMethods = () => {
    const { paymentMethod, setPaymentMethod } = useContext(CartContext);
    const [cash, setCash] = useState(paymentMethod === 'cash' ? true : false)
    const [visa, setVisa] = useState(paymentMethod === 'visa' ? true : false)

    return (
        <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
            <View style={{ marginVertical: 15, flexDirection: 'row', alignItems: 'center' }}>
                <CircleImage letter="4" width={40} height={40} letter_size={18} />
                <SpecialText text='SELECT PAYMENT METHOD' color={colors.main_color} size={22} />
            </View>
            <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center', height: '65%' }}>
                <View style={styles.container}>
                    <CheckBox
                        center
                        title="Cash"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={cash}
                        onPress={() => {
                            setPaymentMethod('cash')
                            setCash(!cash)
                            setVisa(false)
                        }}
                        containerStyle={styles.containerStyle}
                        wrapperStyle={styles.wrapperStyle}
                        textStyle={styles.textStyle}
                        checkedColor={colors.main_color}
                    />
                    <Icon name='cash-multiple' type='MaterialCommunityIcons' size={30} color='green' />
                </View>

                <View style={styles.container}>
                    <CheckBox
                        center
                        title="Visa"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={visa}
                        onPress={() => {
                            setPaymentMethod('visa')
                            setVisa(!visa)
                            setCash(false)
                        }}
                        containerStyle={styles.containerStyle}
                        wrapperStyle={styles.wrapperStyle}
                        textStyle={styles.textStyle}
                        checkedColor={colors.main_color}
                    />
                    <Icon name='credit-card' type='MaterialCommunityIcons' size={30} color='green' />
                </View>
            </View>
        </View>
    )
}

export default PaymentMethods

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 15
    },
    containerStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        margin: 0,
        padding: 0,
    },
    wrapperStyle: {
        width: '80%',
        justifyContent: 'flex-start',
        margin: 0,
        padding: 0,
    },
    textStyle: {
        color: colors.main_color,
        fontSize: 16
    }
})