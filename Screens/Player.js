import React, { useEffect, useRef } from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  clamp,
  onGestureEvent,
  timing,
  withSpring,
} from "react-native-redash/lib/module/v1";
import { useStoreMaxState } from "../Context/TarckContext";

import MinPlayer from "../Components/MiniPlayer";
import MaxPlayer from "../Components/MaxPlayer";
import { twenty } from "../Config/Dimensions";
const {
  Value,
  interpolate,
  Extrapolate,
  cond,
  set,
  Clock,
  not,
  useCode,
  clockRunning,
  block,
} = Animated;

const { height, width } = Dimensions.get("window");
const FULL_SCREEN = Dimensions.get("screen").height;
const TABBAR_H = height * 0.08;
const MIN_PLAYER_H = height * 0.085;
const SNAP_TOP = 0;
const config = {
  damping: 13,
  restDisplacementThreshold: 0.1,
  restSpeendThreshold: 0.1,
  overshootingClamping: false,
  mass: 1,
};

const Player = () => {
  let { container, player } = styles;
  const storeMaxState = useStoreMaxState();
  const SNAP_BOTTOM = height - MIN_PLAYER_H - TABBAR_H;

  React.useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      toSetUp();
    }
    return () => {
      cleanUp = false;
    };
  }, [storeMaxState]);

  const translationY = useRef(new Value(0)).current;
  const velocityY = useRef(new Value(0)).current;
  const state = useRef(new Value(0)).current;
  const offset = useRef(new Value(SNAP_BOTTOM)).current;
  const goUp = useRef(new Value(0)).current;
  const goDown = useRef(new Value(0)).current;
  const gestureHandler = onGestureEvent({
    translationY,
    velocityY,
    state,
  });

  const translateY = clamp(
    withSpring({
      state,
      value: translationY,
      offset,
      velocity: velocityY,
      snapPoints: [SNAP_TOP, SNAP_BOTTOM],
      config,
    }),
    SNAP_TOP,
    SNAP_BOTTOM
  );

  const Animheight = interpolate(translateY, {
    inputRange: [SNAP_BOTTOM - 10, SNAP_BOTTOM],
    outputRange: [FULL_SCREEN, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedMaxOpacity = interpolate(translateY, {
    inputRange: [SNAP_BOTTOM - twenty, SNAP_BOTTOM],
    outputRange: [1, 0],
  });

  const animatedMinOpacity = interpolate(translateY, {
    inputRange: [SNAP_BOTTOM - twenty, SNAP_BOTTOM],
    outputRange: [0, 1],
  });

  const animatedMaxIcons = interpolate(translateY, {
    inputRange: [SNAP_TOP, SNAP_TOP + MIN_PLAYER_H],
    outputRange: [1, 0],
  });

  const animatedPlayerH = interpolate(translateY, {
    inputRange: [0, SNAP_BOTTOM],
    outputRange: [FULL_SCREEN, MIN_PLAYER_H],
    extrapolate: Extrapolate.CLAMP,
  });

  const animOverlayOpacity = interpolate(translateY, {
    inputRange: [SNAP_BOTTOM - MIN_PLAYER_H, SNAP_BOTTOM - MIN_PLAYER_H],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const clock = new Clock();
  useCode(
    () =>
      block([
        cond(goUp, [
          set(
            offset,
            timing({
              clock,
              duration: 100,
              from: SNAP_BOTTOM,
              to: SNAP_TOP,
            })
          ),
          cond(not(clockRunning(clock)), set(goUp, 0)),
        ]),
      ]),
    []
  );

  useCode(
    () =>
      block([
        cond(goDown, [
          set(
            offset,
            timing({
              clock,
              duration: 300,
              from: SNAP_TOP,
              to: SNAP_BOTTOM,
            })
          ),
          cond(not(clockRunning(clock)), set(goDown, 0)),
        ]),
      ]),
    []
  );

  const toSetUp = () => {
    goUp.setValue(1);
  };

  const minFunc = () => {
    goDown.setValue(1);
  };

  return (
    <View style={container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            player,
            {
              height: animatedPlayerH,
              transform: [{ translateY }],
            },
          ]}
        >
          <MinPlayer animOpacity={animatedMinOpacity} upFunc={toSetUp} />
          <MaxPlayer
            animHeight={Animheight}
            animOpacity={animatedMaxOpacity}
            aIcons={animatedMaxIcons}
            minimize={minFunc}
            overlayOpacity={animOverlayOpacity}
          />
        </Animated.View>
      </PanGestureHandler>
      <StatusBar barStyle="light-content" translucent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
  },
  player: {
    width: width,
  },
  minView: {
    top: 0,
    left: 0,
    right: 0,
  },
});

export default Player;
