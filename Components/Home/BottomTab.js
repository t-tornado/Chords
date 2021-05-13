import React from 'react';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
//Screens for bottom tab
import MainBrowseComponent from '../../Components/Browse/MainBrowseComponent';
import SearchScreen from '../../Screens/HomeButtonTabs/SearchScreen';
import MyCollectionScreen from '../../Screens/HomeButtonTabs/MyCollectionScreen'
//icons
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

import {HOME_BOTTOM_TABBAR_HEIGHT, width_numbers, } from '../../Config/Dimensions'
import { home_tab_colors } from '../../Config/Colors';


const BottomTabs = createBottomTabNavigator(
  {
    browse: {
      screen: MainBrowseComponent,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          return (             
            <Feather
              name="music"
              size={width_numbers[20]}
              color={
                focused
                  ? home_tab_colors.active_icon
                  : home_tab_colors.non_active_icon
              }
            />
          );
        },
      },
    },
    search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          return (
            <Ionicons
              name="ios-search"
              size={width_numbers[20]}
              color={
                focused
                  ? home_tab_colors.active_icon
                  : home_tab_colors.non_active_icon
              }
            />
          );
        },
      },
    },
    list: {
      screen: MyCollectionScreen,
      navigationOptions: {
        title: 'my collection',
        tabBarIcon: ({focused}) => {
          return (
            <Entypo
              name="folder-music"
              size={width_numbers[20]}
              color={
                focused
                  ? home_tab_colors.active_icon
                  : home_tab_colors.non_active_icon
              }
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: home_tab_colors.active_text,
      inactiveTintColor: home_tab_colors.non_active_text,
      style: {
        backgroundColor: home_tab_colors.bottom_navbar,
        height: HOME_BOTTOM_TABBAR_HEIGHT,
        justifyContent: 'center',
        paddingBottom: width_numbers[4],        
      },
    },
  },
);

export const BottomTabContainer = createAppContainer(BottomTabs);
