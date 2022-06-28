import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import QueryReducer from './reducer/QuerySlice';
import WordSlice from './reducer/WordSlice';
import CheckRememberSlice from './reducer/CheckRememberSlice';
import WordListSlice from './reducer/WordListSlice';

export const store = configureStore({
  reducer: {
    query: QueryReducer,
    word: WordSlice,
    checkRemember: CheckRememberSlice,
    allWordList: WordListSlice
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
