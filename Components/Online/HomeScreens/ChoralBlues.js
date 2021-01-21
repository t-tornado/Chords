import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { connect } from "react-redux";
import {
  getChoralBlues,
  getLoadingChoralBlues,
  getErrorLoadingChoralBlues,
} from "../../../Redux/Selectors/PlaySelector";
import Footer from "../../FlatlistFooter";
import RenderChoralBlues from "../RenderItems/GeneralRenderItem";
import ErrorScreen from "../ErrorScreens/GeneralErrorScreen";
import { fetchKelencha } from "../../../Redux/actions/KelenchaActions";
import { fetchChristmasAnthems } from "../../../Redux/actions/ChristmasAnthemsActions";
import { fetchChoralBlues } from "../../../Redux/actions/ChoralBlues";
import { fetchEasterAnthems } from "../../../Redux/actions/EasterAnthemsActions";
import { fetchAnthems } from "../../../Redux/actions/AnthemsActions";
import { fetchclassicals } from "../../../Redux/actions/ClassicalsActions";
import { fetchHymns } from "../../../Redux/actions/HymnActions";
import { five } from "../../../Config/Dimensions";

const KelenchaScreen = ({
  fetchChoralBluesFromStore,
  fetchKelenchaFromStore,
  choralBlues,
  loadingChoralBlues,
  fetchAnthemsFromStore,
  fetchHymnsFromStore,
  fetchClassicalsFromStore,
  fetchChristmasAnthemsFromStore,
  fetchEasterAnthemsFromStore,
  loadingChoralBluesError,
}) => {
  let { container, listBody } = styles;

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      fetchChoralBluesFromStore();
    }
    return () => (cleanUp = false);
  }, []);

  const onFetchKelencha = React.useCallback(() => {
    fetchChoralBluesFromStore();
    fetchKelenchaFromStore();
    fetchAnthemsFromStore();
    fetchChristmasAnthemsFromStore();
    fetchEasterAnthemsFromStore();
    fetchHymnsFromStore();
    fetchClassicalsFromStore();
  });

  return (
    <View style={container}>
      <View style={listBody}>
        <FlatList
          data={choralBlues}
          ListEmptyComponent={() => (
            <ErrorScreen
              loadingError={loadingChoralBluesError}
              fetchKelencha={fetchKelenchaFromStore}
              fetchAnthems={fetchAnthemsFromStore}
              fetchChristmasAnthems={fetchChristmasAnthemsFromStore}
              fetchClassicals={fetchClassicalsFromStore}
              fetchEasterAnthems={fetchEasterAnthemsFromStore}
              fetchHymns={fetchHymnsFromStore}
              fetchChoralBlues={fetchChoralBluesFromStore}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={loadingChoralBlues}
              onRefresh={onFetchKelencha}
            />
          }
          ListFooterComponent={() => <Footer />}
          renderItem={({ item }) => <RenderChoralBlues item={item} />}
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
    choralBlues: getChoralBlues(state.choralBlues),
    loadingChoralBlues: getLoadingChoralBlues(state.choralBlues),
    loadingChoralBluesError: getErrorLoadingChoralBlues(state.choralBlues),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchKelenchaFromStore: () => dispatch(fetchKelencha()),
    fetchClassicalsFromStore: () => dispatch(fetchclassicals()),
    fetchChristmasAnthemsFromStore: () => dispatch(fetchChristmasAnthems()),
    fetchEasterAnthemsFromStore: () => dispatch(fetchEasterAnthems()),
    fetchHymnsFromStore: () => dispatch(fetchHymns()),
    fetchAnthemsFromStore: () => dispatch(fetchAnthems()),
    fetchChoralBluesFromStore: () => dispatch(fetchChoralBlues()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KelenchaScreen);
