import React from 'react'
import { View } from 'react-native'


export function CustomIcon({size, color}){
    return (
        <View style={{backgroundColor: color, height: size, width: size, borderRadius:size/2}} />
    )
}