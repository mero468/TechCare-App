import { StyleSheet, Text, View, ScrollView, Image, FlatList,VirtualizedList, Dimensions,ActivityIndicator} from 'react-native';
import React from 'react';
import SectionHeader from '../../common/SectionHeader';
import { Card, Button, Icon } from 'react-native-elements';
import { colors } from '../../common/colors';
import { useEffect, useState } from 'react';
import PackageCard from '../../components/PackageCard';
import CustomNavHeader from '../../components/CustomNavHeader';
import { showMessage, hideMessage } from "react-native-flash-message";
import {useSelector,useDispatch} from 'react-redux';
import {getPackagesDetails} from '../../statemanagement/actions/packages'

const sc_width = Dimensions.get('screen').width;

const Detail_package = ({item}) =>(
    <View style={{ width: sc_width * 0.47 }}>
        <PackageCard item={item} btnTitle="Read Results"></PackageCard>
    </View>
)

const getItem = (data, index) => {
    return data[index];
};
const TestingKits = ({ navigation }) => {

    const {packages,packages_result,packages_details,details_flag} = useSelector(state => state.PackagesReducer);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.loginReducer);
    useEffect(() => {
        dispatch(getPackagesDetails(packages,packages_result.patient_log));

    },[]);
    return (
        <>
            <CustomNavHeader goBack={() => navigation.goBack()} />

            {!details_flag ?
            <View style={[styles.container_loader, styles.horizontal]}>
              <ActivityIndicator />
            </View>
            :
            <>
                    <SectionHeader label={`مرحبا  ${user.user_info} جميع التقارير الخاصة بك`} img={require('../../assets/images/techare-logo.png')} />
                <ScrollView style={{flex:1}}>
                <VirtualizedList
                        data={packages_details}
                        initialNumToRender={4}
                        getItemCount = {data => data.length}
                        getItem = {getItem}
                        columnWrapperStyle={styles.colWrapper}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({ item }) => (
                            <Detail_package item={item}>

                            </Detail_package>
                            )}
                        keyExtractor= {item => item.id} 
                        />
                </ScrollView>
            </>
            }
        </>

    );
};

export default TestingKits;

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
    },
    container_loader: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 10
      }
});
