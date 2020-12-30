import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  Dimensions,
  FlatList
} from "react-native";
import {connect} from 'react-redux'
import { AntDesign } from "react-native-vector-icons";
import Footer from '../FlatlistFooter'
import {useSetKeyword} from '../../Context/TarckContext'
import {getSearchedSongs, getSearchKeyword} from '../../Redux/Selectors/PlaySelector'
import { seven } from "../../Config/Dimensions";
import { Colors } from "../../assets/colors";
import RenderList from './SearchRenderComponent'

const { height, width } = Dimensions.get("window");
const SEARCHBAR_W = width * 0.95;
const SEARCHBAR_H = height * 0.04;
const SEC_SEARCHBAR_WIDTH = width * 0.88101


const Search = ({searchedSongs, searchKeyword}) => {
  let { container, searchBar, searchContent } = styles;
  const keyWordFunction = useSetKeyword()
  const [text, setText] = useState("");

  const onInput = (value) => {
    keyWordFunction(value)
    setText(value);
  };

  return (
    <View style={container}>
      <View
        style={[
          searchBar,
          {
            flexDirection: "row",
            width: SEARCHBAR_W,
            justifyContent: "space-around",
          },
        ]}
      >
        <AntDesign
          name="search1"
          color={Colors.active_top_tab_text}
          size={15}
          style={{ alignSelf: "center" }}
        />
        <TextInput
          placeholder="Search Downloaded Song By Title"
          placeholderTextColor={Colors.active_top_tab}
          value={text}
          multiline={false}
          style={[searchBar, {color:'#ffffff', width: SEC_SEARCHBAR_WIDTH, padding: 0}]}
          onChangeText={(value) => onInput(value)}
          onChange={()=> {
            keyWordFunction(text)
          }}
          selectTextOnFocus={true}
        />
      </View>
      <View style={searchContent} >
        <FlatList
        data={searchedSongs}
        ListFooterComponent={()=> <Footer />}
        renderItem={({item})=> (
          <RenderList item={item} />

        )}
        />
              </View>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: Colors.screens_Background,
    paddingTop: 35,
    alignItems: "center",
  },
  searchBar: {
    height: SEARCHBAR_H,
    borderRadius: seven,
    backgroundColor: Colors.bottom_tabbar,
    marginBottom: SEARCHBAR_H
  },
  searchContent: {
    width: width,
    flex:1,
    backgroundColor: "transparent",
  },
});

const mapStore  = (state) => {

  return {
    searchKeyword : getSearchKeyword(state.player),
    searchedSongs: getSearchedSongs(state,state.player.searchKeyword)
  }
}

export default connect(mapStore)(Search)
