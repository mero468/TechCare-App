import { StyleSheet, Text, View, ScrollView, Image, FlatList, Dimensions, Modal, Pressable } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import SectionHeader from '../../common/SectionHeader';
import { colors } from '../../common/colors';
import { showMessage, hideMessage } from 'react-native-flash-message';
import CustomCard from '../../components/CustomCard';
import CustomNavHeader from '../../components/CustomNavHeader';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Fontisto';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';


const sc_width = Dimensions.get('screen').width;



const WellnessSpace = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [DATA, setDATA] = useState([])
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [eventConfig, setEventConfig] = useState({})
    const [activityInfo, setActivityInfo] = useState({})


    const addToCalendar = () => {
        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
            .then((eventInfo) => {
                console.log(JSON.stringify(eventInfo));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getActivities = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${token}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://super-dashboard.lite.flims.co/techCare/activity/", requestOptions)
            .then(response => response.json())
            .then(result => {
                setDATA(result)
            })
            .catch(error => console.log('error', error));
    }

    const openModal = (item) => {
        setActivityInfo({
            id: item.id,
            title: item.title,
            notes: item.description,
        })
        setModalVisible(true);

    }

    const utcDateToString = momentInUTC => {
        let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        return s;
    };

    const requestActivity = async (id, time) => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Token d3bff2a7928ad38a7a55f07693d0654113d6a38c");
        console.log(id, time)

        let formdata = new FormData();
        formdata.append("activity", id);
        formdata.append("activity_time", time);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch("http://192.168.100.10:8000/techCare/activity-log/", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        getActivities();

        return () => { }
    }, [])


    return (
        <>
            <CustomNavHeader goBack={() => navigation.goBack()} />
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <SectionHeader label="Wellness Space" img={require('../../assets/images/wellness.png')} />
                </View>
                {DATA &&
                    <FlatList
                        data={DATA}
                        numColumns={2}
                        columnWrapperStyle={styles.colWrapper}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({ item }) => (
                            <View style={{ width: sc_width * 0.47 }}>
                                <CustomCard item={item} btnTitle="Let's Try It Out!" btnAction={() => openModal(item)} />
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                }
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{
                            marginHorizontal: 25,
                            alignSelf: 'flex-start'
                        }}>
                            <Text style={{
                                color: colors.main_color,
                                fontWeight: 'bold',
                                fontSize: 20
                            }}>Select Date & Time</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <DatePicker
                                open={open}
                                date={date}
                                onDateChange={(date) => {
                                    setDate(date)
                                    let event = {
                                        title: activityInfo.title,
                                        notes: activityInfo.notes,
                                        startDate: utcDateToString(date),
                                        allDay: true
                                    }
                                    setEventConfig(event)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                                mode='datetime'
                                androidVariant='nativeAndroid'
                                textColor={colors.main_color}
                                style={{ marginBottom: 10 }}
                                is24hourSource='locale'
                            />
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                requestActivity(activityInfo.id, utcDateToString(date));
                                addToCalendar();
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <Text style={styles.textStyle}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default WellnessSpace;

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
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: '35%',
        height: '50%',
        borderRadius: 50
    },
    modalView: {
        position: 'relative',
        flex: 1,
        width: '80%',
        margin: 20,
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        elevation: 5,
        paddingVertical: 30,
        borderRadius: 30
    },
    button: {
        borderRadius: 21,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: colors.main_color,
        position: 'absolute',
        bottom: 20,
        right: 30,
        paddingHorizontal: 30
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
