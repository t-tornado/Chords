import React from "react";
import Svg, { Circle } from "react-native-svg";
import Animated from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { interpolate, multiply } = Animated;
let strokeWidth;
let radius;
const completeAngle = 2 * Math.PI;
let circumference;
const total = 100;

const DownloadButton = ({ size, downloadProgress, color }) => {
  strokeWidth = size * 0.1;
  radius = (size - strokeWidth) / 2;
  circumference = completeAngle * radius;

  const alpha = interpolate(downloadProgress, {
    inputRange: [0, downloadProgress, total],
    outputRange: [0, (downloadProgress / total) * completeAngle, completeAngle],
  });
  const strokeDashoffset = multiply(alpha, radius);

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke={color}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        {...{ strokeWidth }}
      />
      <AnimatedCircle
        stroke="#968c83"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        {...{ strokeWidth, strokeDashoffset }}
        strokeDasharray={`${circumference} ${circumference}`}
      />
    </Svg>
  );
};

export default DownloadButton;
