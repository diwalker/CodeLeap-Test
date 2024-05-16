import styled from 'styled-components';

const ButtonMain = styled.button`
  width: 95px;
  height: 26px;
  background: ${props => (props.disabled ? '#ccc' : '#007bff')};
  color: #fff;
  border: none;
  border-radius: 8px;
  align-self: flex-end;
  padding: 0 10px;
  margin-right: 15px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${props => (props.disabled ? '#ccc' : '#0056b3')};
  }
`;

export default ButtonMain;
