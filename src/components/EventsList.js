import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';
import AddEventForm from './AddEventForm';
import { getUserData, userData } from '../utils/api';

import { isLoggedIn } from '../utils/AuthService';


const Events = styled.div`
  display: flex;

`;

const AddEvent = styled.button`
  height: 200px;
  width: 160px;
  border: 1px solid #4756e3;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    box-shadow: 4px 4px 20px rgba(0,0,0,0.1);
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

const ContentWrap = styled.div`
  max-width: 1000px;
  margin: 120px auto 0 auto;
`;

class EventsList extends Component {
  constructor() {
    super()
    this.state = { openAddEventForm: false };
  }

  getUser () {
    if(isLoggedIn()) {
      getUserData().then((data) => {
        this.setState({userData: data});
      });
    }
  }

  componentDidMount() {
    this.getUser();
  }

  openAddEventForm () {
    this.setState({openAddEventForm: true});
  }

  render () {
    let openAddEventForm = this.state.openAddEventForm;
    console.log(openAddEventForm, 'hest');
    return (
      
      <div>
        <Nav userData={this.state.userData}/>
        <ContentWrap>
          <Events>
            <AddEvent onClick={this.openAddEventForm.bind(this)}>
              <span className="Addevent-plus">+</span>
              <span className="Addevent-label">Opprett event</span>
            </AddEvent>
          </Events>
          <AddEventForm open={this.state.openAddEventForm}/>
        </ContentWrap>
      </div>
    );
  }
}

export default EventsList;