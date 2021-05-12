import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import {connect} from 'react-redux'

import ListFooter from '../../Components/GeneralComponents/ListFooter'
import RenderSongs from '../../Components/GeneralComponents/RenderSongs'
import SongLoadingFailureScreen from '../ErrorScreens/SongLoadingFailureScreen'
import {songs} from '../../assets/audio_store'
const empty =[]

import { width_numbers } from "../../Config/Dimensions";
import { getAnthems, getErrorLoadingAnthems, getLoadingAnthems } from "../../Redux/Selector/MainSelector";

const AnthemsScreen = ({
  anthemsSongs, 
  errorLoadingAnthemsState, 
  loadingAnthemsState
}) => {
  let { container, listBody } = styles;

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      // fetchAnthemsFromStore();
    }

    return () => (cleanUp = false);
  }, []);
  
// console.log('INFO FROM ANTHEMS SCREEN >>>>  anthems songs: ',anthemsSongs)
// console.log('INFO FROM ANTHEMS SCREEN >>>>  errorLoadingAnthemsState: ',errorLoadingAnthemsState)
// console.log('INFO FROM ANTHEMS SCREEN >>>>  loadingAnthemsState: ',loadingAnthemsState)

  const onFetchSongs = React.useCallback(() => { });

  return (
    <View style={container}>
      <View style={listBody}>
        <FlatList
          data={empty}
          ListEmptyComponent={() => (<SongLoadingFailureScreen />)}
          refreshControl={
            <RefreshControl
              // refreshing={loadingAnthems}
              onRefresh={onFetchSongs}
            />
          }
          ListFooterComponent={() => <ListFooter />}
          renderItem={({ item }) => <RenderSongs item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: width_numbers[5],
  },
  listBody: {
    flex: 1,
  },
});

const mapState = state => {
  return {
    anthemsSongs: getAnthems(state.anthems), 
    loadingAnthemsState: getLoadingAnthems(state.anthems), 
    errorLoadingAnthemsState: getErrorLoadingAnthems(state.anthems)
  }
}


export default connect(mapState)(AnthemsScreen)