import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from 'react-native-vector-icons/AntDesign'
import {useSetSongToDelete, useToggleCardOptions} from '../../Context/openCardoptions'
import { width_numbers } from "../../Config/Dimensions";
import { song_card_colors } from "../../Config/Colors";

const { height, width } = Dimensions.get("window");
const CARD_IMAGE_H = height * 0.075;
const CARD_IMAGE_W = width * 0.15;

export default function CardWithoutDownloadButton({
  id,
  title,
  composer,
  artist,
  artWork,
  genre,
  duration,
  likes
}) {
  let { card, cardCover, cardCoverImage, cardDetails, cardIcons } = styles;


  const toggleCardOption = useToggleCardOptions()
  const setSongToDeleteAction = useSetSongToDelete()

  React.useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
    }

    return () => (cleanUp = false);
  }, []);

  const toPlay = async () => {
    // openStoreMax();
    // skipOffline(id, playerLoadedState, downloadsLoadedState, false);
    console.log('From my collection card, Card pressed')
  };

  const openCardOptions = () => {
    toggleCardOption.open()
    setSongToDeleteAction(id,title,artist,artWork,composer,duration,genre,likes)
  };

  return (
    <TouchableOpacity style={card} activeOpacity={0.9} onPress={toPlay}>
      <View style={cardCover}>
        <Image source={artWork} style={cardCoverImage} />
      </View>
      <View style={cardDetails}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: song_card_colors.title }}
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: song_card_colors.composer,
            fontSize: 11,
          }}
        >
          {composer}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: song_card_colors.choir }}
        >
          {artist}
        </Text>
      </View>
      <View style={cardIcons}>
        <AntDesign name="checkcircle" size={20} color='#5488d3' />
        <TouchableOpacity
          style={{
            height: width_numbers[25],
            width: width_numbers[25],
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.65}
          onPress={openCardOptions}
        >
          <Entypo name="dots-three-vertical" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width,
    height: height * 0.1,
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    borderBottomColor: "#353535",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center', 
    zIndex :1
  },
  cardCover: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  cardCoverImage: {
    width: CARD_IMAGE_W,
    height: CARD_IMAGE_H,
    resizeMode: "cover",
  },
  cardDetails: {
    flex: 4,
    padding: width_numbers[10],
  },
  cardIcons: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
