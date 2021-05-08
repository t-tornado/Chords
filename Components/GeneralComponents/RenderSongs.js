import React from "react";
import WithDownloadButton from "../Cards/WithDownloadButton";
import AlreadyDownloaded from "../Cards/AlreadyDownloaded";
// import { useDownloadedSongs } from "../../Context/MainAppContext";
import {songs} from '../../assets/audio_store'

const RenderList = ({ item }) => {
  const [songDownloaded, setSongDownloaded] = React.useState();
  const downloadedSongs = songs

  React.useEffect(() => {
    downloadedSongs.forEach((song) => song.downloaded && setSongDownloaded(true));
  },[]);

  return (
    <>
      {songDownloaded ? (
        <AlreadyDownloaded
          key={item.id}
          title={item.title}
          artist={item.artist}
          composer={item.description}
          numDownloads={item.downloads}
          id={item.id}
          artwork={item.artwork}
          likes={item.likes}
        />
      ) : (
        <WithDownloadButton
          artist={item.artist}
          title={item.title}
          id={item.id}
          composer={item.description}
          genre={item.genre}
          duration={item.duration}
          key={item.id}
          url={item.url}
          numDownloads={item.downloads}
          artwork={item.artwork}
          likes={item.likes}
        />
      )}
    </>
  );
};

export default RenderList;
