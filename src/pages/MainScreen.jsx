import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost, updatePost, deletePost } from '../components/features/posts/postsSlice';
import styled, { createGlobalStyle } from 'styled-components';
import Input from '../components/Input';
import InputArea from '../components/InputArea';
import Button from '../components/ButtonMain';
import EditPostModal from '../components/EditPostModal';
import DeletePostModal from '../components/DeletePostModal';
import Icons from '../components/Icons';
import Logout from '../components/Logout';

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 12px; 
  }

  ::-webkit-scrollbar-track {
    background: #000; 
    border-radius: 10px; 
  }

  ::-webkit-scrollbar-thumb {
    background-color: #7695EC; 
    border-radius: 10px;
    border: 3px solid #000;
  }

  
  scrollbar-width: thin; 
  scrollbar-color: #7695EC #000;
`;


const Container = styled.div`
  width: 100%;
  max-width: 800px;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background: #DDDDDD;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ContentWrapper = styled.div`
  position: initial;
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  background: #f9f9f9;
  color: #000;
  border: 1px solid #ccc;
  border-radius: 0 0 8px 8px;
  padding: 10px;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const PostContainer = styled.li`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  color: #000;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
`;

const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
`;

const Welcome = styled.div`
  display: flex;
  background: #7695EC;
  color: #fff;
  padding-left: 30px;
  width: 100%;
  border-radius: 8px 8px 0 0;
  box-sizing: border-box;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const PostTitle = styled.div`
  width: 100%;
  background-color: #7695EC;
  color: #fff;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PostedBy = styled.small`
  font-size: 12px;
  color: #7695EC;
  margin: 0 0 10px 10px;
`;

const PostContent = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
  margin-top: 5px;

  @media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
  }
`;

const MainScreen = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editPost, setEditPost] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);
  const username = localStorage.getItem('username');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSubmit = () => {
    if (username && title && content) {
      dispatch(createPost({ username, title, content }));
      setTitle('');
      setContent('');
    }
  };

  const handleUpdate = (id, newTitle, newContent) => {
    dispatch(updatePost({ id, post: { title: newTitle, content: newContent } }));
    setEditPost(null);
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    setDeletePostId(null);
  };

  const sortedPosts = Array.isArray(posts) ? [...posts].sort((a, b) => new Date(b.created_datetime) - new Date(a.created_datetime)) : [];

  return (
    
    <Container>
      <ContentWrapper>
        <Welcome>
          <h2>CodeLeap Network. Welcome @{username}</h2>
          <Logout onClick={() => localStorage.removeItem('username')}>Logout</Logout>
        </Welcome>

        <FormContainer>
          <h2>What’s on your mind?</h2>
          <p>Title</p>
          <Input 
            type="text" 
            placeholder="Your Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <p>Content</p>
          <InputArea
            type="text" 
            placeholder="Your Content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
          <Button onClick={handleSubmit} disabled={!title || !content}>
            Create
          </Button>
        </FormContainer>

        <ListContainer>
          {sortedPosts.map(post => (
            <PostContainer key={post.id}>
              <PostTitle>
                {post.title}
                {post.username === username && (
                  <Icons post={post} setEditPost={setEditPost} setDeletePostId={setDeletePostId} />
                )}
              </PostTitle>
              <PostContent>{post.content}</PostContent>
              <PostedBy>Posted by {post.username} on {new Date(post.created_datetime).toLocaleString()}</PostedBy>
            </PostContainer>
          ))}
        </ListContainer>

        {editPost && (
          <EditPostModal 
            post={editPost} 
            onUpdate={handleUpdate} 
            onClose={() => setEditPost(null)}
          />
        )}

        {deletePostId && (
          <DeletePostModal 
            postId={deletePostId} 
            onDelete={handleDelete} 
            onClose={() => setDeletePostId(null)}
          />
        )}
      </ContentWrapper>
    </Container>
  );
};

export default MainScreen;
