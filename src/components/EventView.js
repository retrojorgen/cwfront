import React, { Component } from 'react';
//import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';
import { getUserData, getEvent } from '../utils/api';
//import Moment from 'react-moment';
import 'moment/locale/nb';
import EventHeader from './EventHeader';
import { isLoggedIn } from '../utils/AuthService';
import { ContentWrap, ItemsTableWrapper } from './CommonWrappers';
import { Userphoto } from './UserInfo';

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
    console.log('getting user', 'yo', isLoggedIn());
    if(isLoggedIn()) {
      getUserData().then((data) => {
        console.log('getting user',data);
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
        <EventHeader name={event.name} from={event.from} to={event.to} />
        <ContentWrap>
          
          <ItemsTableWrapper>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Navn</th>
                  <th>Telefonnummer</th>
                  <th>Crew</th>
                  <th>Leder</th>
                  <th>Verifisert</th>
                </tr>
              </thead>
              <tbody>
              {members.map((member, key) => (
                  <tr key={key}>
                    <td style={{width: '50px'}}><Userphoto photo={member.memberInfo.userInfoBlob.picture} /></td>
                    <td>{member.memberInfo.name}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ItemsTableWrapper>
        </ContentWrap>
      </div>
    );
  }
}

export default EventView;