import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import {
  Foundation,
  Ionicons,
  MaterialIcons,
  Feather,
  Entypo,
} from "react-native-vector-icons";
import {} from "react-native-extra-dimensions-android";

import { createAppContainer } from "react-navigation";
import { enableScreens } from "react-native-screens";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeButtonScreens from "./HomeButtonScreen";
import Search from "../Search";
import {
  useLoadDirToOnline,
  useLoadFromDir,
  resetPlayer,
} from "../../Context/TarckContext";
import {
  createMusicDirectory,
  deleteDir,
  initialLoad,
} from "../../Redux/actions/DownloadAction";
import { Colors } from "../../assets/colors";
import { twenty_five } from "../../Config/Dimensions";
import Playlist from "../CollectionPlaylist";
enableScreens();

const { height, width } = Dimensions.get("window");
const TABBAR_H = height * 0.08;

const HomeTabs = createBottomTabNavigator(
  {
    browse: {
      screen: HomeButtonScreens,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <Feather
              name="music"
              size={twenty_five}
              color={
                focused
                  ? Colors.bottom_tab_active_icon
                  : Colors.bottom_tab_non_active_icon
              }
            />
          );
        },
      },
    },
    search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <Ionicons
              name="ios-search"
              size={twenty_five}
              color={
                focused
                  ? Colors.bottom_tab_active_icon
                  : Colors.bottom_tab_non_active_icon
              }
            />
          );
        },
      },
    },
    list: {
      screen: Playlist,
      navigationOptions: {
        title: "my collection",
        tabBarIcon: ({ focused }) => {
          return (
            <Entypo
              name="folder-music"
              size={twenty_five}
              color={
                focused
                  ? Colors.bottom_tab_active_icon
                  : Colors.bottom_tab_non_active_icon
              }
            />
          );
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
  const loadFromDir = useLoadFromDir();

  React.useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      createMusicDirectory();
      resetPlayer();
      loadFromDir();
    }

    return () => (cleanUp = false);
  }, []);

  return (
    <View style={container}>
      <AppContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
