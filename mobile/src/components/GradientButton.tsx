import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import * as theme from '../../theme.json'

interface IGradienButtonProps {
    text: string
    active:boolean
    onPressFunc: any
}

export const GradientButton = ({text, active, onPressFunc} : IGradienButtonProps) => {
  return (
    <View style={{flexGrow:0, flexDirection:'row'}}>
        <TouchableOpacity onPress={() => onPressFunc(text)}>
            <LinearGradient
                colors={active ? theme.gradientColors : ['#E9E9E9', '#E9E9E9', '#E9E9E9']}
                start={{x: 0, y:-.8}}
                end={{x:.4, y:1}}
                style={styles.button}
                >
                    <Text style={active ? [styles.text, styles.active] : [styles.text]}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    </View>
        
  )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 30,
        paddingVertical:13,
        borderRadius: 25,
        alignItems: 'center',
        maxWidth:'100%',
        flex:0,
        justifyContent: 'center',
    },

    text: {
        fontWeight:"700",
        color: theme.primaryTextColor
    },
    
    active: {
        color:'white',
    }
});