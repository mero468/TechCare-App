import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import { CreditCardInput } from "react-native-credit-card-input-view";
import { colors } from '../common/colors';
import CircleImage from '../common/CircleImage';
import SpecialText from '../common/SpecialText';



const dv_width = Dimensions.get('window').width;

const CreditCard = ({ creditCard,
    setCreditCard }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
                <View style={{
                    position: 'absolute', bottom: 50, alignItems: 'center', width: dv_width
                }}>
                    <CreditCardInput onChange={(data) => setCreditCard(data)}
                        values={{
                            "cvc": creditCard.values.cvc, "expiry": creditCard.values.expiry, "name": creditCard.values.name, "number": creditCard.values.number, "type": creditCard.values.type
                        }}

                        labelStyle={{
                            color: colors.main_color
                        }}
                        inputStyle={{
                            color: colors.main_color
                        }}
                        requiresName={true}
                        placeholderColor={colors.secondary_color}
                        labels={{
                            number: "CARD NUMBER", expiry: "EXPIRY", cvc: "CVC/CCV",
                            name: 'CARD HOLDER'
                        }}

                        allowScroll={true}
                    />
                </View>
            </View>
        </View>
    )
}

export default CreditCard

const styles = StyleSheet.create({})