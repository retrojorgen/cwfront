import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { login, logout, isLoggedIn } from '../utils/AuthService';

class Nav extends Component {

  render () {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <NavLink className="navbar-brand" to="/">Chuck Norris World</NavLink>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <NavLink to="/">Food Jokes</NavLink>
          </li>
          <li>
          {
            ( isLoggedIn() ) ? <NavLink to="/special">Celebrity Jokes</NavLink> :  ''
           }
          
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            
          {
             (isLoggedIn()) ? ( <button className="btn btn-danger log" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
           }
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav;

