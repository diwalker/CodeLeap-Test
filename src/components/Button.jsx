import styled from 'styled-components';

const Button = styled.button`
  width: 111px;
  height: 32px;
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

export default Button;
