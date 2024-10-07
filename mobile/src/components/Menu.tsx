import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigate } from 'react-router-native';
import {Ionicons} from '@expo/vector-icons';
import * as theme from '../../theme.json';

export const Menu = () => {

  let navigate = useNavigate();

  interface IIconProps {
    iconName: any,
    route: string,
  }

  const itemsWithRoutes: IIconProps[] = [
    {
        iconName: "map",
        route: "/map", 
    },
    {
        iconName: "home",
        route: "/", 
    },
    {
        iconName: "search",
        route: "/search", 
    }

  ]

  const [activeMenuItem, setActiveMenuItem] = useState<IIconProps>(itemsWithRoutes[1]);

  const updateItemAndNavigate = (item: IIconProps) => {
    setActiveMenuItem(item);
    navigate(item.route);
  }

  const getButtonStyles = (item: IIconProps) => {
    return item.iconName == activeMenuItem.iconName ? [styles.item, styles.activeItem] : styles.item;
  }

  const getIconColor = (item: IIconProps) => {
    return item.iconName == activeMenuItem.iconName ? theme.activeIconColor : theme.iconColor;
  }
  
  return (
    <View style={styles.menu}>
        {
            itemsWithRoutes.map(item => {
                return (
                    <TouchableOpacity key={item.iconName} onPress={() => updateItemAndNavigate(item)} style={getButtonStyles(item)}>
                        <Ionicons name={item.iconName} color={getIconColor(item)} size={theme.menuIconSize}></Ionicons>
                    </TouchableOpacity>
                )
            })
        }
    </View>
  )
}

const styles = StyleSheet.create({
    menu: {
        position: 'absolute',
        bottom:0,
        width:'100%',
        minHeight:'10%',
        backgroundColor:'white',
        borderTopColor: 'black',
        borderTopWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    
    item: {
        backgroundColor: 'white',
        justifyContent:'center',
        paddingBottom: 10,
        alignItems:'center',
        flex:1,
        margin:0,
        padding: 0,
        borderTopColor: theme.iconColor,
        borderTopWidth: 3,
    },

    activeItem: {
        borderTopColor: 'red',
        backgroundColor: 'white'
    },
})
