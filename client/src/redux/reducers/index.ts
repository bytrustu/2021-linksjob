import { combineReducers } from 'redux';
import company, { ICompanyReducerState } from './companyReducer';
import user, { IUserReducerState } from './userReducer';

export interface IReducerState {
  user: IUserReducerState,
  company: ICompanyReducerState,
}

const rootReducer = combineReducers({
  user,
  company,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;