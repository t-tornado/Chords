import React from "react";
import { StyleSheet, View, Text, Dimensions, Animated, StatusBar } from "react-native";

import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { width_numbers } from "../../Config/Dimensions";
import { useCardOptionState } from "../../Context/openCardoptions";

const { width, height } = Dimensions.get("window");
const {ValueXY} = Animated

const POUPuP_WIDTH = width * 0.6;
const POPUP_HEIGHT = height * 0.05;
const TRANSLATE_X = width * 0.15
const TRANSLATE_Y = StatusBar.currentHeight 

const config = {
    useNativeDriver: true,
    bounciness: 5
}

const Failed = () => {
    return (
      <>
        <Ionicons
          name="md-heart-dislike"
          size={width_numbers[17]}
          color='red'
          style={{paddingRight: 5}}
        />
        <Text
          style={{
            color: '#ffffff90',
            fontSize: width_numbers[15],
          }}
        >
          Unable to like song
        </Text>
      </>
    );
  };


  const Success = () => {
    return (
      <>
        <AntDesign
          name="like1"
          size={width_numbers[17]}
          color='red'
          style={{paddingRight: 5}}
        />
        <Text
          style={{
            color: '#ffffff90',
            fontSize: width_numbers[15],
          }}
        >
          You have liked the song
        </Text>
      </>
    );
  };


const LikeSongPopUp = () => {
const [likeState, setLikeState] = React.useState(true)
const openCardOptionState = useCardOptionState()
let { container, popup } = styles;

  const translateY = React.useRef(new ValueXY({x:TRANSLATE_X,y:0})).current
  const translation = Animated.spring(translateY, {
    ...config,
    toValue: {x:TRANSLATE_X, y: TRANSLATE_Y}
  } )

  openCardOptionState && translation.start()


  if(!openCardOptionState) return <View />

  return (
    <Animated.View style={[translateY.getTranslateTransform(),{
        flex:1, 
        position: 'absolute', 
        
    }]} >
        <View style={container}>
          <View style={popup}>
            {likeState ? <Success /> : <Failed />}
          </View>
        </View>
    </Animated.View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: POUPuP_WIDTH,
    height: POPUP_HEIGHT,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
  },
  popup: {
    width: POUPuP_WIDTH,
    height: POPUP_HEIGHT,
    borderRadius: POUPuP_WIDTH / 3,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#353535',
    flexDirection: "row",
  },
});

export default LikeSongPopUp;
