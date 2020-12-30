import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign, Foundation } from "react-native-vector-icons";
import {
  useSkipOnline, 
  useSetStoreOpenMax, 
  useSongsFetchedState,
  usePlayerLoadedState} from '../../Context/TarckContext'
import {
  fifteen, thirteen, thiry_two, twenty,five, ten, twelve
} from '../../Config/Dimensions'
import { Colors } from "../../assets/colors";
 
const { height, width } = Dimensions.get("window");
const CARD_IMAGE_H = height * 0.08;
const CARD_IMAGE_W = width * 0.15;
const DOWNLOAD_BUTTON_H = 25
const DOWNLOAD_BUTTON_W = 25

const Card = ({item}) => {
  let { 
    card,
    cardCover,
    cardCoverImage,
    cardDetails,
    cardDetailsIcons, 
    cardIcons,
    iconContainer,
  } = styles;
  const lpState= usePlayerLoadedState()
const skip = useSkipOnline()
const openStoreMax = useSetStoreOpenMax()
const songsFetchedState = useSongsFetchedState()
const skipFunc = () => {
  skip(
    lpState,
    item.id,
    songsFetchedState.anthemsFetchedState,
    songsFetchedState.hymnsFetchedState,
    songsFetchedState.classicalsFetchedState,
    songsFetchedState.kelenchaFetchedState,
    songsFetchedState.christmasAnthemsFetchedState,
    songsFetchedState.easterAnthemsFetchedState,
    songsFetchedState.choralBluesFetchedState,
    )
  openStoreMax()
}


  return (
    <TouchableOpacity activeOpacity={1} style={card} onPress={skipFunc} >
      <View style={cardCover}  >
        <Image 
        source={item.artwork == '' ?require('../../assets/alternate_image.jpg') : {uri:item.artwork} }
        style={cardCoverImage} />
      </View>
      <View style={cardDetails}>
      <Text style={{ color: Colors.download_card_title, fontSize:twelve }}>{item.title}</Text>
  <Text style={{ color: Colors.download_card_composer, fontSize:twelve }}>{item.description}</Text>
  <Text style={{ color: Colors.download_card_choir, fontSize: twelve }}>{item.artist}</Text>
  <View style={cardDetailsIcons}>
          <View
            style={{
              width: width * 0.15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Foundation name="heart" color={Colors.download_card_icons} size={thirteen} style={{paddingHorizontal:five}} />
            <Text style={{ color: Colors.download_card_icons, fontSize: ten }}>{item.likes > 999 ? `${(item.likes/1000).toFixed(1)} K` : item.likes}</Text>
          </View>
          <View
            style={{
              width: width * 0.1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign name="download" color={Colors.download_card_icons} size={thirteen} style={{paddingHorizontal:five}} />
            <Text style={{ color: Colors.download_card_icons, fontSize: ten }}>{item.downloads > 999 ? `${(item.downloads/1000).toFixed(1)} K` : item.downloads}</Text>
          </View>
        </View>
      </View>
      <View style={cardIcons}>
        <TouchableOpacity style={iconContainer}   >
          <AntDesign name="checkcircle" size={twenty} color={Colors.download_check} /> 
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width,
    height: height * 0.11,
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
    padding: thirteen,
    paddingTop: fifteen,
  },
  cardDetailsIcons: {
    flexDirection: "row",
  },
  cardIcons: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  downloadButton:{
    height: DOWNLOAD_BUTTON_H,
    width:  DOWNLOAD_BUTTON_W
  },
  iconContainer: {
    width: thiry_two,
    height: thiry_two,
    borderRadius: fifteen,
    backgroundColor: "#353535",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Card;
