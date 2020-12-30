import TrackPlayer from 'react-native-track-player'

export default async function PlayerServices() {

    // TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy())

    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play() )

    TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext())

    TrackPlayer.addEventListener('remote-previous', () => TrackPlayer.skipToPrevious())

   TrackPlayer.addEventListener('playback-queue-ended',(a)=>{
       TrackPlayer.stop()
    
    });
    // ...
    
}; 