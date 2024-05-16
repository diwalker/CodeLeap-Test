import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from './ButtonMain';

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
  width: 320px;
  background: #fff;
  color: #000;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const DeletePostModal = ({ postId, onDelete, onClose }) => {
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
        <h4>Are you sure you want to delete this post?</h4>
        <Buttons>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onDelete(postId)}>Delete</Button>
        </Buttons>
      </ModalContainer>
    </ModalBackground>
  );
};

export default DeletePostModal;
