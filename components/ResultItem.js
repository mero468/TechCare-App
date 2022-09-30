import React, { useState,useEffect,useRef} from 'react'
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import { colors } from '../common/colors'
import { Card, Button } from 'react-native-elements';
import { Slider, Icon,Dialog} from '@rneui/themed';
import {useSelector,useDispatch} from 'react-redux';
import {getResultNoramlRange} from '../statemanagement/actions/lab'
import { LinearGradient } from 'expo-linear-gradient';
//نتائج الفحوصات لكل تاريخ

const ResultItem = ({ date, name, id, result,description_en, isOutOfRange }) => {
    const {token,username} = useSelector(state => state.loginReducer);
    const { normal_objects} = useSelector(state => state.LabReducer);

    const [visible, setVisible] = useState(false);
    //Get Normal Range of each Test
    const dispatch = useDispatch();
    const [details,setDetails] = useState({});

    const toggleDialog = () => {
        setVisible(!visible);
    };
    const getDetails = () =>{
        for (let i = 0; i < normal_objects.length; i++) {
            const element = normal_objects[i];
            if(Object.keys(element)[0] == id){
             
                return element[id];
            }
            
        }
    }
    return (
        <>
            <View style={{ marginBottom: 10 }}>

                <Card>
                    <Card.Title style={styles.nameStyle}>
                        <TouchableOpacity>
                        <Icon
                            name="info"
                            type="antdesign"
                            size={15}
                            reverse
                            containerStyle={{ top: 20 }}
                            color={colors.secondary_color}
                            onPress={toggleDialog}
                            style={{marginRight:20}}
                        />
                        </TouchableOpacity>
                        <Text>{name}</Text>

                        </Card.Title>
                    <Card.Divider color='#000' />
                        <View  >
  
                                    <Slider
                                            value={5}
                                            maximumValue={10}
                                            minimumValue={0}
                                            step={1}
                                            disabled={true}
                                            style={{backgroundColor:"#632"}}
                                            trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                                            thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                                            thumbProps={{
                                            children: (
                                                <Icon
                                                name="heartbeat"
                                                type="font-awesome"
                                                size={12}
                                                reverse
                                                containerStyle={{ bottom: 12, right: 12 }}
                                                color={colors.secondary_color}
                                                />
                                            ),
                                            }}/>
                        </View>
                    <Card containerStyle ={styles.resultvaluecard}>
                        {/* {/* <View> </View> */}
                        <View style ={styles.row} >
                        <Text  style={styles.resultvaluetext}> {result}</Text>
                        <Text style={styles.resultnormaltext}> Result is </Text>
                        <Text style={styles.resultvaluetext}> Normal</Text>
                        <Icon
                            name="arrowup"
                            type="antdesign"
                            size={15}
                            reverse
                            color={colors.secondary_color}
                        />
                        </View>                                                                 
                    </Card>
                    <Card.Divider color='#000' />

                    <View style={{ marginVertical:15 }}>
                    <Text style={styles.nameStyle}>Interpretation of the result of the examination :</Text>
                    <Text style={styles.description}>{}</Text>
                </View>
                </Card>
            </View>
            <Dialog
                isVisible={visible}
                onBackdropPress={toggleDialog}
                >
                <Dialog.Title title={name}/>
                <Text>{description_en}</Text>
            </Dialog>
        </>
    )
}

export default ResultItem

const styles = StyleSheet.create({
    resultvaluecard:{
        borderRadius:10,
        borderColor:colors.secondary_color,
        flex: 1,
        justifyContent: 'center',
        marginBottom:20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    resultnormaltext: {
        flexDirection: 'row',
        alignItems: 'center',
        color:colors.secondary_color
    },
    resultvaluetext: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:5,
        paddingRight: 30,
        color:'#000',
        fontWeight:'bold'

    },
    description:{
        textAlign:'justify',
    },
    nameStyle: {
        fontSize: 22,
        color: '#000',
        alignSelf:'flex-start'
    }

})
