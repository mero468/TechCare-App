import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Card, Button, Icon } from 'react-native-elements';
import { colors } from '../common/colors';



const PackageCard = ({ item, btnTitle, btnAction }) => {
    return (
        <Card containerStyle={{ ...styles.containerStyle }}>
            <Card.Title style={{ ...styles.cardTitle }}>{item.title}</Card.Title>


            <Image source={item.image ? { uri: item.image } : require('../assets/images/no-img.png')} resizeMode='contain' style={{ ...styles.cardImg }} width={150} height={135} />

            <Button
                buttonStyle={{
                    ...styles.cardButton
                }}
                title={btnTitle}
            />
        </Card>
    )
}

export default PackageCard

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: colors.light_main_color,
        borderRadius: 10,
        elevation: 5,
        marginBottom: 10,
        marginHorizontal: 5,
        position: 'relative',
    },
    cardTitle: {
        alignSelf: 'flex-start',
        color: colors.main_color,
        fontSize: 19,
        fontWeight: '600'
    },
    cardText: {
        marginBottom: 10,
        color: colors.main_color,
        height: 70
    },
    cardImg: {
        alignSelf: 'center',
        marginBottom: 15
    },
    cardButton: {
        backgroundColor: colors.main_color,
        borderRadius: 8,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        width: '100%'
    }
})