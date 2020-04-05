import {combineReducers} from 'redux';
import {reducer as data} from './data/data';
import {reducer as app} from './app/app';
import {reducer as user} from './user/user';
import {reducer as review} from './review/review';
import {reducer as favorite} from './favorite/favorite';
import NameSpace from './name-space';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APP]: app,
  [NameSpace.USER]: user,
  [NameSpace.REVIEW]: review,
  [NameSpace.FAVORITE]: favorite
});
