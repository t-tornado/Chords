import React from "react";
import { Text } from "react-native";
import { useTrackPlayerProgress } from "react-native-track-player";
import { eleven, fifteen, five, thirteen } from "../../Config/Dimensions";

const TimerComp = () => {
  const [tim, setTim] = React.useState(0);
  const progress = useTrackPlayerProgress(1000);
  function Timer(pos) {
    return pos > 3600
      ? [
          parseInt((pos / 60 / 60) % 60),
          parseInt((pos / 60) % 60),
          parseInt(pos % 60),
        ]
          .join(":")
          .replace(/\b(\d)\b/g, "0$1")
      : [parseInt((pos / 60) % 60), parseInt(pos % 60)]
          .join(":")
          .replace(/\b(\d)\b/g, "0$1");
  }

  const Time = Timer(progress.position);
  React.useEffect(() => {
    let clean = true;
    if (clean) {
      setTim(Time);
    }
    return () => {
      setTim(0);
      clean = false;
    };
  }, [progress]);

  return (
    <Text style={{ color: "#ffffff", fontSize: eleven, padding: five }}>
      {tim}{" "}
    </Text>
  );
};

export default TimerComp;
