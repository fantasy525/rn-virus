/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import RouterView from './src/routes/routes';

AppRegistry.registerComponent(appName, () => RouterView);
