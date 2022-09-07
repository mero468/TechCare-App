import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import SpecialText from '../../common/SpecialText';
import { colors } from '../../common/colors';
import UserHeader from '../../common/UserHeader';
import SectionLabel from '../../common/SectionLabel';
import { Context } from '../../context/context';

import {useSelector,useDispatch} from 'react-redux';


const Home_screen = ({ navigation }) => {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.container}>
                    <View style={styles.inline_container}>
                        <UserHeader imageIcon={require('../../assets/images/hand.png')} />
                    </View>
                    <ScrollView>
                        <View style={styles.sections_container}>
                            <SectionLabel label='Lab Results' img={require('../../assets/images/histroy.png')} action={() => navigation.navigate('lab_results')} />
                            <SectionLabel label='Wellness Space' img={require('../../assets/images/wellness.png')} action={() => navigation.navigate('WellnessSpace')} />
                            <SectionLabel label='Home Testing Kits' img={require('../../assets/images/wellness.png')} action={() => navigation.navigate('TestingKits')} />
                            <SectionLabel label='Your Diet Chart' img={require('../../assets/images/diet.png')} />
                            <SectionLabel label='Online Chat' img={require('../../assets/images/chat.png')} />
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Home_screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingVertical: 15,
    },
    inline_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingVertical: 10
    },
    sections_container: {
        width: '100%',
        alignItems: 'center',
    }
})
