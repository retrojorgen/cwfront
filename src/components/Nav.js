import React, {Component} from 'react';
import styled from 'styled-components';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import logo from '../images/crewportalen-black.svg';
import UserInfo from './UserInfo';

const Navbar = styled.nav`
  position: relative;
  width: 100%;
  height: 60px;
  background: linear-gradient(45deg, #b946ee, #ee47a7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
  box-shadow: 0 0 6px rgba(0,0,0,0.1);
`;

const UserBar = styled.div`
  display: flex;
  color: white;
`;

const NavbarHeader = styled.div`
  a {
    display: inline-block;
    background: url(${logo});
    bakground-repeat: no-repeat;
    background-size: cover;
    width: 140px;
    height: 14px;
    text-indent: -999999px;
  }
`;


const standardBigButton = styled.button`
  padding: 10px 30px;
  border: 1px solid #cacaca;
  border-radius: 30px;
  font-size: 12px;
  text-transform: uppercase;
  outline: none;
  transition: all 0.25s linear;
  cursor: pointer;
  color: #9a9a9a;
  &:hover {
    box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
  }
  span {
    position: relative;
  }
`;

const LoginButton = styled(standardBigButton)`
  background: linear-gradient(90deg, #4756e3, #f56afa);
  background: linear-gradient(0deg, #4756e3, #4b34c2);
  color: white;
  border-color: transparent;
  border: 0;
  transition: all 0.25s ease-in-out;
  position: relative;
  overflow: hidden;
  &:before {
    position: absolute;
    left: 0;
    transform: translateX(100%);
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #f56afa);
    content: "";
    transition: all 0.1s ease-in-out;
  }
  &:hover {
    &:before {
      content: "";
      transform: translateX(0);
    }
    
  }
`;

const LogoutButton = styled(standardBigButton)`
  &:hover {
    border-color: #bd65f3;
    color: #bd65f3;
  }
`;

class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: false
    };
  }

  componentDidUpdate(prev) {

  }

  render () {
    let user = this.props.userData || false; 
    return (
      <Navbar>
        <NavbarHeader>
          
        </NavbarHeader>

        
            
          {
             (isLoggedIn()) ? (
                <UserBar>
                  <UserInfo user={user} />
                  <LogoutButton onClick={() => logout()}><span>Logg ut</span></LogoutButton> 
                </UserBar>
               ) 
              : 
              ( <LoginButton onClick={() => login()}><span>Logg Inn</span></LoginButton> )
           }
        

      </Navbar>
    )
  }
}

export default Nav;

//<NavLink to="/">Crewportalen</NavLink>