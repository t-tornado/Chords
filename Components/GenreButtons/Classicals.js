import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import {Colors} from '../../assets/colors'
import { three } from '../../Config/Dimensions';

 
const { height, width } = Dimensions.get("window");
const ClassicalsButtons = (props) => {
    let {bar, barText} = styles
      return (
          <TouchableOpacity style={[bar, {
            backgroundColor: props.focused ?  Colors.active_top_tab : Colors.non_active_top_tab
          }]} onPress={()=> {
            props.navigation.navigate('hymns')
          }} >
            <Text style={[barText, {
              color: props.focused ? Colors.active_top_tab_text : Colors.non_active_top_text
             }]} >Classicals</Text>
          </TouchableOpacity>
      )
    }

const styles = StyleSheet.create({
    bar: {
        width: width * 0.20,
        height: height * 0.045,
        borderRadius: (width *0.25) / 3,
        justifyContent: 'center',
         alignItems: 'center', 
          borderWidth: three,
         borderColor: Colors.top_tabbar_border
      },
      barText: {
        color: 'black',
        fontSize: 13
      },
})

export default ClassicalsButtons