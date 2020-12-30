import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import { five, ninety_five, ten, three, twenty_five } from '../../Config/Dimensions'
import {usePlayerMode, useSetPlayerOffline, useSetPlayerOnline} from '../../Context/TarckContext'
import DetectNavbar from 'react-native-detect-navbar-android'
import ExtraDimensions from 'react-native-extra-dimensions-android'
import {
    AntDesign,
    Feather ,
    MaterialIcons 
} from 'react-native-vector-icons'
import { Colors } from '../../assets/colors'
const {height,width} = Dimensions.get('window')



const StartUp = () => {
let {
    container,
    selection
} = styles
const playerMode = usePlayerMode()
const [viewHeight, setViewHeight] = React.useState()
const setOnline = useSetPlayerOnline() 
const setOffline = useSetPlayerOffline()
React.useEffect(()=>{
    let clean = true
    DetectNavbar.hasSoftKeys().then(bool => {
        if(bool){
          setViewHeight(height)
        }
        if(!bool){
          const VIEW_H = ExtraDimensions.getRealWindowHeight() -ExtraDimensions.getSmartBarHeight()
          setViewHeight(VIEW_H)
        }
      })

    return () => clean = false
},[])

return (
    <View style={[container,{height: viewHeight}]} >
        <View style={styles.bar} >
            <TouchableOpacity style={{ 
                height: 20, 
                flexDirection: 'row', 
                // backgroundColor: 'transparent',
                alignItems: 'center'
            }} onPress={()=> {
                setOnline()
            }} 
            activeOpacity={0.8}
            >
                <Text style={{color: '#ffffff90', paddingRight: ten}} > Browse Online</Text>
                <AntDesign   name='wifi' size={15} color='#fc8621' />
            </TouchableOpacity>
            <View style={{
                width: 1,
                height: height * 0.03,
                backgroundColor: '#efeada'
            }} />
            <TouchableOpacity style={{ 
                height: 20,
                flexDirection: 'row', 
                alignItems: 'center'          
            }}  onPress={()=> {
                setOffline()
            }}
            activeOpacity={0.8}
            >
            <Text style={{color: '#ffffff90',paddingRight: ten}}>Offline Library</Text>
            <MaterialIcons name='library-music' color={Colors.active_top_tab} size={15} />
            </TouchableOpacity >
 <StatusBar barStyle='light-content' backgroundColor='#000000' />
 </View>
        </View>
)
}

const styles = StyleSheet.create({
    bar:{
        width: width * 0.8,
        height: height * 0.05,
        borderRadius: ten,
        backgroundColor: '#ffffff10',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        bottom: ninety_five   

    },
    container: {
        backgroundColor:'#000000',
        alignItems: 'center',
        width: width,
        justifyContent:'flex-end'
    },
    selection: {
        backgroundColor: '#353535',
        height: height * 0.07,
        width: width * 0.375,
        marginVertical: twenty_five,
        justifyContent: 'center',
        alignItems: 'center',

    },
    
})

export default StartUp