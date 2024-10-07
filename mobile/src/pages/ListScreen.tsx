import React, { useContext } from 'react'
import { ListedEvents } from '../components/ListedEvents'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Menu } from '../components/Menu'
import { FiltersHeader } from '../components/FiltersHeader'
import { Background } from '../components/Background'
import { EventsContext } from '../contexts/EventsContext'

export const ListScreen = () => {

  const {nearEvents} = useContext(EventsContext);

  return (
    <>
      <Background/>
      <SafeAreaView/>
      <FiltersHeader showText={true}/>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListedEvents events={nearEvents}/>
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