import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {
//   useSkipOnline,
//   usePlayerLoadedState,
//   useSetStoreOpenMax,
//   useSongsFetchedState,
//   useWebLoadedState,
// } from '../../Context/TarckContext';
// import DownloadButton from '../Animated/DownloadButton';
import {width_numbers} from '../../Config/Dimensions';

// import {connect} from 'react-redux';
// import {
//   downloadSongFailure,
//   downloadSongRequest,
//   downloadSongSuccess,
// } from '../../Redux/actions/DownloadAction';
import { CustomIcon } from '../GeneralComponents/CustomIcon';
import { song_card_colors } from '../../Config/Colors';
var RNFS = require('react-native-fs');

const {height, width} = Dimensions.get('window');
const CARD_IMAGE_H = height * 0.085;
const CARD_IMAGE_W = width * 0.17;
const DOWNLOAD_BUTTON_H = width * 0.06365;
const DOWNLOAD_BUTTON_W = width * 0.06365;
const downloadSongsPath = RNFS.DocumentDirectoryPath + '/DownloadedSongs';
const artworkDownloadPath = RNFS.DocumentDirectoryPath + '/artwork';

const WithDownloadButton = ({
  artist,
  title,
  id,
  composer,
  url,
  numDownloads,
  genre,
  artwork,
  likes,
  duration,
  downloadRequest,
  downloadSuccess,
  downloadFailed,
}) => {
  let {
    card,
    cardCover,
    cardCoverImage,
    cardDetails,
    cardDetailsIcons,
    cardIcons,
    iconContainer,
  } = styles;
  // const webLoadedState = useWebLoadedState();
  // const songsFetchedState = useSongsFetchedState();
  // const playerState = usePlayerLoadedState();
  // const skipOnline = useSkipOnline();
  const [start, setStart] = React.useState(false);
  const [downloadProgress, setProgress] = React.useState(0);

const openMax = useSetStoreOpenMax();   

const _downloadFunction = () => {
  downloadRequest();
  RNFS.downloadFile({
    fromUrl: artwork,
    toFile:
      artworkDownloadPath +
      `/Aa${title}Aa${artist}Aa10000000000${id}Aa.jpg`,
  })
    .promise.then(() => {
      // DOWNLOAD SONG
      RNFS.downloadFile({
        toFile:
          downloadSongsPath +
          `/Aadd${title}Aa${artist}Aa10000000000${id}Aa${genre}Aa${duration}Aa${composer}Aa.mp3`,
        fromUrl: url,
        progressInterval: 500,
        progressDivider: 5,
        progress: res => {
          const value = Math.floor(
            (res.bytesWritten / res.contentLength) * 100,
          );
          setProgress(value);
        },
      })
        .promise.then(res => {
          downloadSuccess(
            title,
            id,
            artist,
            genre,
            duration,
            composer,
            numDownloads,
            true,
          );
        })
        .catch(err => {
          downloadFailed();
        });
    })
    .catch(e => {
      RNFS.downloadFile({
        toFile:
          downloadSongsPath +
          `/Aa${title}Aa${artist}Aa10000000000${id}Aa${genre}Aa${duration}Aa${composer}Aa.mp3`,
        fromUrl: url,
        progressInterval: 500,
        progressDivider: 5,
        progress: res => {
          const value = Math.floor(
            (res.bytesWritten / res.contentLength) * 100,
          );
          setProgress(value);
        },
      })
        .promise.then(res => {
          downloadSuccess(
            title,
            id,
            artist,
            genre,
            duration,
            composer,
            numDownloads,
            false,
          );
        })
        .catch(err => {
          downloadFailed();
        });
    });
}


  React.useEffect(() => {
    let clean = true;
    if (clean && start) {
      // _downloadFunction()
    }
    return () => (clean = false);
  }, [start]);

  const toSkip = async () => {
    // skipOnline(
    //   playerState,
    //   id,
    //   songsFetchedState.anthemsFetchedState,
    //   songsFetchedState.hymnsFetchedState,
    //   songsFetchedState.classicalsFetchedState,
    //   songsFetchedState.kelenchaFetchedState,
    //   songsFetchedState.christmasAnthemsFetchedState,
    //   songsFetchedState.easterAnthemsFetchedState,
    //   songsFetchedState.choralBluesFetchedState,
    //   webLoadedState,
    // );
    // openMax();
  };

  const downloadFunction = () => {
    setStart(true);
  };

  return (
    <TouchableOpacity activeOpacity={1} style={card} onPress={toSkip}>
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
        <View style={[cardCoverImage,{backgroundColor: '#5488d3'}]} />
      </View>
      <View style={cardDetails}>
        <View
          ellipsizeMode="clip"
          numberOfLines={1}
          style={{height: height * 0.07}}>
          <Text style={{color: song_card_colors.title, fontSize: 12}}>
            {title}
          </Text>
          <Text
            ellipsizeMode="clip"
            numberOfLines={1}
            style={{color: song_card_colors.composer, fontSize: 12}}>
            {composer}
          </Text>
          <Text
            ellipsizeMode="clip"
            numberOfLines={1}
            style={{color: song_card_colors.choir, fontSize: 12}}>
            {artist}
          </Text>
        </View>
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
            <CustomIcon size={20} color='#5488d3' />
            <Text
              style={{
                color: '#ffffff90',
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
            <Text
              style={{
                color: '#ffffff90',
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
        {!start ? (
          <TouchableOpacity
            style={iconContainer}
            onPress={downloadFunction}
            activeOpacity={0.75}>
            {/* <AntDesign
              name="arrowdown"
              size={width_numbers[17]}
              color={Colors.active_top_tab}
            /> */}
            <CustomIcon
              color="#111d5e"
              size={20}
              // {...{downloadProgress}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={iconContainer} activeOpacity={1}>
            <CustomIcon
              color="#111d5e"
              size={20}
              // {...{downloadProgress}}
            />
          </TouchableOpacity>
        )}
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
    padding: width * 0.03335,
    paddingTop: width * 0.03,
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
    width: width * 0.0815,
    height: width * 0.0815,
    borderRadius: width * 0.03826,
    backgroundColor: '#353535',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const mapDispatch = dispatch => {
//   return {
//     downloadRequest: () => dispatch(downloadSongRequest()),
//     downloadSuccess: (
//       title,
//       id,
//       artist,
//       genre,
//       duration,
//       composer,
//       numDownloads,
//       artwork,
//     ) =>
//       dispatch(
//         downloadSongSuccess(
//           title,
//           id,
//           artist,
//           genre,
//           duration,
//           composer,
//           numDownloads,
//           artwork,
//         ),
//       ),
//     downloadFailed: () => dispatch(downloadSongFailure()),
//   };
// };

// export default connect(null, mapDispatch)(Card);

export default WithDownloadButton