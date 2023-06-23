import { createSelector } from "@reduxjs/toolkit";

export const getPosts = (state) => state.posts.posts;
export const getUserPosts = (state) => state.posts.userPosts;
export const getPostComments = (state) => state.posts.commentsPost;
export const getComments = (state) => state.posts.commentsTotal;
export const getLikes = (state) => state.posts.likesTotal;

export const selectPosts = createSelector([getPosts], (posts) => {
  const postsSort = [...posts].sort((a, b) => b.date - a.date);
  return postsSort;
});

export const selectUserPosts = createSelector([getUserPosts], (posts) => {
  const postsSort = [...posts].sort((a, b) => b.date - a.date);
  return postsSort;
});

export const selectPostComments = createSelector(
  [getPostComments],
  (comments) => {
    const commentsSort = [...comments].sort((a, b) => a.date - b.date);
    return commentsSort;
  }
);
