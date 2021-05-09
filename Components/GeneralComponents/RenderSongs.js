import React from "react";
import WithDownloadButton from "../Cards/WithDownloadButton";
import AlreadyDownloaded from "../Cards/AlreadyDownloaded";
// import { useDownloadedSongs } from "../../Context/MainAppContext";
import {songs} from '../../assets/audio_store'

const RenderList = ({ item }) => {
  const [songDownloaded, setSongDownloaded] = React.useState(false);
  const downloadedSongs = songs

  React.useEffect(() => {
    let cleanUp = true
    if(cleanUp){downloadedSongs.forEach(song => (item.title == song.title )&& setSongDownloaded(song.downloaded))
    }
    return () => cleanUp = false
  },[songDownloaded]);

  return (
    <>
      {songDownloaded ? (
        <AlreadyDownloaded
          key={item.id}
          title={item.title}
          artist={item.artist}
          composer={item.composer} //item.composer must be set to description from firestore
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
          composer={item.composer}
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
