import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import MultiSteps from "react-native-multi-steps";
import { colors } from '../common/colors';
import CustomTextInput from '../common/CustomTextInput';
import SpecialText from '../common/SpecialText';
import CircleImage from '../common/CircleImage';
import Contact from '../payment/Contact';
import Shipping from '../payment/Shipping';
import CreditCard from '../payment/CreditCard';
import { CartContext } from '../context/cart_context';
import storage from '../async storage/asyncStorge';
import Invoice from '../payment/Invoice';
import PaymentMethods from '../payment/PaymentMethods';
import Payment from '../payment/Payment';
import PreferredTime from '../payment/PreferredTime';
import { domain } from '../api_info';




const MultiStepsForm = () => {
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
        setPaymentMethod,
        locationLatitude,
        setLocationLatitude,
        locationLongitude,
        setLocationLongitude,
        preferredTime,
        setPreferredTime
    } = useContext(CartContext);

    const saveShippingInfo = async () => {
        let myHeaders = new Headers();

        let formdata = new FormData();
        formdata.append("lat", locationLatitude);
        formdata.append("lon", locationLongitude);
        formdata.append("shipping_name", shippingName);
        formdata.append("zip_code", zipCode);
        formdata.append("email", email);
        formdata.append("phone", phone);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${domain}/techCare/shipping-info/`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    return (
        <MultiSteps
            onMoveNext={() => {
                try {
                    storage.save({
                        key: 'cart',
                        data: {
                            fullName: fullName,
                            phone: phone,
                            email: email,
                            // address: address,
                            locationLatitude: locationLatitude,
                            locationLongitude: locationLongitude,
                            cartItems: cartItems,
                            subTotal: subTotal,
                            shippingCost: shippingCost,
                            totalPrice: totalPrice,
                            priceBasedOnQuantity: priceBasedOnQuantity,
                            zipCode: zipCode,
                            shippingName: shippingName,
                            creditCard: creditCard,
                            paymentMethod: paymentMethod,
                            preferredTime: preferredTime
                        },
                        expires: null
                    });
                } catch (e) {
                    console.log(e)
                }
            }
            }
            onMovePrevious={() => {
                try {
                    storage.save({
                        key: 'cart',
                        data: {
                            fullName: fullName,
                            phone: phone,
                            email: email,
                            cartItems: cartItems,
                            subTotal: subTotal,
                            shippingCost: shippingCost,
                            totalPrice: totalPrice,
                            priceBasedOnQuantity: priceBasedOnQuantity,
                            zipCode: zipCode,
                            shippingName: shippingName,
                            creditCard: creditCard,
                            locationLatitude: locationLatitude,
                            locationLongitude: locationLongitude,
                            preferredTime: preferredTime
                        },
                        expires: null
                    });
                } catch (e) {
                    console.log(e)
                }
            }
            }
            onSubmit={() => {
                saveShippingInfo();
                console.log("Submit")
            }}
            config={{
                nextButtonLabel: 'Next',
                previousButtonLabel: 'Previous',
                submitButtonLabel: 'Send Order',
            }}
            containerStyle={styles.container}
            containerButtonStyle={{
                flexDirection: 'row',
                width: '45%',
                justifyContent: 'center',
                borderRadius: 10,
            }}
            buttonStyle={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: colors.main_color,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10,
                borderRadius: 10
            }}

        >

            <Contact fullName={fullName} email={email} phone={phone} setFullName={setFullName} setPhone={setPhone} setEmail={setEmail} />

            <Shipping address={address} setAddress={setAddress} zipCode={zipCode} setZipCode={setZipCode} shippingName={shippingName} setShippingName={setShippingName} />

            <PreferredTime />

            <PaymentMethods />

            <Payment />

            <Invoice />
        </MultiSteps >
    )
}

export default MultiStepsForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light_main_color,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        position: 'relative'
    },
    btnContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    inputContainer: {
        marginBottom: 15,
    },
})