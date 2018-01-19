import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingBlock = styled.span`
  width: ${props => props.width ? props.width : 40}px;
  height: ${props => props.height ? props.height: 40}px;
  background-color: ${props => props.color ? props.color: 'white'};
  animation: ${rotate360} 1s ease-in-out infinite;
  display: inline-block;
  margin-left: 20px;
`;

export default LoadingBlock;
export { LoadingBlock };