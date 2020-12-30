import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player'
import PlayerServices from './assets/PlayerServices'
// import {PlayerServices} from './Context/TarckContext'
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
TrackPlayer.registerPlaybackService(()=>PlayerServices)
