import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import company, { ICompanyReducerState } from './companyReducer';
import user, { IUserReducerState } from './userReducer';

export interface IReducerState {
  user: IUserReducerState,
  company: ICompanyReducerState,
}


const rootReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default : {
      const combineReducer = combineReducers({
        user,
        company,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;