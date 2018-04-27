import React, { Component } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import { Add, Access } from './Buttons';
import AddEventForm from './AddEventForm';
import { 
  getUserData, 
  getEvents, 
  //userData, 
  getOtherEvents, 
  getPendingEvents, 
  addUserToPending } from '../utils/api';
import Moment from 'react-moment';
import 'moment/locale/nb';
import { ContentWrap } from './CommonWrappers';
//import {FaCalendarO} from 'react-icons/lib/fa'

import { isLoggedIn } from '../utils/AuthService';
import { LoadingBlock } from './Loaders.js';


const Events = styled(Add)``;

const Event = styled(Access)`
`;

const EventTitle = styled.div`
  background: linear-gradient(0deg, #4756e3, #4b34c2);
  display: flex;
  height: 250px;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  .date-to {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 6px 14px;
    font-size: 10px;
    text-transform: uppercase;
    background-color: white;
    border-radius: 20px;
    color: #696968;
  }
`;


const UserPhoto = styled.div`
  background: url(${(props) => props.photo});
  background-size: cover;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
`;

const MemberCount = styled.div`
  background: #4756e3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  padding-top: 9px;
  text-align: center;
  &:before {
    content: "${(props) => props.amount}";
  }
`;


const EventsHeader = styled.h2`
  color: #7e7e7e;
  font-size: 20px;
`;

class EventsList extends Component {
  constructor() {
    super()
    this.state = { 
      openAddEventForm: false, 
      events: [], 
      members: {},
      otherEvents: [],
      pendingEvents: []
    };
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
      that.setState({
        events: events.events, 
        members: events.members
      });
      console.log(events);
    });
  }

  getOtherEvents () {
    let that = this;
    getOtherEvents().then(function (events) {
      that.setState({otherEvents: events});
      console.log('other events', events);
    });
  }

  getPendingEvents () {
    getPendingEvents().then((events) => {
      this.setState({pendingEvents: events});
    });
  }



  componentDidMount() {
    this.getUser();
    this.getEvents();
    this.getOtherEvents();
    this.getPendingEvents();
  }
  

  openAddEventForm () {
    this.setState({openAddEventForm: true});
  }

  applyForMembershipToEvent (event, key, handler) {
    let otherEvents = this.state.otherEvents;
    otherEvents[key].loading = true;
    this.setState({otherEvents: otherEvents});
    addUserToPending(event._id).then(function () {
      this.getPendingEvents();
      this.getOtherEvents();
    }.bind(this));

  }

  eventCreated (event) {
    console.log('opprettet event', event);
  }

  render () {
    let now = new Date();


    let otherEvents = this.state.otherEvents.map((event, key) => {
      return(
        <div key={key.toString()}>
          <div className="left-col">
            <span className="color"></span>
            <span className="name">{event.name}</span>
            <span className="time-to"><Moment locale="nb" from={now}>{event.from}</Moment></span>
            
          </div>
          <div className="right-col">
            <span className="members">{event.members.length} medlemmer</span>
            <button className="apply-for-membership" onClick={this.applyForMembershipToEvent.bind(this, event, key)}>
              Søk medlemskap
              {event.loading && (
                <LoadingBlock width="10" height="10" color="white" />
              )}
            </button>
          </div>
        </div>
      )
    });

    let pendingEvents = this.state.pendingEvents.map((event, key) => {
      return(
        <div key={key.toString()}>
          <div className="left-col">
            <span className="color"></span>
            <span className="name">{event.name}</span>
            <span className="time-to"><Moment locale="nb" from={now}>{event.from}</Moment></span>
            
          </div>
          <div className="right-col">
            <span className="members">{event.members.length} medlemmer</span>
            <button className="apply-for-membership">
              Venter på svar
              {event.loading && (
                <LoadingBlock width="10" height="10" color="white" />
              )}
            </button>
          </div>
        </div>
      )
    });

    let events = this.state.events.map((event, key) => {
      //let fromDate = event.from;
      let toDate = event.to;
      let members = event.members;
      if(members.length > 5) {
        members = members.slice(0,5);
      }

      let membersList = members.map((member, key) => {
        let memberPhoto = this.state.members[member.userId].userInfoBlob.picture ? this.state.members[member.userId].userInfoBlob.picture : '';
        console.log(memberPhoto);

        return (
          <UserPhoto key={key.toString()} photo={memberPhoto}></UserPhoto>
        )
      });
      
      return (
        <Event key={key.toString()} to={`/event/view/${event._id}`}>
          <EventTitle>
            <span className="event-header-title">{event.name.split(" ")[0]}</span>
            <span className="date-to"><Moment locale="nb" from={now}>{toDate}</Moment></span>
          </EventTitle>
          <h2 className="title">{event.name}</h2>
          <div className="members">
            {membersList} <MemberCount amount={event.members.length} />
          </div>
        </Event>
      )
    });

    return (
      
      <div>
        <Nav userData={this.state.userData}/>
        <ContentWrap>
          <EventsHeader>Dine arrangement</EventsHeader>
          <Events>
            <Add onClick={this.openAddEventForm.bind(this)}>
              <span className="Addevent-plus">+</span>
              <span className="Addevent-label">Opprett arrangement</span>
            </Add>
            {events}
          </Events>
            <div>
              <EventsHeader>Dine søknader</EventsHeader>
              <div>
                {pendingEvents}
              </div>
            </div>
            <div>
              <EventsHeader>Andre arrangement</EventsHeader>
              <div>
                {otherEvents}
              </div>
            </div>
          <AddEventForm open={this.state.openAddEventForm} eventCreated={this.eventCreated.bind(this)}/>
        </ContentWrap>
      </div>
    );
  }
}

export default EventsList;