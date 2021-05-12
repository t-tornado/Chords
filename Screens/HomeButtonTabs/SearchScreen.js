import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux'
import AntDesign from "react-native-vector-icons/AntDesign";


import Footer from '../../Components/GeneralComponents/ListFooter';
import RenderSong from '../../Components/GeneralComponents/RenderSongs';
import { browse_top_scrollbar_colors, home_tab_colors } from '../../Config/Colors';
import { width_numbers } from '../../Config/Dimensions';
import {getSearchKeyword, getSearchedSongs} from '../../Redux/Selector/MainSelector'
import {setSearchKeyword} from '../../Redux/Actions/MainPlayerActions'

const {height, width} = Dimensions.get('window');
const SEARCHBAR_W = width * 0.95;
const SEARCHBAR_H = height * 0.04;
const SEC_SEARCHBAR_WIDTH = width * 0.88101;
const PADDING_TOP = StatusBar.currentHeight * 1.2

const SearchScreen = ({searchedSongs, searchKeyword, setSearchKeyword}) => {
  let {container, searchBar, searchContent} = styles;
  //   const keyWordFunction = useSetKeyword();
  const [text, setText] = useState('');

  return (
    <View style={container}>
      <View
        style={[
          searchBar,
          {
            flexDirection: 'row',
            width: SEARCHBAR_W,
            justifyContent: 'space-around',
          },
        ]}>
        <AntDesign
          name="search1"
          color={'#ffffff'}
          size={width_numbers[17]}
          style={{ alignSelf: "center" }}
        />
        <TextInput
          placeholder="Search Song By Title"
          placeholderTextColor={browse_top_scrollbar_colors.active_tab}
          value={text}
          multiline={false}
          style={[
            searchBar,
            {color: '#ffffff', width: SEC_SEARCHBAR_WIDTH, padding: 0},
          ]}
          onChangeText={value => setText(value)}
          onChange={() => {
            setSearchKeyword(text);
            // setText(value);
          }}
          selectTextOnFocus={true}
        />
      </View>
      <View style={searchContent}>
        <FlatList
          data={searchedSongs}
          ListFooterComponent={() => <Footer />}
          renderItem={({item}) => <RenderSong item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: PADDING_TOP,
    alignItems: 'center',
  },
  searchBar: {
    height: SEARCHBAR_H,
    borderRadius: width_numbers[7],
    backgroundColor: home_tab_colors.bottom_navbar,
    marginBottom: SEARCHBAR_H,
  },
  searchContent: {
    width: width,
    flex: 1,
    backgroundColor: 'transparent',
  },
});

const mapStore = (state) => {
  return {
    searchKeyword: getSearchKeyword(state.player),
    searchedSongs: getSearchedSongs(state, state.player.searchKeyword),
  };
};

const mapDispatch = dispatch => {
  return{
  setSearchKeyword: keyword => dispatch(setSearchKeyword(keyword))
  }
}

export default connect(mapStore,mapDispatch)(SearchScreen);
// export default SearchScreen;
