import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
export interface WordsState {
  allWordList: [],
 
}

const initialState: WordsState = {
    allWordList: [],
};
export const allWordListAsync = createAsyncThunk(
  'word/fetchWordList',
  async () => {
    const response = await fetch('/word/queryByCondition/all').then(response => response.json());
    return response;
  }
);

export const deleteWordListAsync = createAsyncThunk(
    'word/deleteWord',
    async (word:string) => {
      const response = await fetch(`/word/${word}`, {method: "delete"}).then(response => response.json());
      return response;
    }
  );

export const wordListSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(allWordListAsync.fulfilled, (state: any, action: any) => {
        state.allWordList = action.payload;

      })
  }
})


export const selectAllWordList = (state: RootState) => state.allWordList.allWordList;

export default wordListSlice.reducer;

