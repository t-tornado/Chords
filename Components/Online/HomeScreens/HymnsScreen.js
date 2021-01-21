import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { connect } from "react-redux";
import { fetchHymns } from "../../../Redux/actions/HymnActions";
import {
  getHymns,
  getLoadingHymns,
  getErrorLoadingHymns,
} from "../../../Redux/Selectors/PlaySelector";
import Footer from "../../FlatlistFooter";
import RenderHymns from "../RenderItems/GeneralRenderItem";
import ErrorScreen from "../ErrorScreens/GeneralErrorScreen";
import { five } from "../../../Config/Dimensions";
import { fetchChristmasAnthems } from "../../../Redux/actions/ChristmasAnthemsActions";
import { fetchEasterAnthems } from "../../../Redux/actions/EasterAnthemsActions";
import { fetchAnthems } from "../../../Redux/actions/AnthemsActions";
import { fetchclassicals } from "../../../Redux/actions/ClassicalsActions";
import { fetchKelencha } from "../../../Redux/actions/KelenchaActions";
import { fetchChoralBlues } from "../../../Redux/actions/ChoralBlues";

const HymnsScreen = ({
  fetchHymnsFromStore,
  hymns,
  fetchAnthemsFromStore,
  fetchChristmasAnthemsFromStore,
  fetchEasterAnthemsFromStore,
  fetchClassicalsFromStore,
  fetchChoralBluesFromStore,
  fetchKelenchaFromStore,
  loadingHymns,
  errorLoading,
}) => {
  let { container, listBody } = styles;

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      fetchHymnsFromStore();
    }
    return () => (cleanUp = false);
  }, []);

  const onFetchSongs = React.useCallback(() => {
    fetchHymnsFromStore();
    fetchAnthemsFromStore();
    fetchChristmasAnthemsFromStore();
    fetchEasterAnthemsFromStore();
    fetchClassicalsFromStore();
    fetchKelenchaFromStore();
    fetchChoralBluesFromStore();
  });
  return (
    <View style={container}>
      <View style={listBody}>
        <FlatList
          data={hymns}
          ListEmptyComponent={() => (
            <ErrorScreen
              loadingError={errorLoading}
              fetchHymns={fetchHymnsFromStore}
              fetchAnthems={fetchAnthemsFromStore}
              fetchChristmasAnthems={fetchChristmasAnthemsFromStore}
              fetchClassicals={fetchClassicalsFromStore}
              fetchEasterAnthems={fetchEasterAnthemsFromStore}
              fetchKelencha={fetchKelenchaFromStore}
              fetchChoralBlues={fetchChoralBluesFromStore}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={loadingHymns}
              onRefresh={onFetchSongs}
            />
          }
          ListFooterComponent={() => <Footer />}
          renderItem={({ item }) => <RenderHymns item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: five,
  },
  listBody: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    hymns: getHymns(state.hymns),
    loadingHymns: getLoadingHymns(state.hymns),
    errorLoading: getErrorLoadingHymns(state.hymns),
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchHymnsFromStore: () => dispatch(fetchHymns()),
    fetchClassicalsFromStore: () => dispatch(fetchclassicals()),
    fetchChristmasAnthemsFromStore: () => dispatch(fetchChristmasAnthems()),
    fetchEasterAnthemsFromStore: () => dispatch(fetchEasterAnthems()),
    fetchKelenchaFromStore: () => dispatch(fetchKelencha()),
    fetchAnthemsFromStore: () => dispatch(fetchAnthems()),
    fetchChoralBluesFromStore: () => dispatch(fetchChoralBlues()),
  };
};

export default connect(mapStateToProps, mapDispatch)(HymnsScreen);
