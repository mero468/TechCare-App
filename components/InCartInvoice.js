import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../common/colors';
import CustomButton from '../common/CutomButton';


const InCartInvoice = ({ btnAction, total, sub_total, shipping_price }) => {
    return (
        <View style={styles.container}>

            <View style={styles.rowsContainer}>1
                <View style={styles.row}>
                    <Text style={styles.mdText}>Sub total</Text>
                    <Text style={styles.mdText}>${sub_total}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.mdText}>Shipping</Text>
                    <Text style={styles.mdText}>${shipping_price}</Text>
                </View>

                <View style={styles.lgRow}>
                    <Text style={styles.lgText}>Total</Text>
                    <Text style={styles.lgText}>${total}</Text>
                </View>
            </View>

            <CustomButton text='Complete Order' size='lg' action={btnAction} />

        </View>
    )
}

export default InCartInvoice

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: colors.secondary_color,
        alignItems: 'center',
        width: '100%'
    },
    rowsContainer: {
        width: '100%',
        paddingVertical: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: colors.light_main_color
    },
    lgRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    mdText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    lgText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700'
    }

})