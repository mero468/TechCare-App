import { StyleSheet, View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { CreditCardInput } from "react-native-credit-card-input-view";
import { CardView } from "react-native-credit-card-input-view";
import { colors } from '../common/colors';
import CircleImage from '../common/CircleImage';
import SpecialText from '../common/SpecialText';
import { CartContext } from '../context/cart_context';

const Invoice = ({ }) => {

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
        <View style={{ flex: 1, width: '100%' }}>
            <ScrollView
                style={{ flex: 2, width: '100%', height: '100%' }}
                contentContainerStyle={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
                showsVerticalScrollIndicator={false}
            >
                <SpecialText text='ORDER DETAILS' color={colors.main_color} size={20} style={{ marginVertical: 7 }} />
                <View style={styles.container}>
                    <SpecialText text='CONTACT' color={colors.main_color} size={20} style={{ marginVertical: 7 }} />

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Full name:' lineHeight={20} color={colors.main_color} size={16} />
                        <SpecialText text={fullName} lineHeight={20} color={colors.main_color} size={16} style={{ marginHorizontal: 10 }} />
                    </View>

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Email:' lineHeight={20} color={colors.main_color} size={17} />
                        <SpecialText text={email} lineHeight={20} color={colors.main_color} size={16} style={{ marginHorizontal: 10 }} />
                    </View>

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Phone:' lineHeight={20} color={colors.main_color} size={16} />
                        <SpecialText text={phone} lineHeight={20} color={colors.main_color} size={16} style={{ marginHorizontal: 10 }} />
                    </View>

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='ZIP code:' lineHeight={20} color={colors.main_color} size={16} />
                        <SpecialText text={zipCode} lineHeight={20} color={colors.main_color} size={16} style={{ marginHorizontal: 10 }} />
                    </View>

                    <SpecialText text='SHIPPING' color={colors.main_color} size={20} style={{ marginVertical: 7 }} />

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Address:' lineHeight={20} color={colors.main_color} size={16} />
                        <SpecialText text={address} lineHeight={20} color={colors.main_color} size={16} style={{ marginHorizontal: 10 }} />
                    </View>

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Shipping cost:' lineHeight={20} color={colors.main_color} size={16} />
                        <SpecialText text={'$ ' + shippingCost} lineHeight={20} color={colors.main_color} size={16} style={{ marginHorizontal: 10 }} />
                    </View>

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Shipping name:' lineHeight={20} color={colors.main_color} size={16} />
                        <SpecialText text={shippingName} lineHeight={20} color={colors.main_color} size={16} style={{ marginHorizontal: 10 }} />
                    </View>

                    <SpecialText text='PAYMENT' color={colors.main_color} size={20} style={{ marginVertical: 7 }} />

                    {
                        paymentMethod === 'visa' ?
                            <View style={{ width: '100%', alignItems: "center" }}>

                                <CardView
                                    number={creditCard.values.number}
                                    cvc={creditCard.values.cvc}
                                    expiry={creditCard.values.expiry}
                                    brand={creditCard.values.type}
                                    name={creditCard.values.name}
                                    display={true}
                                    flipDirection="h"
                                />
                            </View>

                            :
                            <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                                <SpecialText text='Cash on Delivery:' lineHeight={20} color={colors.main_color} size={16} />
                                <SpecialText text={'$ ' + totalPrice} lineHeight={20} color={colors.main_color} size={16} style={{ marginHorizontal: 10 }} />
                            </View>
                    }

                    <SpecialText text='COST' color={colors.main_color} size={20} style={{ marginVertical: 7 }} />

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Sub total:' lineHeight={20} color={colors.main_color} size={16} />
                        <SpecialText text={'$ ' + subTotal} lineHeight={20} color={colors.main_color} size={16} style={{ marginHorizontal: 10 }} />
                    </View>

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Shpping cost:' lineHeight={20} color={colors.main_color} size={16} />
                        <SpecialText text={'$ ' + shippingCost} lineHeight={20} color={colors.main_color} size={16} style={{ marginHorizontal: 10 }} />
                    </View>

                    <View style={{ ...styles.infoContainer, justifyContent: 'space-between' }}>
                        <SpecialText text='Total cost:' lineHeight={25} color={colors.main_color} size={20} />
                        <SpecialText text={'$ ' + totalPrice} lineHeight={25} color={colors.main_color} size={20} style={{ marginHorizontal: 10 }} />
                    </View>

                </View>

            </ScrollView>
        </View>
    )
}

export default Invoice

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 15,
        marginBottom: 20
    },
    infoContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.main_color
    },

})