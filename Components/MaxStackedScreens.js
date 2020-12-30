import React from 'react'
import { View } from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Player from '../Screens/Player'

const Queue = () => {
    return (
        <View 
        style={{
            justifyContent: 'center',
            alignItems: 'center'
        }} >
            <Text>QUEUE SCREEN</Text>
        </View>
    )
}

const PlayerStack = createStackNavigator(
    {
        home: Player,
        queue: Queue
    },
    {
        headerMode: 'none'
    }
)
const PlayerApp = createAppContainer(PlayerStack)

const StackedPlayer= () => {
    return (
        <>
    <PlayerApp />
        </>
    )
}

export default StackedPlayer


// import React from 'react';
// import { View, Text } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

// const  HomeScreen = () => {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//       </View>
//     );
// }

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//   },
// });

// export default createAppContainer(AppNavigator);