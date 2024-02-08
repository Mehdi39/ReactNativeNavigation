import { StyleSheet, View } from "react-native";
import React from 'react';
import Dot from './Dot';

const Pagination = ({ data, buttonVal }) => {
    return (
        <View style={styles.paginationContainer}>
            {
                data.map((_, index) => {
                    return <Dot index={index} buttonVal={buttonVal} key={index}/>
                })
            }
        </View>
    )
}

export default Pagination;

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 70,
    }
})