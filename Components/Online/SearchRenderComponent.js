import React from "react";
import CardWithDownload from "../Cards/CardWithDownload";
import CardDownloaded from "../Cards/CardDownloaded";
import { useDownloadedSongs } from "../../Context/TarckContext";

const RenderList = ({ item }) => {
  const [dd, setDd] = React.useState();
  const downloadedSongs = useDownloadedSongs();

  React.useEffect(() => {
    downloadedSongs.forEach((song) => {
      if (song.title == item.title) {
        setDd(true);
      }
    });
  });

  return (
    <>
      {dd ? (
        <CardDownloaded
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
        <CardWithDownload
          artist={item.artist}
          title={item.title}
          id={item.id}
          composer={item.description}
          key={item.id}
          url={item.url}
          numDownloads={item.downloads}
          collection={item.genre}
          artwork={item.artwork}
          likes={item.likes}
        />
      )}
    </>
  );
};

export default RenderList;
