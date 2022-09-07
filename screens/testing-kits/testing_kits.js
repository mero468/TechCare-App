import { StyleSheet, Text, View, ScrollView, Image, FlatList, Dimensions } from 'react-native';
import React from 'react';
import SectionHeader from '../../common/SectionHeader';
import { Card, Button, Icon } from 'react-native-elements';
import { colors } from '../../common/colors';
import { Context } from '../../context/context';
import { useEffect, useState, useContext } from 'react';
import CustomCard from '../../components/CustomCard';
import CustomNavHeader from '../../components/CustomNavHeader';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CartContext } from '../../context/cart_context';
import storage from '../../async storage/asyncStorge';




const sc_width = Dimensions.get('screen').width;


const TestingKits = ({ navigation }) => {
    const { token, user } = useContext(Context);

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
        setCreditCard
    } = useContext(CartContext);

    const [DATA, setDATA] = useState([])



    const getPackages = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${token}`);


        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://super-dashboard.lite.flims.co/techCare/package/", requestOptions)
            .then(response => response.json())
            .then(result => {
                setDATA(result)
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        getPackages();

        return () => { }
    }, [])


    return (
        <>
            <CustomNavHeader goBack={() => navigation.goBack()} />

            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <SectionHeader label="Home Testing Kits" img={require('../../assets/images/wellness.png')} />
                </View>
                {DATA &&
                    <FlatList
                        data={DATA}
                        numColumns={2}
                        columnWrapperStyle={styles.colWrapper}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({ item }) => (
                            <View style={{ width: sc_width * 0.47 }}>
                                <CustomCard item={item} btnTitle="Add To Cart" btnAction={() => {
                                    let exists = cartItems.some(ele => {
                                        if (ele.package_id === item.id)
                                            return true
                                    })

                                    if (cartItems.length > 0 && exists) {

                                        let _items = [...cartItems]
                                        let s_total;
                                        let total;

                                        _items = _items.map(ele => {
                                            if (ele.package_id === item.id) {
                                                ele.price = ele.price + (ele.price / ele.quantity)
                                                ele.quantity++;
                                                s_total = subTotal + (ele.price / ele.quantity);
                                                setSubTotal(s_total);
                                                total = s_total + shippingCost
                                                setTotalPrice(total)
                                            }
                                            return ele;
                                        })

                                        setCartItems(_items)
                                        storage.save({
                                            key: 'cart',
                                            data: {
                                                fullName: fullName,
                                                phone: phone,
                                                email: email,
                                                address: address,
                                                cartItems: _items,
                                                subTotal: s_total,
                                                shippingCost: shippingCost,
                                                totalPrice: total,
                                                priceBasedOnQuantity: priceBasedOnQuantity,
                                                zipCode: zipCode,
                                                shippingName: shippingName,
                                                creditCard: creditCard,
                                            },
                                            expires: null
                                        });
                                    } else {
                                        let s_total = subTotal + item.price;
                                        setSubTotal(s_total);
                                        let total = s_total + shippingCost
                                        setTotalPrice(total)
                                        storage.save({
                                            key: 'cart',
                                            data: {
                                                fullName: fullName,
                                                phone: phone,
                                                email: email,
                                                address: address,
                                                cartItems: [...cartItems, {
                                                    "package_id": item.id,
                                                    "title": item.title,
                                                    "price": item.price,
                                                    "img": item.image,
                                                    "quantity": 1
                                                }],
                                                subTotal: s_total,
                                                shippingCost: shippingCost,
                                                totalPrice: total,
                                                priceBasedOnQuantity: priceBasedOnQuantity,
                                                zipCode: zipCode,
                                                shippingName: shippingName,
                                                creditCard: creditCard,
                                            },
                                            expires: null
                                        });
                                        setCartItems([...cartItems, {
                                            "package_id": item.id,
                                            "title": item.title,
                                            "price": item.price,
                                            "img": item.image,
                                            "quantity": 1
                                        }])
                                    }

                                    showMessage({
                                        message: `${item.title} added to cart!`,
                                        type: "success",
                                        color: "#fff"
                                    })
                                }} />
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                }
            </ScrollView>
        </>

    );
};

export default TestingKits;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15
    },
    colWrapper: {
        flexWrap: 'wrap',
        flex: 1
    }
});
