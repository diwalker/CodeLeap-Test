import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from './Input';
import ButtonMain from './ButtonMain';

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 500px;
  max-width: 90%; 
  background: #fff;
  color: #000;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const EditPostModal = ({ post, onUpdate, onClose }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSave = () => {
    onUpdate(post.id, title, content);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <ModalBackground>
      <ModalContainer>
        <h2>Edit Post</h2>
        <Input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ marginBottom: '30px', width: '100%' }}
        />
        <Input 
          type="text" 
          placeholder="Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          style={{ marginBottom: '20px', width: '100%' }}
        />
        <Buttons>
          <ButtonMain onClick={onClose}>Cancel</ButtonMain>
          <ButtonMain onClick={handleSave}>Save</ButtonMain>
        </Buttons>
      </ModalContainer>
    </ModalBackground>
  );
};

export default EditPostModal;
