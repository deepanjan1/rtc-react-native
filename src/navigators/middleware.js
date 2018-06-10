import {
  createNavigationPropConstructor,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

// building redux utils for navigation
export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

export const navigationPropConstructor = createNavigationPropConstructor('root');
