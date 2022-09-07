import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native'
import { colors } from '../../common/colors';
import UserHeader from '../../common/UserHeader';
import SectionHeader from '../../common/SectionHeader';
import Item from '../../common/Item';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { domain } from '../../api_info';
import { Context } from '../../context/context';
import SpecialText from '../../common/SpecialText';
import CustomNavHeader from '../../components/CustomNavHeader';


const LabResults = ({ navigation }) => {
    const { token, user } = useContext(Context);

    const [results, setResults] = useState([]);

    const [showIndicator, setShowIndicator] = useState(true)


    const getResults = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${token}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        await fetch(`${domain}/techCare/worksheets/`, requestOptions)
            .then(response => response.json())
            .then(res => {
                setResults(res)
                setShowIndicator(false)
            })
            .catch(error => console.log('error', error));

    }

    useEffect(() => {
        getResults()
        return () => { }
    }, [])


    return (
        <>
            <CustomNavHeader goBack={() => navigation.goBack()} />
            {user.is_patient ?
                <ScrollView
                    style={{ flex: 1, backgroundColor: "#fff" }}
                >
                    <KeyboardAvoidingView behavior='position'>
                        <SectionHeader label='Your Results' img={require('../../assets/images/histroy.png')} />
                        <View style={styles.container}>
                            <View style={styles.inline_container}>
                            </View>
                            {showIndicator ?
                                <ActivityIndicator size="large" color={colors.main_color} animating={showIndicator} /> :
                                <ScrollView>
                                    <View style={styles.items_container}>
                                        {
                                            results.length > 0 && results.map((res, index) => <Item key={index} date={res.created_at} text={res.lab_name} data={res}
                                                action={() => navigation.navigate('result', {
                                                    ...res
                                                })} />)
                                        }
                                    </View>
                                </ScrollView>
                            }
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView> :
                <View style={styles.error_container}>
                    <Image source={require('../../assets/images/nofiles.png')} style={{
                        marginVertical: 30, width: 300,
                        height: 300
                    }} />
                    <SpecialText text='no registerd visits for any of our labs ' size={20} color={colors.main_color} />
                </View>
            }
        </>
    )
}

export default LabResults

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingVertical: 15,
    },
    inline_container: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 10
    },
    items_container: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 6,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    error_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
})
