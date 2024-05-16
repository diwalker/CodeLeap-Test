import styled from 'styled-components';

const Input = styled.input`
  width: 96%;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding-left: 10px;
  margin-top: -15px;
  background-color: #fff;
  color: #333;
  font-weight: ${props => (props.isFocused ? 'normal' : 'bold')};

  &:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
`;

export default Input;
