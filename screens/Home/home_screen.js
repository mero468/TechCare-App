import React, { useContext } from 'react'
import { StyleSheet,Switch, Text, View, Image, KeyboardAvoidingView, ScrollView,ActivityIndicator } from 'react-native'
import SpecialText from '../../common/SpecialText';
import { colors } from '../../common/colors';
import UserHeader from '../../common/UserHeader';
import SectionLabel from '../../common/SectionLabel';
import {useSelector,useDispatch} from 'react-redux';
import {getPackages,getPackagesResult} from '../../statemanagement/actions/packages';
import { useEffect } from 'react';
import { setLanguage,setLanguage_text} from '../../statemanagement/general';



const Home_screen = ({ navigation }) => {
    const {token,username} = useSelector(state => state.loginReducer);
    const {flag,package_loaded} =  useSelector(state => state.PackagesReducer);
    //Get Packages on load 
    //To Do : Add everything that needs to load on the beginning here
    const dispatch = useDispatch();
    const {language} = useSelector(state => state.GeneralReducer);
    const toggleSwitch = () =>  {
        if(language){
            dispatch(setLanguage(false));
            dispatch(setLanguage_text("Language: English"));
        }
        else{
            dispatch(setLanguage(true))
            dispatch(setLanguage_text("اللغة : العربية"));
        }
    }
    useEffect(() => {
        dispatch(getPackagesResult(token,username));
        dispatch(getPackages(token));
    }, []);

    return (
        <>
        {!package_loaded || !flag ?
         (  
         <View style={[styles.container_loader, styles.horizontal]}>
              <ActivityIndicator />
            </View>
        )
        :
        (
            
        <>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={language ? colors.main_color : colors.light_main_color}
        onChange={toggleSwitch}
        value={language}
      />
        { language ? (
        <>
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.container}>
                    <View style={styles.inline_container}>
                        <UserHeader   imageIcon={require('../../assets/images/hand.png')} />
                    </View>

                        <View style={styles.sections_container}>
                            <SectionLabel label='My Packages' img={require('../../assets/images/packages.png')} action={() => navigation.navigate('TestingKits')} />
                            <SectionLabel label='All Wellness Result' img={require('../../assets/images/wellness.png')} action={() => navigation.navigate('WellnessSpace')} />
                            <SectionLabel label='Other Lab Results' img={require('../../assets/images/lab.png')} action={() => navigation.navigate('lab_results')} />
                        </View>
                    </View>
            </KeyboardAvoidingView>
        </ScrollView>
        </>
        )
        :
        (
            //Arabic Version
            <>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.container}>
                    <View style={styles.inline_container}>
                        <UserHeader imageIcon={require('../../assets/images/hand.png')} />
                    </View>

                        <View style={styles.sections_container}>
                            <SectionLabel label='نتائج فحوصاتي' img={require('../../assets/images/packages.png')} action={() => navigation.navigate('TestingKits')} />
                            <SectionLabel label='تفرير الصحة العامة' img={require('../../assets/images/wellness.png')} action={() => navigation.navigate('WellnessSpace')} />
                            <SectionLabel label='الفحوصات الاخرى' img={require('../../assets/images/lab.png')} action={() => navigation.navigate('lab_results')} />
                        </View>
                    </View>
            </KeyboardAvoidingView>
        </ScrollView>
            </>
        ) }
        </>)
        }
        </>
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

})
