import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fixExplains } from '../../utils'

export interface QueryState {
  value: {
   
  }
}

const initialState: QueryState = {
  value: {}
};
export const queryAsync = createAsyncThunk(
  'query/fetchQuery',
  async (query: string) => {
    const response = await fetch('/query/' + query).then(response => response.json());
    return response.data;
  }
);

export const favoriteAsync = createAsyncThunk(
  'query/favorite',
 async (params:object) => {
  const response = await fetch('/word', {method: "post", body: JSON.stringify(params), headers: {'content-type': 'application/json'}}).then(response => response.json());
  return response.data;
 }
)

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {  },
  extraReducers: (builder: any) => {
    builder
      .addCase(queryAsync.fulfilled, (state: any, action: any) => {
        if(action.payload.isWord) {
          const { query, translation, l, basic, isWord} = action.payload
          let { explains, phonetic} = basic
          explains = fixExplains(explains)
          state.value = {query, translation, l, explains, phonetic, isWord};
        } 
      })
  },
})

export const selectQuery = (state: RootState) => state.query.value;

export default querySlice.reducer;

