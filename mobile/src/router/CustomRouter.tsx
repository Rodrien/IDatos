import React from 'react'
import {Route , NativeRouter, Routes} from 'react-router-native';
import { ListScreen } from '../pages/ListScreen';
import { MapScreen } from '../pages/MapScreen';
import { Menu } from '../components/Menu';
import { FilteredEventsScreen } from '../pages/FilteredEventsScreen';
import { EventDetailScreen } from '../pages/EventDetailScreen';

export const CustomRouter = () => {
    return (
      <NativeRouter>
          <Routes>
              <Route path="/" element={<ListScreen />} />
              <Route path='/map' element={<MapScreen/>} />
              <Route path='/search' element={<FilteredEventsScreen/>} />
              <Route path='/eventDetail' element={<EventDetailScreen/>}  />
          </Routes>
        <Menu/>
      </NativeRouter>
    )
}