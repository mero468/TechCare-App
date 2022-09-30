import { StyleSheet,Linking, Text, View, Image,Pressable } from 'react-native'
import React from 'react'
import { Card, Button } from 'react-native-elements';
import { colors } from '../common/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ResultCard = ({ urls, item, btnTitle, btnAction ,navigation}) => {
    


    return (
        <Card containerStyle={{ ...styles.containerStyle }}>
            <Card.Title style={{ ...styles.cardTitle }}>{item}

            </Card.Title>
            
            <View style={{flexDirection: 'row',alignSelf: 'flex-end'}}>
            {

                urls.map(url =>(
                    <Pressable style={{flexDirection: 'row',flexWrap: "wrap", alignSelf: 'flex-end'}}   onPress={() => Linking.openURL("https://results.techcare.health"+url).catch(err => console.error("Couldn't load page", err))}>
                    <Icon  style={{alignSelf: 'flex-end'}} name='file-download' size={30} color={colors.main_color} type='MaterialCommunityIcons' />
                    </Pressable>
                ))

            }
            </View>
            <Button
                buttonStyle={{
                    ...styles.cardButton
                }}
                title={btnTitle}
                onPress={btnAction }
            />
        </Card>
    )
}

export default ResultCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerStyle: {
        borderColor: colors.light_main_color,
        borderRadius: 10,
        elevation: 5,
        marginBottom: 10,
        position: 'relative',
        alignSelf:'stretch'
    },
    cardTitle: {
        alignSelf: 'flex-start',
        color: colors.main_color,
        fontSize: 19,
        fontWeight: '600',
    },
    cardButton: {
        backgroundColor: colors.main_color,
        borderRadius: 8,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 10,
        width: '100%'
    }
})