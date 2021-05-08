import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
// import { AntDesign, Foundation } from "react-native-vector-icons";
// import {
//   useSetStoreOpenMax,
//   usePlayerLoadedState,
//   useDownloadsLoadedState,
//   useSkipOffline,
// } from "../../Context/TarckContext";
import {width_numbers} from '../../Config/Dimensions';
import { song_card_colors } from '../../Config/Colors';

const {height, width} = Dimensions.get('window');
const CARD_IMAGE_H = height * 0.085;
const CARD_IMAGE_W = width * 0.17;
const DOWNLOAD_BUTTON_H = width_numbers[25];
const DOWNLOAD_BUTTON_W = width_numbers[25];

const Card = ({artist, title, id, composer, numDownloads, artwork, likes}) => {
  let {
    card,
    cardCover,
    cardCoverImage,
    cardDetails,
    cardDetailsIcons,
    cardIcons,
    iconContainer,
  } = styles;
  // const skip = useSkipOffline();
  // const downloadsLoadedState = useDownloadsLoadedState();
  // const playerLoadedState = usePlayerLoadedState();
  // const openStoreMax = useSetStoreOpenMax();

  const skipFunc = () => {
    // skip(`10000000000${id}`, playerLoadedState, downloadsLoadedState, true);
    // openStoreMax();
  };

  return (
    <TouchableOpacity activeOpacity={0.9} style={card} onPress={skipFunc}>
      <View style={cardCover}>
        {/* <Image
          source={
            artwork == ''
              ? require('../../assets/alternate_image.jpg')
              : artwork == null
              ? require('../../assets/alternate_image.jpg')
              : artwork == undefined
              ? require('../../assets/alternate_image.jpg')
              : {uri: artwork}
          }
          style={cardCoverImage}
        /> */}
        <View style={[cardCoverImage, {backgroundColor:'#5488d3'}]} />
      </View>
      <View style={cardDetails}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            color: song_card_colors.title,
            fontSize: width_numbers[12],
          }}>
          {title}
        </Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            color: song_card_colors.composer,
            fontSize: width_numbers[12],
          }}>
          {composer}
        </Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            color: '#ffffff90',
            fontSize: width_numbers[12],
          }}>
          {artist}
        </Text>
        <View style={cardDetailsIcons}>
          <View
            style={{
              width: width * 0.15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <Foundation
              name="heart"
              color={Colors.download_card_icons}
              size={width_numbers[13]}
              style={{paddingHorizontal: width_numbers[5]}}
            /> */}
            <View style={{padding:5, borderRadius:3,marginHorizontal: 2, backgroundColor: 'red'}} />
            <Text
              style={{
                color: '#ffffff',
                fontSize: width_numbers[10],
              }}>
              {likes > 999 ? `${(likes / 1000).toFixed(1)} K` : likes}
            </Text>
          </View>
          <View
            style={{
              width: width * 0.1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <AntDesign
              name="download"
              color={Colors.download_card_icons}
              size={width_numbers[13]}
              style={{paddingHorizontal: width_numbers[5]}}
            /> */}
            <View style={{padding:5, borderRadius:3,marginHorizontal: 2, backgroundColor: 'orange'}} />
            <Text
              style={{
                color: '#ffffff',
                fontSize: width_numbers[10],
              }}>
              {numDownloads > 999
                ? `${(numDownloads / 1000).toFixed(1)} K`
                : numDownloads}
            </Text>
          </View>
        </View>
      </View>
      <View style={cardIcons}>
        <TouchableOpacity style={iconContainer}>
          {/* <TouchableOpacity style={downloadButton} > */}
          {/* <AntDesign
            name="checkcircle"
            size={width_numbers[20]}
            color={}
          /> */}

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
    backgroundColor: 'transparent',
    borderBottomColor: '#353535',
    flexDirection: 'row',
  },
  cardCover: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCoverImage: {
    width: CARD_IMAGE_W,
    height: CARD_IMAGE_H,
    resizeMode: 'cover',
  },
  cardDetails: {
    flex: 4,
    padding: width_numbers[13],
    paddingTop: width_numbers[15],
  },
  cardDetailsIcons: {
    flexDirection: 'row',
  },
  cardIcons: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  downloadButton: {
    height: DOWNLOAD_BUTTON_H,
    width: DOWNLOAD_BUTTON_W,
  },
  iconContainer: {
    width: width_numbers[32],
    height: width_numbers[32],
    borderRadius: width_numbers[15],
    backgroundColor: '#353535',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Card;
