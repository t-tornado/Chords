import React from "react";
import { StyleSheet, View, Text, Dimensions, StatusBar } from "react-native";
import { SimpleLineIcons,Foundation, Ionicons, MaterialIcons,MaterialCommunityIcons } from "react-native-vector-icons";

import { createAppContainer } from "react-navigation";
import { enableScreens } from "react-native-screens";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Search from "./SearchOffline";
// import Search from '../../Screens/Search'
import PlayList from './playlist'
import {useLoadFromDir} from '../../Context/TarckContext'
import {createMusicDirectory} from '../../Redux/actions/DownloadAction'
import {Colors} from '../../assets/colors'
import { twenty_five } from "../../Config/Dimensions";
enableScreens(); 

const { height, width } = Dimensions.get("window");
const TABBAR_H = height * 0.08;

const HomeTabs = createBottomTabNavigator(
  {
    playlist: {
      screen: PlayList,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          return (
            <MaterialCommunityIcons name="playlist-music" size={twenty_five} color={focused? Colors.bottom_tab_active_icon : Colors.bottom_tab_non_active_icon } />
          );
        },
      },
    },
    search: {
        screen: Search,
        // screen:Library,
        navigationOptions: {
          tabBarIcon: ({focused}) => {
            return <Ionicons name="ios-search" size={twenty_five}  color={focused? Colors.bottom_tab_active_icon : Colors.bottom_tab_non_active_icon }/>;
          },
        },
      },
    
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.bottom_tab_active_icon,
      inactiveTintColor: Colors.bottom_tab_non_active_icon,
      style: {
        backgroundColor: Colors.bottom_tabbar,
        height: TABBAR_H,
        justifyContent: "center",
      },
    }, 
  }
);

const AppContainer = createAppContainer(HomeTabs);

const Home = () => {
  let { container } = styles;
const loadFromDir = useLoadFromDir()
React.useEffect(()=> {
  let cleanUp = true
if(cleanUp){
  createMusicDirectory()
loadFromDir()
}

return () => cleanUp = false 
},[])

  return (
    <View style={[container]}>
      <AppContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1  
  },
});

export default Home;
