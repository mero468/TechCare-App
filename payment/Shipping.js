import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../common/colors';
import CustomTextInput from '../common/CustomTextInput';
import SpecialText from '../common/SpecialText';
import CircleImage from '../common/CircleImage';
import Map from '../components/Map';

const Shipping = ({
    zipCode = '',
    setZipCode,
    shippingName = '',
    setShippingName,
    address = '',
    setAddress,
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ marginVertical: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <CircleImage letter="2" width={40} height={40} letter_size={18} />
                    <SpecialText text='SHIPPING INFORMATIONS' color={colors.main_color} size={22} />
                </View>
                <View style={[styles.inputContainer]}>
                    <CustomTextInput placeholder='shipping name' value={shippingName} style={{ marginVertical: 5 }} setValue={setShippingName} />
                    <Pressable onPress={() => setModalVisible(true)} style={{ width: '100%' }}>
                        <CustomTextInput value='set your location' style={{ marginVertical: 5 }} disabled={false} is_location={true} />
                    </Pressable>
                    <CustomTextInput placeholder='zip code' value={zipCode} style={{ marginVertical: 5 }} setValue={setZipCode} />
                </View>
            </View>
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
                        <Map />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close Map</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default Shipping

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        height: '100%',
    },
    modalView: {
        position: 'relative',
        flex: 1,
        width: '95%',
        height: '100%',
        margin: 20,
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        elevation: 5
    },
    button: {
        borderRadius: 20,
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
})