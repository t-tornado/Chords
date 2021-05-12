import React from 'react'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import TopTabBarComponent from './TopTabBarComponent'
//Screens
import AnthemsScreen from '../../Screens/GenreScreens/AnthemsScreen'
import ChristmasAnthemsScreen from '../../Screens/GenreScreens/ChristmasAnthemsScreen'
import EasterAnthemsScreen from '../../Screens/GenreScreens/EasterAnthemsScreen'
import ClassicalsScreen from '../../Screens/GenreScreens/ClassicalsScreen'
import HighlifesScreen from '../../Screens/GenreScreens/HighlifesScreen'
import HymnsScreen from '../../Screens/GenreScreens/HymnsScreen'
import ChoralBluesScreen from  '../../Screens/GenreScreens/ChoralBluesScreen'

const BrowseNavigationComponent = createMaterialTopTabNavigator(
    { 
      anthems: {
        screen: AnthemsScreen,
        params: {
          title: "Anthems",
        },
      },
      christmasAnthems: {
        screen: ChristmasAnthemsScreen,
        params: {
          title: "Christmas Anthems",
        },
      },
  
      easterAnthems: {
        screen: EasterAnthemsScreen,
        params: {
          title: "Easter Anthems",
        },
      },
      classical: {
        screen: ClassicalsScreen,
        params: {
          title: "Classical Music",
        },
      },
      kelencha: {
        screen: HighlifesScreen,
        params: {
          title: "Choral Hilifes",
        },
      },
      choraBlues: {
        screen: ChoralBluesScreen,
        params: {
          title: "Slow Rock",
        },
      },
      hymns: {
        screen: HymnsScreen,
        params: {
          title: "Hymns",
        },
      },
    },
    {
      tabBarComponent: (props) => <TopTabBarComponent {...props} />,
    }
  );
  
export const BrowseNavigationContainer = createAppContainer(BrowseNavigationComponent);
  