import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  useUpdateStoreOnlineLib,
    useStoreOnlineLib,
    useDownloadedSongs,
    useWebSongs,
    useSongsFetchedState
  } from '../../Context/TarckContext'

import MyListCard from "./MylistCard";
import Footer from '../FlatlistFooter'
import Header from '../LibraryHeader'
import { twenty } from "../../Config/Dimensions";
import { Colors } from "../../assets/colors";
 
const Home1 = () => {
  let {container} = styles
// const songs = useDownloadedSongs()
const updateStoreOnlineLib = useUpdateStoreOnlineLib()
const songsFetchedState = useSongsFetchedState()
const onlineStoreLib = useStoreOnlineLib()
const {
  anthemsFetchedState,
  hymnsFetchedState,
  classicalsFetchedState,
  kelenchaFetchedState,
  easterAnthemsFetchedState,
  christmasAnthemsFetchedState,
  choralBluesFetchedState
} = songsFetchedState

React.useEffect(()=> {
let clean = true
if(clean && anthemsFetchedState){
  updateStoreOnlineLib()
} 
if(clean && hymnsFetchedState){
  updateStoreOnlineLib()
  
}
if(clean && classicalsFetchedState){ 
  updateStoreOnlineLib()
  
}
if(clean && kelenchaFetchedState){
  updateStoreOnlineLib()
  
}
if(clean &&easterAnthemsFetchedState){
  updateStoreOnlineLib()
  
}
if(clean &&christmasAnthemsFetchedState){
  updateStoreOnlineLib()
  
}
if(clean  && choralBluesFetchedState){
  updateStoreOnlineLib()
  
}

return () => clean = false
},[
  anthemsFetchedState,
  hymnsFetchedState,
  classicalsFetchedState,
  kelenchaFetchedState,
  easterAnthemsFetchedState,
  christmasAnthemsFetchedState,
  choralBluesFetchedState
])
/*
anthemsFetchedState: getAnthemsFetchedState(state.anthems),
          hymnsFetchedState: getHymnsFetchedState(state.hymns),
          classicalsFetchedState: getClassicalsFetchedState(state.classicals),
          kelenchaFetchedState: getKelenchaFetchedState(state.kelencha),
          easterAnthemsFetchedState: getEasterAnthemsFetchedState(state.easterAnthems),
          christmasAnthemsFetchedState: getChristmasAnthemsFetchedState(state.christmasAnthems),
          choralBluesFetchedState: getChoralBluesFetchedState(state.choralBlues)
*/

  return (
    <View style={container}>
      <Header />
      <View>
      <FlatList 
      ListFooterComponent={()=><Footer />}
      // data={songs}
      data={onlineStoreLib}
      renderItem={({item, index})=>(
        <MyListCard key={item.id} item={item}  />
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
    paddingTop: twenty,
    // backgroundColor: "#03071E",
    backgroundColor: Colors.screens_Background
  },
});


export default Home1