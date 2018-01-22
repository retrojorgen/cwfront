import React, { Component } from 'react';
//import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';
import { getUserData, getEvent } from '../utils/api';
//import Moment from 'react-moment';
import 'moment/locale/nb';

import { isLoggedIn } from '../utils/AuthService';
import { ContentWrap } from './CommonWrappers';

const EventName = styled.h1`

`;

class EventView extends Component {
  constructor() {
    super()
    this.state = { 
      event: [], 
      members: [],
      eventId: undefined 
    };
  }

  getUser () {
    if(isLoggedIn()) {
      getUserData().then((data) => {
        this.setState({userData: data});
      });
    }
  }

  buildMembers (event) {
    let members = event.event.members;
    members.forEach(function (member) {
      member.memberInfo = event.members[member.userId];
    });
    members = this.sortMembersByName(members);
    this.setState({members: members});
  }

  getEvent (id) {
    let that = this;
    getEvent(id).then(function (event) {
      that.buildMembers(event);
      that.setState({event: event.event});
      console.log(event);
    });
  }

  sortMembersByName (members, ascending = true) {
    return members.sort(function (a,b) {
      let nameA = a.memberInfo.name.toUpperCase();
      let nameB = b.memberInfo.name.toUpperCase();

      if(nameA < nameB) {
        return -1;
      }
      if(nameA > nameB) {
        return 1;
      }

      return 0;
    }) 
  }

  componentDidMount() {
    let eventId = this.props.match.params.id;
    this.getUser();
    this.getEvent(eventId);
    this.setState({eventId: eventId});
  }
  
  render () {
    let { event, members } = this.state;
    console.log(event, members);
    return (
      
      <div>
        <Nav userData={this.state.userData}/>
        <ContentWrap>
          <EventName>
            {event.name}
          </EventName>
        </ContentWrap>
      </div>
    );
  }
}

export default EventView;