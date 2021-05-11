import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Dimensions,
} from "react-native";

import MyCollectionCard from "../../Components/Cards/MyCollectionCard";
import Footer from "../../Components/GeneralComponents/ListFooter";
import MyCollectionHeader from "../../Components/GeneralComponents/MyCollectionHeader";
import {MyCollectionEmpty} from "../../Components/GeneralComponents/MyCollectionEmpty";
import {width_numbers} from '../../Config/Dimensions'
import {songs} from '../../assets/audio_store'

const PADDING_TOP = StatusBar.currentHeight
const {height,width} = Dimensions.get('window')

const MyCollectionScreen = () => {
  let { container,body } = styles;
  
  return (
    <View style={body}>
      <MyCollectionHeader />
        <FlatList
          ListEmptyComponent={MyCollectionEmpty}
          ListFooterComponent={() => <Footer />}
          data={songs}
          renderItem={({ item, index }) => (
            <MyCollectionCard
              key={item.id} 
              id={index}
              title={item.title}
              composer={item.composer}
              artist={item.artist}
              artWork={item.artwork}
              genre={item.genre}
              duration={item.duration}
            />
          )}
        />     
      <StatusBar barStyle="light-content" translucent={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  body:{
    justifyContent: "flex-start",
    paddingTop: PADDING_TOP, 
    flex:1
    
  },
  container: {
    padding: 1,
    flex: 1, 

  },
});

export default React.memo(MyCollectionScreen);


