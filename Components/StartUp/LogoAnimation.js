import React, {useRef} from 'react'
import {
    StyleSheet,
    Dimensions
} from 'react-native'
import Animated from 'react-native-reanimated'
import {
    clamp,
    timing,
    withSpring,
  } from "react-native-redash/lib/module/v1";

const {height, width} = Dimensions.get('window')
const WIDTH = width * 0.35
const HEIGHT = height * 0.15
const BUTTOM_SCALE = 1
const UPPER_SCALE = 3
const {Value,Clock, clockRunning,cond, not,set,block,useCode,interpolate,Extrapolate} = Animated
const config = {
    damping: 13,
    restDisplacementThreshold: 0.1,
    restSpeendThreshold: 0.1,
    overshootingClamping: false,
    mass: 1,
  };
  

const LogoAnimation = () =>{ 
const bounce = useRef(new Value(0)).current
const goUp = useRef( new Value(0)).current
const goDown = useRef( new Value(0)).current
const offset = useRef( new Value(0)).current
const velocity = useRef(new Value(0)).current
const state = useRef(new Value(0)).current
const [normal, setNormal] = React.useState(false)
// const [scaleActive, setScaleActive] = React.useState(false)
// const animScale = interpolate(bounce, {
//     inputRange: [0,1,2],
//     outputRange: [1,2,3],
//     extrapolate: Extrapolate.CLAMP
// })

const scale = clamp(
    withSpring({
      state,
      value: bounce,
      offset,
      velocity: velocity,
      snapPoints: [BUTTOM_SCALE, UPPER_SCALE],
      config,
    }),
    BUTTOM_SCALE,
    UPPER_SCALE
  );

const activeFunc = () => {
  goUp.setValue(1)
  setNormal(true)
  return Promise.resolve(true)
}

const normalFunc = () => {
    goDown.setValue(1)
    setNormal(false)
}

// React.useEffect(()=> {
//   let clean = true

//     if(clean && !normal){
//     setInterval(() => {
//       activeFunc().then(bool => {
//         if(bool){
//           normalFunc()
//         }
//       })
//       // clearInterval(myTimer)
//     }, 1000);
//     }
// return () => {
//   clean=false
  
// }
// },[normal])


const clock = new Clock();
useCode(()=>
  block([
    cond(goUp, [
      set(
        bounce,
        timing({ clock, duration: 500, from: 0, to: 2 })
      ),
      cond(not(clockRunning(clock)), set(goUp, 0)),
    ]),
  ]),
  []
);

useCode(()=>
block([
  cond(goDown, [
    set(
      bounce,
      timing({ clock, duration: 500, from: 2, to: 0 })
    ),
    cond(not(clockRunning(clock)), set(goDown, 0)),
  ]),
]),
[]
);


    return (
        <Animated.View style={[styles.container,{transform: [{scale}]}]} >
            <Animated.Image 
            source={require('../../assets/alternate_image.jpg')}
            style={styles.image}
            />

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'        
    },
    image: {
        height: HEIGHT,
        width: WIDTH,
        resizeMode: 'cover',
        backgroundColor: 'tomato'
    }
})

export default LogoAnimation