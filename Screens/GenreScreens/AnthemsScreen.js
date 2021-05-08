import React, { useEffect } from "react";
import {View, Text, Dimensions } from "react-native";

import SongLoadingFailureScreen from '../ErrorScreens/SongLoadingFailureScreen'

const {height} = Dimensions.get('window')

export function DummyAnthesScreen(){
  // return(
  //   <View style={{
  //     flex:1,
  //     justifyContent: "center",
  //     alignItems: 'center'
  //   }} >
  //     <Text style={{
  //       fontSize: 15,
  //       color: '#ffffff80'
  //     }} >Anthems Screen</Text>
  //   </View>
  // )
  return (
    <>
<SongLoadingFailureScreen />
    </>
  )
}