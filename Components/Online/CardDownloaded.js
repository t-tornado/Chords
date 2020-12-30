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
  usePlayerLoadedState,
  useSongsFetchedState,
  useWebLoadedState
} from '../../Context/TarckContext'
import {
  fifteen, thirteen, thiry_two, twenty,five, ten, twelve, twenty_five
} from '../../Config/Dimensions'
import { Colors } from "../../assets/colors";
 
const { height, width } = Dimensions.get("window");
const CARD_IMAGE_H = height * 0.085;
const CARD_IMAGE_W = width * 0.17;
const DOWNLOAD_BUTTON_H = twenty_five
const DOWNLOAD_BUTTON_W = twenty_five

const Card = ({artist,title, id, composer,numDownloads,artwork,likes}) => {
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
const webLoadedState = useWebLoadedState()

const skipFunc = () => {
  skip(
    lpState,
    id,
    songsFetchedState.anthemsFetchedState,
    songsFetchedState.hymnsFetchedState,
    songsFetchedState.classicalsFetchedState,
    songsFetchedState.kelenchaFetchedState,
    songsFetchedState.christmasAnthemsFetchedState,
    songsFetchedState.easterAnthemsFetchedState,
    songsFetchedState.choralBluesFetchedState,
    webLoadedState
    )
  openStoreMax()
}
 

  return (
    <TouchableOpacity activeOpacity={1} style={card} onPress={skipFunc} >
      <View style={cardCover}  >
        <Image 
        source={artwork == '' ?require('../../assets/alternate_image.jpg') : {uri:artwork} }
        style={cardCoverImage} />
      </View>
      <View style={cardDetails}>
      <Text style={{ color: Colors.download_card_title, fontSize:twelve }}>{title}</Text>
  <Text style={{ color: Colors.download_card_composer, fontSize:twelve }}>{composer}</Text>
  <Text style={{ color: Colors.download_card_choir, fontSize: twelve }}>{artist}</Text>
  <View style={cardDetailsIcons}>
          <View
            style={{
              width: width * 0.15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Foundation name="heart" color={Colors.download_card_icons} size={thirteen} style={{paddingHorizontal:five}} />
            <Text style={{ color: Colors.download_card_icons, fontSize: ten }}>{likes > 999 ? `${(likes/1000).toFixed(1)} K` : likes}</Text>
          </View>
          <View
            style={{
              width: width * 0.1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign name="download" color={Colors.download_card_icons} size={thirteen} style={{paddingHorizontal:five}} />
            <Text style={{ color: Colors.download_card_icons, fontSize: ten }}>{numDownloads > 999 ? `${(numDownloads/1000).toFixed(1)} K` : numDownloads}</Text>
          </View>
        </View>
      </View>
      <View style={cardIcons}>
        <TouchableOpacity style={iconContainer}   >
          {/* <TouchableOpacity style={downloadButton} > */}
          <AntDesign name="checkcircle" size={twenty} color={Colors.download_check} /> 
          
          {/* </TouchableOpacity> */}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width,
    height: height * 0.12,
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
