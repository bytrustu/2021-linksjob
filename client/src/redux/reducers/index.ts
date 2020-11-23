import { combineReducers } from 'redux';
import companyReducer, { ICompanyReducerState } from './companyReducer';

export interface IReducerState {
  companyReducer: ICompanyReducerState,
}

const rootReducer = combineReducers({
  companyReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;