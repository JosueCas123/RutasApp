import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface Props{
    title:string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>
}

export const BlackButton = ({  title, onPress, style = {} }:Props) => {
  return (
    <TouchableOpacity
        onPress={onPress}
       activeOpacity={0.4}
       style={{
        ...style as any,
        ...styles.blachButton
       }}
    >

        <Text style={styles.textButton} >{title}</Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    blachButton:{
        backgroundColor:'black',
        width:200,
        height:45,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
    },
    textButton:{
        color:'white',
        fontSize:18
    }
});