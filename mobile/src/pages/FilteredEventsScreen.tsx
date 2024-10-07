import React, { useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { EventsContext } from '../contexts/EventsContext'
import { ListedEvents } from '../components/ListedEvents';
import { Background } from '../components/Background';
import { FiltersHeader } from '../components/FiltersHeader';
import { SearchFilterHeader } from '../components/SearchFilterHeader';

export const FilteredEventsScreen = () => {
  const {searchedEvents} = useContext(EventsContext);

  return (
    <>
      <Background/>
      <SafeAreaView/>
      <FiltersHeader showText={false}/>
      <SearchFilterHeader/>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListedEvents events={searchedEvents}/>
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width:'92%',
    justifyContent:'center',
    maxHeight:'70%',
    flex: 1
  }
});