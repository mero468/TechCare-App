import { StyleSheet, Text, View, ScrollView, Image, FlatList, Dimensions, Pressable } from 'react-native';
import React from 'react';
import SectionHeader from '../../common/SectionHeader';
import { colors } from '../../common/colors';
import { Context } from '../../context/context';
import { useEffect, useState, useContext, useRef } from 'react';
import CustomCard from '../../components/CustomCard';
import CustomNavHeader from '../../components/CustomNavHeader';
import { BottomSheet, Card, Button, Icon, ListItem } from 'react-native-elements';
import SpecialText from '../../common/SpecialText';
import CartItem from '../../components/CartItem';
import { CartContext } from '../../context/cart_context';
import RBSheet from "react-native-raw-bottom-sheet";
import CustomButton from '../../common/CutomButton';
import InCartInvoice from '../../components/InCartInvoice';
import MultiStepsForm from '../../components/MultiStepsForm';
import storage from '../../async storage/asyncStorge';




const CartScreen = ({ navigation }) => {

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
        preferredTime,
        setPreferredTime
    } = useContext(CartContext);

    const refRBSheet = useRef();


    const [isVisible, setIsVisible] = useState(true);


    const removeAction = (id) => {
        let _items = [...cartItems];

        let s_total;
        let total;

        _items = _items.filter(item => {
            if (item.package_id === id) {
                s_total = subTotal - (item.price / item.quantity);
                setSubTotal(s_total);
                total = s_total + shippingCost
                setTotalPrice(total)
            }
            else
                return item
        })

        setCartItems(_items);

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

        if (_items.length < 1) {
            setSubTotal(0);
            setTotalPrice(0)
            storage.remove({
                key: 'cart'
            })
        }

    }

    const counter = (id, operation) => {
        let _items = [...cartItems];
        let s_total;
        let total;

        if (operation === '-') {
            _items = _items.map(item => {
                if (item.package_id === id) {
                    item.price = item.price - (item.price / item.quantity)
                    item.quantity--;
                    s_total = subTotal - (item.price / item.quantity);
                    setSubTotal(s_total);
                    total = s_total + shippingCost
                    setTotalPrice(total)
                }

                return item;
            })
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
        }
        else if (operation === '+')
            _items = _items.map(item => {
                if (item.package_id === id) {
                    item.price = item.price + (item.price / item.quantity)
                    item.quantity++;
                    s_total = subTotal + (item.price / item.quantity);
                    setSubTotal(s_total);
                    total = s_total + shippingCost
                    setTotalPrice(total)
                }

                return item;
            })

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

        setCartItems(_items);
    }


    return (
        <>
            <CustomNavHeader goBack={() => navigation.goBack()} title='My Cart' />

            <ScrollView style={{ flex: 1, backgroundColor: '#fff', }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}
            >
                {
                    cartItems.map((item, index) => <CartItem key={`${index}+${item.quantity}`} id={item.package_id} img={item.img} title={item.title} price={item.price} quantity={item.quantity} removeAction={removeAction}
                        counter={counter} />)
                }

            </ScrollView>
            {
                cartItems.length > 0 &&
                <InCartInvoice total={totalPrice} sub_total={subTotal} shipping_price={shippingCost} btnAction={() => refRBSheet.current.open()} />
            }
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                dragFromTopOnly={true}
                animationType="fade"
                height={500}
                onOpen={() => setIsVisible(false)}
                onClose={() => setIsVisible(true)}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    },

                }}
            >
                <MultiStepsForm />
            </RBSheet>
        </>
    )
}

export default CartScreen

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
})