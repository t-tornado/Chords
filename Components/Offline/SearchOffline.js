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
import { AntDesign, Entypo } from "react-native-vector-icons";
import CardWithDownload from '../Online/CardWithDownload'
import Footer from '../../Components/FlatlistFooter'
import {useSetKeyword} from '../../Context/TarckContext'
import {getOfflineSearchedSongs, getSearchedSongs, getSearchKeyword} from '../../Redux/Selectors/PlaySelector'
import { seven } from "../../Config/Dimensions";
import { Colors } from "../../assets/colors";
// import RenderList from '../RenderList'
import CardWithoutDownloadButton from '../CardWithoutDownloadButton'

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
          style={[searchBar, {color:'#ffffff90', width: SEC_SEARCHBAR_WIDTH, padding: 0}]}
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
        renderItem={({item})=> 
        <CardWithoutDownloadButton key={item.id} id={item.id} title={item.title} composer={item.composer} artist={item.artist}  artWork={item.artwork} genre={item.genre} duration={item.duration}  />
            }
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
    searchedSongs: getOfflineSearchedSongs(state,state.player.searchKeyword)
  }
}

export default connect(mapStore)(Search)
