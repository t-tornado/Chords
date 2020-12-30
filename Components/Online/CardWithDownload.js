import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign, MaterialCommunityIcons,Foundation } from "react-native-vector-icons";
import { 
  useDownloadSong,
   useGetDownloadProgress, 
   useGetDownloadingSongState, 
   useSkipOnline,
   usePlayerLoadedState,
   useSetStoreOpenMax,
   useSongsFetchedState,
   useWebLoadedState
   } from '../../Context/TarckContext'
// import RNDownloadButton from 'react-native-download-button'
import { eighteen, fifteen, five, seventeen, ten, thirteen } from "../../Config/Dimensions";

import {Colors} from '../../assets/colors'
 
const { height, width } = Dimensions.get("window");
const CARD_IMAGE_H = height * 0.085;
const CARD_IMAGE_W = width * 0.17;
const DOWNLOAD_BUTTON_H = width * 0.06365
const DOWNLOAD_BUTTON_W = width * 0.06365

const Card = ({artist,title, id, composer, url,numDownloads,genre,artwork,likes,duration}) => {
  let { 
    card,
    cardCover,
    cardCoverImage,
    cardDetails,
    cardDetailsIcons, 
    cardIcons,
    iconContainer,
  } = styles;
  const webLoadedState = useWebLoadedState()
const songsFetchedState = useSongsFetchedState()
  const playerState = usePlayerLoadedState()
const skipOnline = useSkipOnline()
const getUrl = useDownloadSong()
const downloadProgress = useGetDownloadProgress()
const downloadingSongState = useGetDownloadingSongState()
const [start ,setStart] = React.useState(false)
// const [cleaning, setCleaning] = React.useState(false)

const openMax = useSetStoreOpenMax()


React.useEffect(()=> {
  let clean = true
if(clean){
// console.log('INFO---*cardWithDownload*:::start state is   ==>',start)
null
}
return () => clean = false
},[start])

const toSkip =async () => {
  skipOnline(
    playerState, 
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
  openMax()
}

  return (
    <TouchableOpacity activeOpacity={1} style={card} onPress={toSkip} >
      <View style={cardCover}  >
        <Image
         source={artwork == null  ?require('../../assets/alternate_image.jpg') : {uri:artwork} }
        // source={artwork == undefined ?require('../../assets/alternate_image.jpg') : artwork }
         style={cardCoverImage} />
      </View>
      <View style={cardDetails}>
        <View style={{  height:height * 0.07}} >
        <Text style={{ color: Colors.download_card_title, fontSize:12 }}>{title}</Text>
  <Text style={{ color: Colors.download_card_composer, fontSize:12 }}>{composer}</Text>
  <Text style={{ color: Colors.download_card_choir, fontSize: 12 }}>{artist}</Text>
  </View>
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
      <View style={cardIcons} >   
      
        
         {
           !start ?
<TouchableOpacity style={iconContainer} onPress={()=>{
 getUrl(title,id,url,artist,numDownloads,genre,artwork,duration,composer)
 setStart(true)
}}  activeOpacity={0.75} >
        <AntDesign name='arrowdown' size={seventeen} color={Colors.active_top_tab} />
        </TouchableOpacity>
            :
            <TouchableOpacity style={iconContainer}   activeOpacity={1} >
         <MaterialCommunityIcons name='progress-download' size={eighteen} color='tomato' />
        </TouchableOpacity>
           
         }
        
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
    padding: width * 0.03335,
    paddingTop: width * 0.03,
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
    width: width * 0.08150,
    height: width * 0.0815,
    borderRadius: width * 0.03826,
    backgroundColor: "#353535",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Card;
