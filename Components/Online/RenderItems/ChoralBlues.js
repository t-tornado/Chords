import React from 'react'
import CardWithDownload from '../CardWithDownload'
import CardDownloaded from '../CardDownloaded'
import {useDownloadedSongs} from '../../../Context/TarckContext'

const RenderList = ({item}) => {
    const [dd,setDd] = React.useState()
    const downloadedSongs = useDownloadedSongs()
   
    React.useEffect(()=>{
      downloadedSongs.forEach(song => {
        if(song.title == item.title) { 
    setDd(true)
        }
      })
    })
    return (
      <>
      {
        dd 
        ? <CardDownloaded 
        key={item.id} 
        title={item.title} 
        artist={item.artist} 
        composer={item.description} 
        numDownloads={item.downloads} 
        id={item.id} 
        artwork={item.artwork}
        likes={item.likes}
        />
        :  <CardWithDownload 
        artist={item.artist} 
        title={item.title} 
        id={item.id} 
        composer={item.description}
        genre={item.genre}
        duration={item.duration} 
        key={item.id} 
        url={item.url} 
        numDownloads={item.downloads} 
        collection={'choralBlues'}
        artwork={item.artwork}
        likes={item.likes}
        />
      }
      </>
    )
      }

export default React.memo(RenderList)