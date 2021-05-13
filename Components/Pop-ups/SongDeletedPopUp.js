import React from "react";
import { Modal, StyleSheet, View, Text, Dimensions,Animated, StatusBar } from "react-native";
import {width_numbers} from '../../Config/Dimensions'
import { useCardOptionState } from "../../Context/openCardoptions";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const { width, height } = Dimensions.get("window");
const POUPuP_WIDTH = width * 0.7;
const POPUP_HEIGHT = height * 0.05;
const TRANSLATE_X = width * 0.15
const TRANSLATE_Y = StatusBar.currentHeight 

const {ValueXY} = Animated
const config = {
    useNativeDriver: true,
    bounciness: 5
}

const SongDeletedPopUp = () => {
  let { container, popup } = styles;
const openCardOptionsState = useCardOptionState()

  const translateY = React.useRef(new ValueXY({x:TRANSLATE_X,y:0})).current
  const translation = Animated.spring(translateY, {
    ...config,
    toValue: {x:TRANSLATE_X, y: TRANSLATE_Y}
  } )

openCardOptionsState && translation.start()


if(!openCardOptionsState) return <View />

  return (
    <Animated.View style={[translateY.getTranslateTransform(),{
        flex:1, 
        position: 'absolute', 
        
    }]} >
      <View style={container}>
        <View style={popup}>
          <MaterialIcons name='delete-outline' color='red' size={20} style={{paddingHorizontal: 5}} />
          <Text
            style={{
              color: '#5488d1',
              fontSize: width_numbers[13],
            }}
          >
            Song deleted successfully
          </Text>
        </View>
      </View>
      </Animated.View>
    // </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: POPUP_HEIGHT ,
    width: POUPuP_WIDTH,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  popup: {
    width: POUPuP_WIDTH,
    height: POPUP_HEIGHT,
    borderRadius: POUPuP_WIDTH / 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    backgroundColor: '#353535',
  },
});

export default SongDeletedPopUp;
