import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator,
} from 'react-navigation-redux-helpers';
import { AppNavigator } from './AppNavigator';

// building redux utils for navigation
export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

export const navigationPropConstructor = reduxifyNavigator(AppNavigator, 'root');
