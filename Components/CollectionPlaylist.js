import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Dimensions,
} from "react-native";
import { useDownloadedSongs } from "../Context/TarckContext";

import CardWithoutDownloadButton from "./Cards/CardWithoutDownloadButton";
import Footer from "./FlatlistFooter";
import Header from "./LibraryHeader";
import { twenty } from "../Config/Dimensions";
import { Colors } from "../assets/colors";
import { initialLoad } from "../Redux/actions/DownloadAction";
import { EmptyComponent } from "./MaxPlaylist";

const Home1 = () => {
  let { container } = styles;
  const songs = useDownloadedSongs();

  React.useEffect(() => {
    initialLoad();
  }, []);

  return (
    <View style={container}>
      <Header />
      <View>
        <FlatList
          ListEmptyComponent={EmptyComponent}
          ListFooterComponent={() => <Footer />}
          data={songs}
          renderItem={({ item, index }) => (
            <CardWithoutDownloadButton
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
    paddingTop: twenty,
    backgroundColor: Colors.screens_Background,
  },
});

export default React.memo(Home1);
