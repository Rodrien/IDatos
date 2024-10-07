import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GradientButton } from './GradientButton'
import * as theme from '../../theme.json'
import { FiltersContext } from '../contexts/FiltersContext'

interface IFiltersHeaderProps {
    showText:boolean,
}

export const FiltersHeader = ({showText} : IFiltersHeaderProps) => {

    const { categories, activeCategory, setActiveCategory } = useContext(FiltersContext);

    const getButtonContainerStylesByIndexindex = (index: number) => {
        if (index == 0) {
            return [styles.firstButtonContainer, styles.buttonContainer]
        }
        else if (index == categories.length - 1) {
            return [styles.lastButtonContainer, styles.buttonContainer]
        }
        else 
            return styles.buttonContainer;
    }

    return (
    <View style={showText ? styles.container : styles.containerReduced}>
        {showText && <Text style={styles.header}>Próximos eventos cerca de ti</Text>}
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {categories.map((name, index) => {
                return (
                    <View key={name} style={getButtonContainerStylesByIndexindex(index)}>
                        <GradientButton text={name} active={name.toLowerCase()==activeCategory.toLowerCase()} onPressFunc={() => setActiveCategory(name.toLowerCase())}/>
                    </View>
                )
            })}
        </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        height:115,
        marginTop:20,
    },

    containerReduced: {
        height:65,
        marginTop:20,
    },

    header: {
        fontSize: 20,
        fontWeight:"800",
        textAlign:'center',
        marginBottom:30,
        color: theme.primaryTextColor,
    },



    buttonContainer: {
        marginRight:5
    },

    firstButtonContainer: {
        marginLeft:'1.5%'
    },

    lastButtonContainer: {
        width:180,
        marginRight: 100,
    }
});