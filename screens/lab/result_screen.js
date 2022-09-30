import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable, Linking, ActivityIndicator } from 'react-native'
import { colors } from '../../common/colors'
import SpecialText from '../../common/SpecialText'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Context } from '../../context/context';
import { domain } from '../../api_info';
import ResultItem from '../../components/ResultItem';
import {useSelector,useDispatch} from 'react-redux';
import CustomNavHeader from '../../components/CustomNavHeader';
import {getResultNoramlRange} from '../../statemanagement/actions/lab'



const ResultScreen = ({ navigation , route}) => {
    const { date} = route.params;
    const {results,normals_loaded} = useSelector(state => state.LabReducer);
    const {token,username} = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const count = results[date.item].length;
        if(Boolean(normals_loaded[date.item]) == false){
            results[date.item].forEach(element => {
                dispatch(getResultNoramlRange(count,token,username,element.id,element.result,date.item));
            });
        }
    }, []);
    return (
        <>
            <CustomNavHeader goBack={() => navigation.goBack()} />
            <ScrollView style={styles.container}>
                {
                    results[date.item].map(
                        (item) => (<ResultItem count={results[date.item].length} date={date.item} id={item.id} result={item.result} name={item.name} description_en={item.description_en} isOutOfRange={item.is_out_of_range} />))
                }

            </ScrollView >
        </>
    )
}

export default ResultScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})
