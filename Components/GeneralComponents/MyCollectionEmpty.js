import React from 'react'
import {View, Text, Dimensions} from 'react-native'
import {AntDesign} from 'react-native-vector-icons'

const {height, width} = Dimensions.get('window')

export const MyCollectionEmpty = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: height * 0.7,
          width: width,
        }}
      >
        {/* <AntDesign name="clouddownload" size={50} color='#ffffff' /> */}
        <Text
          style={{
            color: "#ffffff95",
            fontSize: 20,
          }}
        >
          Your downloads is empty
        </Text>
      </View>
    );
  };