import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

export function DumyChristmasAnthemScreen(){
  return(
    <View style={{
      flex:1,
      justifyContent: "center", 
      alignItems: 'center'
    }} >
      <Text style={{
        fontSize: 15,
        color: '#ffffff80'
      }} >Christmas anthems Screen</Text>
    </View>
  )
}