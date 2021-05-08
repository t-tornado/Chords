import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
// import { AntDesign } from "react-native-vector-icons";
import Footer from '../../Components/GeneralComponents/ListFooter';
import RenderSong from '../../Components/GeneralComponents/RenderSongs';
import { browse_top_scrollbar_colors, home_tab_colors } from '../../Config/Colors';
import { width_numbers } from '../../Config/Dimensions';
import {CustomIcon} from '../../Components/GeneralComponents/CustomIcon'
import {songs} from '../../assets/audio_store'

const {height, width} = Dimensions.get('window');
const SEARCHBAR_W = width * 0.95;
const SEARCHBAR_H = height * 0.04;
const SEC_SEARCHBAR_WIDTH = width * 0.88101;
const PADDING_TOP = StatusBar.currentHeight * 1.2

const SearchScreen = ({searchedSongs, searchKeyword}) => {
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
        {/* <AntDesign
          name="search1"
          color={Colors.active_top_tab_text}
          size={15}
          style={{ alignSelf: "center" }}
        /> */}
      <View style={{justifyContent: 'center', alignItems:'center', flex:1}} >
      <CustomIcon color='#ffffff' size={20} />
      </View>
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
            // keyWordFunction(text);
            // setText(value);
          }}
          selectTextOnFocus={true}
        />
      </View>
      <View style={searchContent}>
        <FlatList
          data={songs}
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

// const mapStore = (state) => {
//   return {
//     searchKeyword: getSearchKeyword(state.player),
//     searchedSongs: getSearchedSongs(state, state.player.searchKeyword),
//   };
// };

// export default connect(mapStore)(Search);
export default SearchScreen;
