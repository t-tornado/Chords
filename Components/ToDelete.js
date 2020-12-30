import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
} from "react-native-vector-icons";
import { Colors } from "../assets/colors";
import { fifteen, ten, thiry_two, twelve, twenty,  } from "../Config/Dimensions";
import {useCloseDelete, useOpenDeleteState, useDeleteSong} from '../Context/TarckContext'

const { height, width } = Dimensions.get("window");
const MODAL_HEIGHT = height * 0.3;
const MODAL_WIDTH = width;

export default function ToDelete() {
  let { container, modalCover, textArea, optionCard, optionsArea } = styles;
const closeDelete = useCloseDelete()
const deleteState = useOpenDeleteState()
const [delState, setDelState] = React.useState(false)
const deleteSong = useDeleteSong()

const closeDeleteFunc = () => {
  setDelState(false)
  closeDelete()
} 
function deleteSongFunc() {
  // deleteSong()
  setDelState(false)
  closeDelete()
}

React.useEffect(()=> {
  let cleanUp = true
  if(cleanUp && deleteState){
    setDelState(true)
  }
return () => {
  cleanUp = false
}

},[deleteState])

  return (
    <Modal 
      style={container}
      transparent={true}
      visible={delState}
      animationType="slide"
    >
      <View style={modalCover}>
        <View style={textArea}>
          <Text style={{ fontSize: fifteen, color: "#ffffff90" }}>
            Are you sure you want to delete from your Library?
          </Text>
        </View>
        <View style={optionsArea}>
          <TouchableOpacity
            style={optionCard}
            activeOpacity={0.6}
            onPress={closeDeleteFunc}
          >
            <Text
              style={{
                fontSize: twelve,
                color: Colors.to_delete_option_text,
              }}
            >
              CANCEL
            </Text>
            <MaterialIcons name="cancel" size={twenty} color={Colors.to_delete_cancel_icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={optionCard}
            activeOpacity={0.6}
            onPress={deleteSongFunc}
          >
            <Text
              style={{
                fontSize: twelve,
              color: Colors.to_delete_option_text,
              }}
            >
              DELETE
            </Text>
            <MaterialCommunityIcons name="delete" color={Colors.to_delete_delete_icon} size={twenty} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: MODAL_HEIGHT,
    width: MODAL_WIDTH,
    position: "absolute",
    left: 0,
    right: 0,
  },
  modalCover: {
    height: MODAL_HEIGHT,
    width: MODAL_WIDTH,
    backgroundColor: Colors.to_delete_background,
    marginTop: height - MODAL_HEIGHT,
  },
  optionsArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop:thiry_two
  },
  optionCard: {
    width: width * 0.3,
    height: MODAL_HEIGHT * 0.17,
    flexDirection: "row",
    borderRadius: width * 0.02,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.to_delete_option_backgroud
  },
  textArea: {
    height: MODAL_HEIGHT * 0.35,
    width: MODAL_WIDTH,
    alignItems: "center",
    padding: ten,
    justifyContent: 'center'
  },
});