import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
//const 

const Add = styled(NavLink)`
  height: 300px;
  width: 260px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  outline: none;
  margin: 20px;
  box-shadow: 0 14px 20px #4a90e21f;
  &:hover {
    box-shadow: 0 14px 20px #4a90e247;
  }

  .Addevent-plus {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #4756e3;
    width: 50px;
    height: 50px;
    font-size: 22px;

    transform: translateX(-25px) translateY(-40px);
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #4756e3;
      opacity: 0.1;
    }
  }

  .Addevent-label {
    color: #4756e3;
    font-size: 12px;
  }
`;

const Access = styled(Add)`
justify-content: flex-start;
  border: 0px solid transparent;
  color: white;
  padding: 0;
  position: relative;
  overflow: hidden;
  .title {
    font-size: 16px;
    text-align: left;
    color: #696968;
    font-weight: normal;
    padding: 20px 30px;
    width: 100%;
    margin: 0;
  }

  .from-to-date {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }

  .members {
    text-align: left;
    width: 100%;
    padding: 0 30px 20px 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .show-arrangement {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    opacity: 0;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
    .show-arrangement-button {
      width: 100%;
      padding: 12px 20px;
      text-align: center;
      color: #696968;
      font-size: 11px;
      text-transform: uppercase;
      background-color: white;
      background-color: white;
      border-radius: 16px;
      
    }
  }
  
  &:hover {
    .show-arrangement {
      opacity: 1;
    }
  }
`;

export { Add, Access };