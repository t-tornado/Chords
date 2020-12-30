import React from 'react'
import {StyleSheet,View,Dimensions} from 'react-native'

const {height, width} = Dimensions.get('window')
const FOOTER_HEIGHT = height * 0.17;

const Footer = () =>{
    let {footer} = styles
    
      return (
        <View style={footer} />
          
      )
    }

    const styles = StyleSheet.create({
            footer:{
              width: width,
              height: FOOTER_HEIGHT,
            },
    })
     
export default React.memo(Footer)