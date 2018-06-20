import { AppNavigator } from '../navigators/AppNavigator';
import { NavigationActions } from 'react-navigation';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { actionTypes } from '../actions/actions';

export default navReducer = createNavigationReducer(AppNavigator);

// const router = AppNavigator.router;
//
// const firstAction = router.getActionForPathAndParams('Dashboard');
// const tempNavState = router.getStateForAction(firstAction);
//
// const secondAction = router.getActionForPathAndParams('Login');
// const initialNavState = router.getStateForAction(secondAction, tempNavState);
//
// export default navReducer = (state=initialNavState, action) => {
//   let nextState;
//   switch (action.type) {
//     case 'Login':
//       nextState = router.getStateForAction(
//         NavigationActions.back(),
//         state,
//       );
//       break;
//     default:
//       nextState = router.getStateForAction(action.state);
//       break;
//   }
// };
