import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Text,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
//Screens
import HymnsScreen from "./HomeScreens/HymnsScreen";
import KelenchaScreen from './HomeScreens/Kelencha'
import AnthemsScreen from './HomeScreens/AnthemsScreen'
import ClassicalsScreen from './HomeScreens/ClassicalsScreen'
import EasterAnthemsScreen from './HomeScreens/EasterAnthems'
import ChristmasAnthemsScreen from './HomeScreens/ChristmasAntems'
import { Colors } from "../../assets/colors";
import TopTabBar from '../TopTabBar'
import ChoralBlues from "./HomeScreens/ChoralBlues";


const { height, width } = Dimensions.get("window");


const Ops = createMaterialTopTabNavigator(
  {
    anthems: {
      screen: AnthemsScreen,
      params: {
        title: 'Anthems'
      }
    },
    christmasAnthems: {
      screen: ChristmasAnthemsScreen,
      params: {
        title: 'Christmas Anthems'
      }
    },
   
    easterAnthems: {
      screen: EasterAnthemsScreen,  
      params: {
        title: 'Easter Anthems'
      }
    },
    classical: {
      screen:ClassicalsScreen,
      params: {
        title: 'Classical Music'
      }
    },
    kelencha: {
      screen: KelenchaScreen,
     params:{
       title: 'Choral Hilifes'
     }
    },
    choraBlues: {
        screen: ChoralBlues,
        params: {
          title: 'Slow Rock'
        }
    },
    hymns: {
      screen: HymnsScreen,
      params: {
        title: 'Hymns'
      }
    },
   
    
},
{
  tabBarComponent: (props) => <TopTabBar {...props} />
}
)


const Container = createAppContainer(Ops);

export default function Home1() {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.albums}>
        <Container />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  albums: {
    width: width,
    height: height,
    backgroundColor:Colors.screens_Background
  },
  
  container: {
    flex: 1,
    alignItems: "center",
  },
  
});
