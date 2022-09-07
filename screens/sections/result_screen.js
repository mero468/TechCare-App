import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable, Linking, ActivityIndicator } from 'react-native'
import { colors } from '../../common/colors'
import SpecialText from '../../common/SpecialText'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Context } from '../../context/context';
import { domain } from '../../api_info';
import ResultItem from '../../components/ResultItem';



const ResultScreen = ({ route, navigation }) => {
    const { id, created_at, lab_name, branch_name } = route.params
    const { token } = useContext(Context);
    const time = created_at.substring(11, 16)
    const date = created_at.slice(0, 10)

    const [samples, setSamples] = useState([])
    const [report, setReport] = useState('')

    const [showIndicator, setShowIndicator] = useState(true)


    const getResultDetails = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${token}`);


        let formdata = new FormData();
        formdata.append("db", lab_name);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${domain}/techCare/worksheet-details/${id}/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setSamples(result.samples)
                setReport(result.report)
                setShowIndicator(false)
            })
            .catch(error => console.log('error', error));
    }

    const handleClick = () => {
        Linking.openURL(`${domain}${report}`);
    };

    useEffect(() => {
        getResultDetails();
    }, [])



    return (
        <ScrollView style={styles.container}>
            <View style={{
                ...styles.result_header, backgroundColor: colors.secondary_color, paddingVertical: 20,
                paddingHorizontal: 25
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <View><SpecialText text={`Lab: ${lab_name}`} color='#fff' weight='bold' size={19} /></View>
                    <View><SpecialText text={`Branch:  ${branch_name}`} color='#fff' weight='bold' size={19} /></View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View><SpecialText text={`Date:  ${date}`} color='#fff' weight='bold' size={20} /></View>
                    <View><SpecialText text={`Time: ${time}`} color='#fff' weight='bold' size={20} /></View>
                </View>
            </View>

            <View style={{
                paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row',
                justifyContent: 'space-between', alignItems: 'center'
            }}>
                <View>
                    <SpecialText text='check/download your result' color={colors.secondary_color} size={15} />
                </View>
                <Pressable onPress={() => handleClick()}>
                    <Icon name='file-download' size={30} color={colors.main_color} type='MaterialCommunityIcons' />
                </Pressable>
            </View>

            {showIndicator ?
                <ActivityIndicator size="large" color={colors.main_color} animating={showIndicator} /> :
                samples.map(sample => (
                    sample.analysis.map((item) => (<ResultItem id={item.id} result={item.result} name={item.name} isOutOfRange={item.is_out_of_range} />))
                ))
            }

        </ScrollView >
    )
}

export default ResultScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})
