import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import {
  fifteen,
  five,
  seven,
  seventeen,
  thirteen,
} from "../../Config/Dimensions";
import {
  useCloseQueue,
  usePlayerLoadedState,
  useDownloadsLoadedState,
  useSkipOffline,
} from "../../Context/TarckContext";

const { height, width } = Dimensions.get("window");
const CARD_H = height * 0.085;
const CARD_W = width * 0.88;
const COVER_H = CARD_H * 0.65;
const COVER_W = CARD_W * 0.12;

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

const PlaylistCard = ({ index, duration, title, choir, compareID, id }) => {
  const skip = useSkipOffline();
  const [playing, setPlaying] = React.useState();
  const closeQueue = useCloseQueue();
  const playerLoadedState = usePlayerLoadedState();
  const downloadLoadedState = useDownloadsLoadedState();

  React.useEffect(() => {
    let clean = true;
    if (clean && compareID == id) {
      setPlaying(true);
    }
    if (clean && compareID != id) {
      setPlaying(false);
    }
    return () => (clean = false);
  }, [playing, compareID]);

  const skipFunction = () => {
    skip(id, playerLoadedState, downloadLoadedState);
    // closeQueue();
  };

  const time = Timer(duration);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={skipFunction}
      activeOpacity={0.87}
    >
      <View style={styles.numbering}>
        <Text
          style={{
            color: playing ? "orange" : "#ffffff70",
            fontSize: fifteen,
          }}
        >
          {index}
        </Text>
      </View>
      <View style={styles.cover}>
        <Image
          source={require("../../assets/alternate_image.jpg")}
          style={styles.cover}
        />
      </View>
      <View style={styles.detials}>
        <Text
          style={{
            color: playing ? "orange" : "#ffffff",
            fontSize: fifteen,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "#ffffff80",
            fontSize: thirteen,
          }}
        >
          {choir}
        </Text>
      </View>
      <View style={styles.duration}>
        <Text style={{ color: playing ? "orange" : "#ffffff" }}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: CARD_H,
    width: CARD_W,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderBottomColor: "#353535",
  },
  cover: {
    resizeMode: "cover",
    height: COVER_H,
    width: COVER_W,
    borderRadius: seven,
  },
  detials: {
    width: CARD_W * 0.61,
    height: COVER_H,
    paddingHorizontal: five,
    justifyContent: "center",
  },
  duration: {
    width: CARD_W * 0.15,
    height: COVER_H,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  numbering: {
    width: CARD_W * 0.09,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlaylistCard;
