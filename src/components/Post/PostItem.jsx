import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const PostContainer = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const PostItem = ({ post, username, onDelete, onEdit }) => {
  return (
    <PostContainer>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <small>Posted by {post.username} on {new Date(post.created_datetime).toLocaleString()}</small>
      {post.username === username && (
        <div>
          <Button onClick={() => onEdit(post.id)}>EDIT</Button>
          <Button onClick={() => onDelete(post.id)}>DELETE</Button>
        </div>
      )}
    </PostContainer>
  );
};

export default PostItem;
