import { AppNavigator } from '../navigators/AppNavigator';
import { NavigationActions } from 'react-navigation';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { actionTypes } from '../actions/actions';

export default navReducer = createNavigationReducer(AppNavigator);
