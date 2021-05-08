import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, Dimensions, Text } from "react-native";
//Screens
import {BrowseNavigationContainer} from './BrowseNavigation'

const { height, width } = Dimensions.get("window");

export default function MainBrowseComponent() {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        // barStyle="light-content"
      />
      <View style={styles.albums}>
        <BrowseNavigationContainer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  albums: {
    width: width,
    height: height,
    backgroundColor: 'transparent',
  },

  container: {
    flex: 1,
    alignItems: "center",
  },
});
