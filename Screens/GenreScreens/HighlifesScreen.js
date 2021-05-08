import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

export function DumyHighlifesScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text
        style={{
          fontSize: 15,
          color: '#ffffff80',
        }}>
        Highlifes Screen
      </Text>
    </View>
  );
}
