import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign, Entypo } from "react-native-vector-icons";
import {
  useOpenDelete,
  usePlayerLoadedState,
  useSetStoreOpenMax,
  useSkipOffline,
  useOpenDeleteState,
  useDownloadsLoadedState,
} from "../../Context/TarckContext";
import { ten, twenty_five } from "../../Config/Dimensions";
import { Colors } from "../../assets/colors";

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
}) {
  let { card, cardCover, cardCoverImage, cardDetails, cardIcons } = styles;
  const openDeleteState = useOpenDeleteState();
  const playerLoadedState = usePlayerLoadedState();
  const downloadsLoadedState = useDownloadsLoadedState();
  const openDelete = useOpenDelete();
  const skipOffline = useSkipOffline();
  const openStoreMax = useSetStoreOpenMax();

  React.useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
    }

    return () => (cleanUp = false);
  }, []);

  const toPlay = async () => {
    openStoreMax();
    skipOffline(id, playerLoadedState, downloadsLoadedState, false);
  };

  const openDeleteFunc = () => {
    openDelete(title, id, artist, genre, duration, composer, artWork);
  };

  return (
    <TouchableOpacity style={card} activeOpacity={1} onPress={toPlay}>
      <View style={cardCover}>
        <Image
          source={
            artWork == ""
              ? require("../../assets/alternate_image.jpg")
              : artWork == null
              ? require("../../assets/alternate_image.jpg")
              : artWork == undefined
              ? require("../../assets/alternate_image.jpg")
              : { uri: artWork }
          }
          style={cardCoverImage}
        />
      </View>
      <View style={cardDetails}>
        <Text
          numberOfLines={1}
          ellipsizeMode="clip"
          style={{ color: Colors.download_card_title }}
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="clip"
          style={{
            color: Colors.download_card_composer,
            fontSize: 11,
          }}
        >
          {composer}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="clip"
          style={{ color: Colors.download_card_choir }}
        >
          {artist}
        </Text>
      </View>
      <View style={cardIcons}>
        <AntDesign name="checkcircle" size={20} color={Colors.download_check} />
        <TouchableOpacity
          style={{
            height: twenty_five,
            width: twenty_five,
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.65}
          onPress={openDeleteFunc}
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
    padding: ten,
  },
  cardIcons: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
