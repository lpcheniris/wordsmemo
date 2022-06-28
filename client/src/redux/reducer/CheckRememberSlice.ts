import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
// import { generateRememberList} from '../../utils'


export interface WordsState {

  checkRememberList: [],
  checkRememberResult: any,
}

const initialState: WordsState = {
  checkRememberList: [],
  checkRememberResult: null
};
export const getCheckRememnerListAsync = createAsyncThunk(
  'word/fetchWordListNotRemember',
  async () => {
    const response = await fetch('/word/queryByCondition/checkRemember').then(response => response.json());
    return response;
  }
);

export const handleRememberStatusAsync = createAsyncThunk(
  'word/handleRememberStatus',
  async (data:any) => {
    const response = await fetch(`/word/uptateRememberStatus/${data.query}/${data.status}`, {method: 'put'}).then(response => response.json());
    return response;
  }
);

export const checkRememberSlice = createSlice({
  name: 'checkRemember',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getCheckRememnerListAsync.fulfilled, (state: any, action: any) => {
        state.checkRememberList = action.payload;
      })
      .addCase(handleRememberStatusAsync.fulfilled, (state: any, action: any) => {
        state.checkRememberResult = action.payload;

      })
  }
})

export const selectCheckRememberList = (state: RootState) => state.checkRemember.checkRememberList;

export default checkRememberSlice.reducer;

