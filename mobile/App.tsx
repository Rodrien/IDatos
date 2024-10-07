import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MapScreen } from './src/pages/MapScreen';
import { ListedEvents } from './src/components/ListedEvents';
import { ListScreen } from './src/pages/ListScreen';
import { Menu } from './src/components/Menu';
import { CustomRouter } from './src/router/CustomRouter';
import { Background } from './src/components/Background';
import { LocationProvider } from './src/contexts/LocationContext';
import { EventsProvider } from './src/contexts/EventsContext';
import { FiltersProvider } from './src/contexts/FiltersContext';

export default function App() {

  return (
    <LocationProvider>
    <FiltersProvider>
    <EventsProvider>
      <StatusBar style='dark'></StatusBar>
      <View style={styles.container}>
        <CustomRouter/>  
      </View>
    </EventsProvider>
    </FiltersProvider>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
