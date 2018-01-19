import React, { Component } from 'react';
//import { NavLink } from 'react-router-dom';
//import styled from 'styled-components';
//import Nav from './Nav';
import { getUserData, getEvents } from '../utils/api';
//import Moment from 'react-moment';
import 'moment/locale/nb';

import { isLoggedIn } from '../utils/AuthService';



class EventView extends Component {
  constructor() {
    super()
    this.state = { openAddEventForm: false, events: [], members: {} };
  }

  getUser () {
    if(isLoggedIn()) {
      getUserData().then((data) => {
        this.setState({userData: data});
      });
    }
  }

  getEvents () {
    let that = this;
    getEvents().then(function (events) {
      that.setState({events: events.events, members: events.members});
      console.log(events);
    });
  }

  componentDidMount() {
    this.getUser();
    this.getEvents();
  }
  

  openAddEventForm () {
    this.setState({openAddEventForm: true});
  }

  eventCreated (event) {
    console.log('opprettet event', event);
  }

  render () {

    return (
      
      <div>
        hest
      </div>
    );
  }
}

export default EventView;