import styled from 'styled-components/native';

interface Props {
  buttonColor: string; 
}

export const Container = styled.TouchableOpacity<Props>`
  height: 36px;
  width: 36px;
  border-radius: 6px;

  justify-content: center;
  align-items: center;

  background-color: ${({ buttonColor }) => buttonColor};
`;