import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    return await fetch(
      'https://jsonplaceholder.typicode.com/comments?_limit=10'
    ).then((res) => res.json());
  }
);

type Comments = {
  id: number;
};

const commentsAdapter = createEntityAdapter<Comments>({
  selectId: (comment) => comment.id,
});
const commentSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState({ loading: false }),
  reducers: {
    setAllComments: commentsAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.loading = true;
      commentsAdapter.setAll(state, payload);
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setAllComments } = commentSlice.actions;

export default commentSlice.reducer;
