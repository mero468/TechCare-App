import { useState, createContext, useEffect, useContext } from "react";
import React from 'react'
import { Context } from './context'
import { domain } from '../api_info';
import storage from "../async storage/asyncStorge";


export const CartContext = createContext();

export const CartProvider = (props) => {
    const { token } = useContext(Context)
    
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('Jordan')
    const [cartItems, setCartItems] = useState([])
    const [subTotal, setSubTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [priceBasedOnQuantity, setPriceBasedOnQuantity] = useState(0)
    const [zipCode, setZipCode] = useState('')
    const [shippingName, setShippingName] = useState('')
    const [creditCard, setCreditCard] = useState({
        "values": {
            "cvc": "", "expiry": "", "name": "", "number": "", "type": ""
        }
    })
    const [paymentMethod, setPaymentMethod] = useState('visa')
    const [locationLatitude, setLocationLatitude] = useState(0)
    const [locationLongitude, setLocationLongitude] = useState(0)
    const [preferredTime, setPreferredTime] = useState(new Date)

    console.log(preferredTime, locationLatitude, locationLongitude)


    const getUserInfo = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${token}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(`${domain}/techCare/update-user/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setFullName(result.full_name)
                setPhone(result.phone)
                setEmail(result.email)
                setAddress(result.address)
                setCountry(result.country)
            })
            .catch(error => console.log('error get user info', error));
    }

    useEffect(() => {
        getUserInfo();

        storage.load({
            key: 'cart',
        }).then(res => {
            console.log('cart: ', res)
            setFullName(res.fullName);
            setEmail(res.email);
            setPhone(res.phone);
            setAddress(res.address);
            setCartItems(res.cartItems);
            setSubTotal(res.subTotal);
            setShippingCost(res.shippingCost);
            setTotalPrice(res.totalPrice);
            setPriceBasedOnQuantity(res.priceBasedOnQuantity);
            setZipCode(res.zipCode);
            setShippingName(res.shippingName);
            setCreditCard(res.creditCard);
            setLocationLatitude(res.locationLatitude)
            setLocationLongitude(res.locationLongitude)
            setPreferredTime(res.preferredTime)
        }).catch((err) => console.log('err from context getdata', err))

    }, [token])


    return (
        <CartContext.Provider value={{
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
        }}>
            {props.children}
        </CartContext.Provider>
    )
}