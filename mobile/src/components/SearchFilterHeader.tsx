import React, { useContext } from 'react'
import { TextInput, Text, StyleSheet, View} from 'react-native'
import { FiltersContext } from '../contexts/FiltersContext'
import { Ionicons } from '@expo/vector-icons';

export const SearchFilterHeader = () => {

    const {searchText, setSearchText } = useContext(FiltersContext);
  return (
    <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={setSearchText} value={searchText}></TextInput>
        <Ionicons style={styles.icon} name={'search'} color={"black"} size={32}/>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
      width: '95%',
      borderRadius: 10,
      marginTop:0,
      borderWidth: 1,
      padding: 10,
    },

    icon: {
        position:'absolute',
        right:20,
        alignSelf: 'center',
    },

    container: {
        alignItems: 'center',
        display:'flex',
        flexDirection:'row',
        maxWidth:'90%',
        marginBottom:20,
    }
  });
  
