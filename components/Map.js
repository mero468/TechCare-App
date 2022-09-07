import { StyleSheet, Text, View, Alert, Platform } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { CartContext } from '../context/cart_context';



const Map = () => {
    const [latitude, setLatitude] = useState(31.9539)
    const [longitude, setLongitude] = useState(35.9106)
    const [coordinates, setoordinates] = useState([])

    const {
        locationLatitude,
        setLocationLatitude,
        locationLongitude,
        setLocationLongitude
    } = useContext(CartContext);

    useEffect(() => {

        setLocationLatitude(latitude)
        setLocationLongitude(longitude)

    }, [coordinates])

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            collapsable={true}
        >
            <Marker
                draggable
                coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                }}
                onDragEnd={(e) => {
                    setoordinates(coordinates.concat({
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude
                    }))
                    setLatitude(e.nativeEvent.coordinate.latitude)
                    setLongitude(e.nativeEvent.coordinate.longitude)
                }}
            />
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    mapContainer: {
        marginLeft: 4,
        width: '100%',
        height: '93%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
    },
    map: {
        height: '100%',
        width: '100%',
    }
})