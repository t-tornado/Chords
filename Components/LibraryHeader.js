import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'
import { Colors } from '../assets/colors';
import { eighteen, twenty } from '../Config/Dimensions';


const { height, width } = Dimensions.get("window");
const HEADER_H = height * 0.05;
const HEADER_W = width;

const DownloadHeader = () => {
    let { headerBar, headerCover } = styles;
 
    return (
      <View style={headerBar} >
        <View style={headerCover}>
          <Text style={{ color: Colors.library_Header, fontSize: eighteen }}> Library</Text>
        </View>
      </View>
    );
  };
  

  const styles = StyleSheet.create({
    headerBar: {
        height: HEADER_H,
        width: HEADER_W,
        backgroundColor: "transparent",
        marginBottom: HEADER_H * 0.35,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      },
    
      headerCover: {
        height: HEADER_H,
        width: width * 0.4,
        backgroundColor: "#353535",
        borderRadius: width * 0.07,
        justifyContent: "center",
        alignItems: "center",
      },
  })

export default DownloadHeader