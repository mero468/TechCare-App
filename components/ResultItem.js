import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../common/colors'


const ResultItem = ({ name, id, result, isOutOfRange }) => {
    return (
        <>
            <View style={{ marginBottom: 10 }}>
                <View style={{ marginLeft: 25, marginBottom: 15 }}>
                    <Text style={styles.nameStyle}>{name}</Text>
                </View>

                <View style={{ ...styles.resultDataContainer, backgroundColor: isOutOfRange ? '#FF0000' : colors.secondary_color }}>

                    <View style={styles.resultRow}>
                        <View style={styles.resultHeaderItem}>
                            <Text style={styles.resultHeaderText}>ID</Text>
                        </View>

                        <View style={styles.resultHeaderItem}>
                            <Text style={styles.resultHeaderText}>Result</Text>
                        </View>
                    </View>

                    <View style={styles.resultRow}>
                        <View style={styles.resultBodyItem}>
                            <Text style={styles.resultBodyText}>{id.trim()}</Text>
                        </View>
                        <View style={styles.resultBodyItem}>
                            <Text style={styles.resultBodyText}>{result.trim()}</Text>
                        </View>
                    </View>

                </View>

            </View>
        </>
    )
}

export default ResultItem

const styles = StyleSheet.create({
    nameStyle: { fontSize: 22, color: '#000' },
    resultDataContainer: {
        borderRadius: 20,
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 20,
        marginBottom: 10
    },
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    resultHeaderItem: {
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderBottomWidth: 2
    },
    resultBodyItem: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    resultHeaderText: {
        fontSize: 21,
        color: '#fff'
    },
    resultBodyText: {
        fontSize: 21,
        color: '#000'
    },
})
