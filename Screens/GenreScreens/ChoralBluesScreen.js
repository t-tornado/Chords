import React from 'react'
import {View, Text} from 'react-native'

export function DummyChoralBluesScreen(){
  return(
    <View style={{
      flex:1,
      justifyContent: "center",
      alignItems:'center'
    }} >
      <Text style={{
        fontSize: 15,
        color: '#ffffff80'
      }} >ChoralBlues Screen</Text>
    </View>
  )
}