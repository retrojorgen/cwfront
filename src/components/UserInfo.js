import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { login, logout, isLoggedIn } from '../utils/AuthService';



const Userbar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px 0 20px;
`;

const Username = styled.span`
  font-size: 13px;
  color: #9a9a9a;
  display: inline-block;
`;

const Userphoto = styled.span`
  display: inline-block;
  background: url(${(props) => props.photo ? props.photo: ""});
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-size: cover;
  margin-right: 20px;
`;

class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: false
    };
  }

  render () {
    let user = this.props.user || false; 
    let userFullName = this.props.user.name;
    let userPhoto = this.props.user && this.props.user.userInfoBlob && this.props.user.userInfoBlob.picture ? this.props.user.userInfoBlob.picture : '';

    return (
      <Userbar>
        <Userphoto photo={userPhoto}></Userphoto>
        <Username>{userFullName}</Username>
        
      </Userbar>
    )
  }
}

export default UserInfo;

