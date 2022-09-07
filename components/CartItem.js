import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BottomSheet, Card, Button, Icon, ListItem } from 'react-native-elements';
import SpecialText from '../common/SpecialText';
import { colors } from '../common/colors';
import { showMessage, hideMessage } from "react-native-flash-message";



const CartItem = ({ id, img, title, price, quantity = 0, removeAction, counter }) => {

    return (
        <View
            style={styles.cartContainer}>
            <View>
                <Image source={img ? { uri: img } : require('../assets/images/no-img.png')} resizeMode='contain' style={styles.imgStyle} width={120} height={120} />
            </View>
            <View style={styles.infoContainer}>

                <View style={styles.text_price_container}>

                    <View style={{ height: '70%' }}>
                        <SpecialText text={title} style={{ flexShrink: 1, overflow: 'hidden' }} size={18} color={colors.main_color} lineHeight={21} />
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={{ color: 'black', fontSize: 15 }}>$ {price}</Text>
                    </View>

                </View>

                <View style={styles.count_remove_container}>
                    <View>
                        <Icon name='close' size={23} color={colors.secondary_color} type='antDesign' onPress={() => removeAction(id)} />
                    </View>

                    <View style={styles.counter}>
                        <Pressable style={styles.counterItem}>
                            <Icon
                                name='pluscircleo' size={24} color={colors.main_color} type='antdesign' onPress={() => counter(id, '+')} />
                        </Pressable>
                        <View style={styles.counterItem}>
                            <Text style={{ color: colors.main_color, fontSize: 20 }}>{quantity}</Text>
                        </View>
                        <Pressable style={styles.counterItem}>
                            <Icon
                                name='minuscircleo' size={24} color={colors.main_color} type='antdesign' onPress={quantity > 1 ? () => counter(id, '-') : () => removeAction(id)} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    cartContainer: {
        height: 110,
        flexDirection: 'row',
        borderRadius: 10,
        paddingVertical: 0,
        backgroundColor: '#fff',
        elevation: 8,
        borderWidth: 0,
        width: '95%',
        alignItems: 'flex-start',
        marginVertical: 5,
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    imgStyle: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 10,
        flex: 2,
        borderLeftWidth: 1.5,
        borderLeftColor: colors.light_main_color,
        paddingHorizontal: 10,
        height: '100%'
    },
    text_price_container: {
        flex: 1,
        width: '65%',
        justifyContent: 'space-between',
        height: '100%'
    },
    priceContainer: {
        borderWidth: 2,
        borderColor: colors.secondary_color,
        paddingHorizontal: 15,
        borderRadius: 15,
        paddingVertical: 2,
        alignSelf: 'flex-start'
    },
    count_remove_container: {
        alignItems: 'flex-end',
        width: '35%'
    },
    counter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignSelf: 'flex-end'
    },
    counterItem: {
        marginHorizontal: 5,
    }
})