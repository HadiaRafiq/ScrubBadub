/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Config from 'react-native-config';
import Mapbox from '@rnmapbox/maps';

import 'react-native-gesture-handler';

import App from './App';
import { name as appName } from './app.json';

// Set Mapbox access token
if (Config.MAP_BOX_PUBLIC_ACCESS_TOKEN) {
  Mapbox.setAccessToken(Config.MAP_BOX_PUBLIC_ACCESS_TOKEN);
}

AppRegistry.registerComponent(appName, () => App);
