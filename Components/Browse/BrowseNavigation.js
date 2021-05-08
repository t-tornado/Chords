import React from 'react'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import TopTabBarComponent from './TopTabBarComponent'
//Screens
import {DummyAnthesScreen} from '../../Screens/GenreScreens/AnthemsScreen'
import {DumyChristmasAnthemScreen} from '../../Screens/GenreScreens/ChristmasAnthemsScreen'
import {DumyEasterAnthemsScreen} from '../../Screens/GenreScreens/EasterAnthemsScreen'
import {DumyClassicalsScreen} from '../../Screens/GenreScreens/ClassicalsScreen'
import {DumyHighlifesScreen} from '../../Screens/GenreScreens/HighlifesScreen'
import {DummyHymnsScreen} from '../../Screens/GenreScreens/HymnsScreen'
import {DummyChoralBluesScreen} from  '../../Screens/GenreScreens/ChoralBluesScreen'

const BrowseNavigationComponent = createMaterialTopTabNavigator(
    {
      anthems: {
        screen: DummyAnthesScreen,
        params: {
          title: "Anthems",
        },
      },
      christmasAnthems: {
        screen: DumyChristmasAnthemScreen,
        params: {
          title: "Christmas Anthems",
        },
      },
  
      easterAnthems: {
        screen: DumyEasterAnthemsScreen,
        params: {
          title: "Easter Anthems",
        },
      },
      classical: {
        screen: DumyClassicalsScreen,
        params: {
          title: "Classical Music",
        },
      },
      kelencha: {
        screen: DumyHighlifesScreen,
        params: {
          title: "Choral Hilifes",
        },
      },
      choraBlues: {
        screen: DummyChoralBluesScreen,
        params: {
          title: "Slow Rock",
        },
      },
      hymns: {
        screen: DummyHymnsScreen,
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
  