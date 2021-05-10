import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Dimensions,
} from "react-native";
// import { useDownloadedSongs } from "../Context/TarckContext";
// import { initialLoad } from "../Redux/actions/DownloadAction";

import MyCollectionCard from "../../Components/Cards/MyCollectionCard";
import Footer from "../../Components/GeneralComponents/ListFooter";
import MyCollectionHeader from "../../Components/GeneralComponents/MyCollectionHeader";
import {MyCollectionEmpty} from "../../Components/GeneralComponents/MyCollectionEmpty";
import {width_numbers} from '../../Config/Dimensions'
import {songs} from '../../assets/audio_store'

const PADDING_TOP = StatusBar.currentHeight

const MyCollectionScreen = () => {
  let { container } = styles;
  
  return (
    <View style={container}>
      <MyCollectionHeader />
      <View>
        <FlatList
          ListEmptyComponent={MyCollectionEmpty}
          ListFooterComponent={() => <Footer />}
          data={songs}
          renderItem={({ item, index }) => (
            <MyCollectionCard
              key={item.id} 
              id={item.id}
              title={item.title}
              composer={item.composer}
              artist={item.artist}
              artWork={item.artwork}
              genre={item.genre}
              duration={item.duration}
            />
          )}
        />
      </View>
      <StatusBar barStyle="light-content" translucent={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: PADDING_TOP
  },
});

export default React.memo(MyCollectionScreen);


