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
// icons
import AntDesign from 'react-native-vector-icons/AntDesign'
import Foundation from 'react-native-vector-icons/Foundation'
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
    downloadButton
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
        <Image
          source={require('../../assets/images/default.jpg')}
          style={cardCoverImage}
        />
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
              paddingRight: width_numbers[5],
              paddingVertical: width_numbers[2],
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Foundation
              name="heart"
              color={'red'}
              size={width_numbers[13]}
              style={{paddingRight: width_numbers[3]}}
            />
            <Text
              style={{
                color: '#ffffff',
                fontSize: width_numbers[10],
              }}>
              {likes > 999 ? likes > 999999 ? `${(likes / 1000000).toFixed(1)}M` : `${(likes / 1000).toFixed(1)} K` : likes}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: width_numbers[5],
              paddingVertical: width_numbers[2],
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AntDesign
              name="download"
              color={'#5488d3'}
              size={width_numbers[13]}
              style={{paddingRight: width_numbers[3]}}

            />
            <Text
              style={{
                color: '#ffffff',
                fontSize: width_numbers[10],
              }}>
              {numDownloads > 999
                ? numDownloads > 999999 
                  ? `${(numDownloads/1000000).toFixed(1)}M`
                :`${(numDownloads / 1000).toFixed(1)} K`
                : numDownloads}
            </Text>
          </View>
        </View>
      </View>
      <View style={cardIcons}>
          <AntDesign
            name="checkcircle"
            size={width_numbers[20]}
            color={'#5488d3'}
          />
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
