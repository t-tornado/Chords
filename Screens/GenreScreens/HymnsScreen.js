import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import {connect} from 'react-redux'

import { getErrorLoadingHymns, getHymns, getLoadingHymns } from '../../Redux/Selector/MainSelector'
import ListFooter from '../../Components/GeneralComponents/ListFooter'
import RenderSongs from '../../Components/GeneralComponents/RenderSongs'
import SongLoadingFailureScreen from '../ErrorScreens/SongLoadingFailureScreen'

import { width_numbers } from "../../Config/Dimensions";
import { fetchHymns } from "../../Redux/Actions/HymnActions";

const HymnsScreen = ({
  hymns, loadinghymns, fetchHymnsFromStore,errorLoadinghymns
}) => {
  let { container, listBody } = styles;

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      fetchHymnsFromStore();
    }

    return () => (cleanUp = false);
  }, []);

  const onFetchSongs = React.useCallback(() => { });

  return (
    <View style={container}>
      <View style={listBody}>
        <FlatList
          data={hymns}
          ListEmptyComponent={() => (<SongLoadingFailureScreen loadingError={errorLoadinghymns} />)}
          refreshControl={
            <RefreshControl
              refreshing={loadinghymns}
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
    hymns: getHymns(state.hymns), 
    loadinghymns: getLoadingHymns(state.hymns), 
    errorLoadinghymns: getErrorLoadingHymns(state.hymns)
  }
}

const mapDispatch = dispatch => {
  return {
    fetchHymnsFromStore: () => dispatch(fetchHymns())
  }
}

export default connect(mapState, mapDispatch)(HymnsScreen)