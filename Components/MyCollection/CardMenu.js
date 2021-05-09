import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import {width_numbers} from '../../Config/Dimensions'

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { to_delete_song_screen_colors } from "../../Config/Colors";


// import {
//   useCloseDelete,
//   useFileToDelete,
//   useOpenDeleteState,
//   useLikeSong,
//   useDeleteSong,
// } from "../Context/TarckContext";

const { height, width } = Dimensions.get("window");
const MODAL_HEIGHT = height * 0.45;
const MODAL_WIDTH = width * 0.95;
const OPTION_HEADER_IMAGE_H = MODAL_HEIGHT * 0.185;
const OPTION_HEADER_IMAGE_w = MODAL_HEIGHT * 0.185;

const CardMenuScreen = () => {
    
//   const [modal, setModal] = React.useState(false);
  const [title, setTitle] = React.useState('Yensi Den');
  const [choir, setChoir] = React.useState('University Choir KNUST');
//   const [artwork, setArtwork] = React.useState();
  const [composer, setComposer] = React.useState('Varrick Armah');
//   const [id, setId] = React.useState(null);
//   const deletSong = useDeleteSong();
//   const openDeleteState = useOpenDeleteState();
//   const closeDeleteAction = useCloseDelete();
//   const fileToDelete = useFileToDelete();
//   const likeSong = useLikeSong();

//   React.useEffect(() => {
//     let clean = true;
//     if (clean && openDeleteState) {
//       setModal(true);
//       setTitle(fileToDelete.title == null ? "Title" : fileToDelete.title);
//       setChoir(fileToDelete.artist == null ? "Choir" : fileToDelete.artist);
//       setComposer(
//         fileToDelete.composer == null ? "Composer" : fileToDelete.composer
//       );
//       setId(fileToDelete.id);
//       setArtwork(fileToDelete.artwork);
//     }
//     return () => (clean = false);
//   }, [openDeleteState]);

  const closeModal = () => {
    // setModal(false);
    // closeDeleteAction();
  };

  const deleteAction = () => {
    // setModal(false);
    // deletSong();
    // closeDeleteAction();
  };

  const likeAction = () => {
    // likeSong(true, "genre", id);
    // setModal(false);
    // closeDeleteAction();
  };

  return (
    // <Modal
    //   style={styles.container}
    //   visible={modal}
    //   transparent={true}
    //   animationType="slide"
    // >
    <>
      <View style={styles.cover}>
        <View style={styles.header}>
          <View style={styles.header_image}>
            {/* <Image
              source={
                artwork == null
                  ? require("../assets/alternate_image.jpg")
                  : { uri: artwork }
              }
              style={styles.header_image}
            /> */}
            <View style={styles.header_image} />
          </View>
          <View style={styles.header_details}>
            <Text
              style={{
                color: to_delete_song_screen_colors.title,
                fontSize: width_numbers[14],
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <Text
              style={{
                color: to_delete_song_screen_colors.title,
                fontSize: width_numbers[10],
              }}
            >
              {composer}
            </Text>
            <Text
              style={{
                color: to_delete_song_screen_colors.choir,
                fontSize: width_numbers[12],
              }}
            >
              {choir}
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.option_bar}
            activeOpacity={0.85}
            onPress={likeAction}
          >
            <AntDesign
              name="heart"
              size={width_numbers[20]}
              color={to_delete_song_screen_colors.like_icon}
              style={{ paddingHorizontal: width_numbers[10] }}
            />
            <Text style={styles.option_text}>Like song</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option_bar}
            activeOpacity={0.85}
            onPress={deleteAction}
          >
            <MaterialIcons
              name="delete"
              size={width_numbers[20]}
              color={to_delete_song_screen_colors.delete_icon}
              style={{ paddingHorizontal: width_numbers[10] }}
            />
            <Text style={styles.option_text}>Remove From Downloads</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option_bar}
            activeOpacity={0.85}
            onPress={closeModal}
          >
            <MaterialCommunityIcons
              name="cancel"
              size={width_numbers[20]}
              color={to_delete_song_screen_colors.cancel_icon}
              style={{ paddingHorizontal: width_numbers[10] }}
            />
            <Text style={styles.option_text}>CANCEL</Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    {/* </Modal> */}</>
  );
};

const styles = StyleSheet.create({
  body: {
    height: MODAL_HEIGHT * 0.7,
    width: MODAL_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: MODAL_HEIGHT,
    width: MODAL_WIDTH,
    position: "absolute",
    left: 0,
    right: 0,
  },
  cover: {
    height: MODAL_HEIGHT,
    width: MODAL_WIDTH,
    backgroundColor: to_delete_song_screen_colors.background,
    marginTop: height - MODAL_HEIGHT,
    borderTopLeftRadius: width_numbers[15],
    borderTopRightRadius: width_numbers[15],
    alignSelf: "center",
  },
  header: {
    height: MODAL_HEIGHT * 0.18,
    width: MODAL_WIDTH,
    padding: width_numbers[15],
    justifyContent: "space-around",
    flexDirection: "row",
  },
  header_details: {
    width: MODAL_WIDTH * 0.685,
    height: MODAL_HEIGHT * 0.185,
    justifyContent: "center",
  },
  header_image: {
    resizeMode: "cover",
    height: OPTION_HEADER_IMAGE_H,
    width: OPTION_HEADER_IMAGE_w,
    borderRadius: OPTION_HEADER_IMAGE_w / 2,
  },
  option_bar: {
    width: MODAL_WIDTH * 0.85,
    height: MODAL_HEIGHT * 0.185,
    borderBottomColor: "#ffffff90",
    borderTopColor: "transparent",
    borderBottomWidth: 1,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: width_numbers[5],
    flexDirection: "row",
  },
  option_text: {
    color: "#ffffff",
    fontSize: width_numbers[17],
  },
});

export default CardMenuScreen;
