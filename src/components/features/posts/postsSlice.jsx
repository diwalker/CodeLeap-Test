import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://dev.codeleap.co.uk/careers/';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(BASE_URL);
  return response.data.results;
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
  const response = await axios.post(BASE_URL, post);
  return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, post }) => {
  const response = await axios.patch(`${BASE_URL}${id}/`, post);
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await axios.delete(`${BASE_URL}${id}/`);
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload); 
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
