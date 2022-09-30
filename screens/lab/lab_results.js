import React, {  useEffect,useState,useCallback  } from 'react'
import { StyleSheet, Text,Linking,View, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native'
import { colors } from '../../common/colors';
import SectionHeader from '../../common/SectionHeader';
import SpecialText from '../../common/SpecialText';
import CustomNavHeader from '../../components/CustomNavHeader';
import {useSelector,useDispatch} from 'react-redux';
import {getLab} from '../../statemanagement/actions/lab';
import ResultCard from '../../components/ResultCard';


const LabResults = ({ navigation }) => {
    const { token, username } = useSelector(state => state.loginReducer);
    const {language} = useSelector(state => state.GeneralReducer);
    const { labs_loaded, labs,worksheets,results} = useSelector(state => state.LabReducer);

    const HandleClick = (item) =>{
        navigation.navigate('result',{
            date: {item}
        });
    }


    const Documents = (b) =>{
        const result = [];

        for(var k in worksheets) {
            if(b == worksheets[k].date){
                result.push(worksheets[k].url)
            }
         }
        return result;

    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLab(token,username));
    }, []);

    return (
        <>
          
            <CustomNavHeader goBack={() => navigation.goBack()} />
            {!labs_loaded  ?
                     (  
                        <View style={[styles.container_loader, styles.horizontal]}>
                             <ActivityIndicator />
                           </View>
                       ):
                <>
                 {Object.keys(labs).length > 0 ?
                    
                <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}   >
                    <KeyboardAvoidingView behavior='position'>
                        <SectionHeader label='Your Results' img={require('../../assets/images/lab.png')} />
                        <View style={styles.container}>
                            <View style={styles.inline_container}>
                                {Object.keys(results).map(item =>(
                                    <>
                                        <ResultCard key={item} urls={Documents(item)} item={item} btnAction={() => HandleClick(item)} btnTitle={"show Results"}></ResultCard>
                                    </>
                                ))}
                            </View>

                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                 :
                <View style={styles.error_container}>
                    <Image source={require('../../assets/images/nofiles.png')} style={{
                        marginVertical: 30, width: 300,
                        height: 300
                    }} />
                    <SpecialText text='no registerd visits for any of our labs ' size={20} color={colors.main_color} />
                </View>
                }
                </>
                }
        </>
    )
}

export default LabResults

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inline_container: {
        flex: 1
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
        flex:1,
    },
})
