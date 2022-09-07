import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import CreditCard from './CreditCard';
import { CartContext } from '../context/cart_context';
import SpecialText from '../common/SpecialText';
import { colors } from '../common/colors';



const Payment = () => {
    const {
        fullName,
        setFullName,
        phone,
        setPhone,
        email,
        setEmail,
        address,
        setAddress,
        country,
        setCountry,
        cartItems,
        setCartItems,
        subTotal,
        setSubTotal,
        shippingCost,
        setShippingCost,
        totalPrice,
        setTotalPrice,
        priceBasedOnQuantity,
        setPriceBasedOnQuantity,
        zipCode,
        setZipCode,
        shippingName,
        setShippingName,
        creditCard,
        setCreditCard,
        paymentMethod,
        setPaymentMethod
    } = useContext(CartContext);
    return (
        <>
            {paymentMethod === 'visa' ?
                <CreditCard creditCard={creditCard} setCreditCard={setCreditCard} /> :
                <View style={{ flex: 1, width: '100%', paddingHorizontal: 15, paddingVertical: 10 }}>
                    <SpecialText text='Payment Details' color={colors.main_color} size={24} style={{ marginTop: 7, marginBottom: 20 }} />

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Payment Method:' lineHeight={22} color={colors.main_color} size={21} />
                        <SpecialText text='Cash on Delivery' lineHeight={22} color={colors.main_color} size={21} style={{ marginHorizontal: 10 }} />
                    </View>

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Sub total:' lineHeight={22} color={colors.main_color} size={21} />
                        <SpecialText text={'$ ' + subTotal} lineHeight={22} color={colors.main_color} size={21} style={{ marginHorizontal: 10 }} />
                    </View>

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Shpping cost:' lineHeight={22} color={colors.main_color} size={21} />
                        <SpecialText text={'$ ' + shippingCost} lineHeight={22} color={colors.main_color} size={21} style={{ marginHorizontal: 10 }} />
                    </View>

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Total cost:' lineHeight={25} color={colors.main_color} size={21} />
                        <SpecialText text={'$ ' + totalPrice} lineHeight={25} color={colors.main_color} size={21} style={{ marginHorizontal: 10 }} />
                    </View>
                </View>

            }
        </>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 15,
        marginBottom: 20
    },
    infoContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.main_color
    },
})