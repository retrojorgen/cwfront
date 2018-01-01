import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import logo from '../images/crewportalen-black.svg';
import UserInfo from './UserInfo';

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
  box-shadow: 0 0 6px rgba(0,0,0,0.1);
`;

const UserBar = styled.div`
  display: flex;
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
`;

const LoginButton = styled(standardBigButton)`
  background: linear-gradient(90deg, #4756e3, #f56afa);
  color: white;
  border-color: transparent;
  &:hover {
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
    console.log('got stuff', this.props, prev);
  }

  render () {
    let user = this.props.userData || false; 
    return (
      <Navbar>
        <NavbarHeader>
          <NavLink to="/">Crewportalen</NavLink>
        </NavbarHeader>

        
            
          {
             (isLoggedIn()) ? (
                <UserBar>
                  <UserInfo user={user} />
                  <LogoutButton onClick={() => logout()}>Logg ut </LogoutButton> 
                </UserBar>
               ) 
              : 
              ( <LoginButton onClick={() => login()}>Logg Inn</LoginButton> )
           }
        

      </Navbar>
    )
  }
}

export default Nav;

