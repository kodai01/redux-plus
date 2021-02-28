import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { isTypeQueryNode } from 'typescript';
import { RootState } from '../../app/store';

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
  postid: number;
  name: string;
  email: string;
  body: string;
};

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: 'DELETE',
    });
    console.log('idは', id);
    return id;
  }
);

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
    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteComment.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log('payload', payload);
      commentsAdapter.removeOne(state, payload);
    });
  },
});

console.log(commentsAdapter);
console.log(commentSlice);

export const commentsSelectors = commentsAdapter.getSelectors<RootState>(
  (state) => state.comments
);

// export const {
//   selectIds,
//   selectById,
//   selectTotal,
//   selectEntities,
//   selectAll,
// } = commentsSelectors

export const { setAllComments } = commentSlice.actions;

export default commentSlice.reducer;
