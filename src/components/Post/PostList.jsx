import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';

const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const PostList = ({ posts, username, onDelete, onEdit, fetchMorePosts }) => {
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, {
      threshold: 1.0
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader]);

  if (!Array.isArray(posts)) {
    return null;
  }

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    fetchMorePosts(page + 1);
  };

  return (
    <>
      <ListContainer>
        {posts.map(post => (
          <PostItem key={post.id} post={post} username={username} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </ListContainer>
      <div ref={loader}>
        <LoadMoreButton onClick={loadMore}>Load More</LoadMoreButton>
      </div>
    </>
  );
};

export default PostList;
