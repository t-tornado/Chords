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
    },[downloadedSongs])
    
    return (
      <> 
      {
        dd 
        ? <CardDownloaded 
        artist={item.artist}  
        title={item.title} 
        id={item.id} 
        composer={item.description} 
        key={item.id} 
        numDownloads={item.downloads} 
        artwork={item.artwork}
        likes={item.likes}
        />
        :  <CardWithDownload 
        artist={item.artist}  
        title={item.title} 
        id={item.id} 
        composer={item.description} 
        key={item.id} 
        url={item.url} 
        numDownloads={item.downloads} 
        collection={'hymns'}
        artwork={item.artwork}
        likes={item.likes}
        duration={item.duration}
        genre={item.genre}
        />
      }
      </>
    )
      }

export default RenderList

/*
artist,title, id, composer,numDownloads,artwork,likes
artist,title, id, composer, url,numDownloads,genre,artwork,likes,duration



 artist={item.artist}  
        title={item.title} 
        id={item.id} 
        composer={item.description} 
        key={item.id} 
        url={item.url} 
        numDownloads={item.downloads} 
        collection={'anthems'}
        artwork={item.artwork}
        likes={item.likes}
*/

