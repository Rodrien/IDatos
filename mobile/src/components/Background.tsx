import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as theme from '../../theme.json';

export const Background = () => {
    return (
        <View 
            style={{
                position: 'absolute',
                width: 1000,
                height: 1200,
                backgroundColor: theme.backgroundColor
            }} 

        >
        
        </View>
    )
}
