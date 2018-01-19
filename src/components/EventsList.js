import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';
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
//import {FaCalendarO} from 'react-icons/lib/fa'

import { isLoggedIn } from '../utils/AuthService';
import { LoadingBlock } from './Loaders.js';


const Events = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const AddEvent = styled.div`
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

const ContentWrap = styled.div`
  max-width: 1000px;
  margin: 120px auto 0 auto;
`;



const Event = styled(AddEvent)`
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

const EventGoToButton = styled.div`
  width: 100%;
  color: #6A6A6A;
  text-align: center;
  font-size: 11px;
  text-transform: uppercase;
  padding: 20px 30px;
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


const EventsListing = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const EventsListItem = styled.li`
  display: flex;
  padding: 2px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0 14px 20px #4a90e21f;
  margin-bottom: 1px;
  border-radius: 4px;

  .left-col {
    .color {
      background: linear-gradient(0deg, #4756e3, #4b34c2);
      width: 30px;
      height: 30px;
      display: inline-block;
      margin: 20px 20px 20px 20px;
      border-radius: 50%;
    }
    .name {
      color: ##696968;
      font-size: 16px;
      margin-right: 20px;
    }

    .time-to {
      font-size: 10px;
      text-transform: uppercase;
      padding: 10px 20px;
      background-color: #f5f3f3;
      color: #696968;
      border-radius: 20px;
    }
    display: flex;
    align-items: center;
  }
  .right-col {
    .members {
      font-size: 10px;
      text-transform: uppercase;
      padding: 10px 20px;
      border: 1px solid #f5f3f3;
      background-color: white;
      color: #696968;
      border-radius: 20px;
      margin-right: 20px;
    }
    .apply-for-membership {
      background: linear-gradient(90deg, #4756e3, #4b34c2);
      padding: 10px 20px;
      color: white;
      font-size: 10px;
      font-weight: bold;
      margin-right: 20px;
      text-transform: uppercase;
      border: 0;
      border-radius: 20px;
      cursor: pointer;
      outline: none;
    }
  }
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
        <EventsListItem key={key.toString()}>
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
        </EventsListItem>
      )
    });

    let pendingEvents = this.state.pendingEvents.map((event, key) => {
      return(
        <EventsListItem key={key.toString()}>
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
        </EventsListItem>
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
        <Event key={key.toString()}>
          <EventTitle>
            <span className="event-header-title">{event.name.split(" ")[0]}</span>
            <span className="date-to"><Moment locale="nb" from={now}>{toDate}</Moment></span>
          </EventTitle>
          <h2 className="title">{event.name}</h2>
          <div className="members">
            {membersList} <MemberCount amount={event.members.length} />
          </div>
          <EventGoToButton></EventGoToButton>
          <NavLink to={`/event/view/${event._id}`} className="show-arrangement">
          
            <div className="show-arrangement-button">Åpne arrangement</div>
          </NavLink>
        </Event>
      )
    });

    return (
      
      <div>
        <Nav userData={this.state.userData}/>
        <ContentWrap>
          <EventsHeader>Dine arrangement</EventsHeader>
          <Events>
            <AddEvent onClick={this.openAddEventForm.bind(this)}>
              <span className="Addevent-plus">+</span>
              <span className="Addevent-label">Opprett arrangement</span>
            </AddEvent>
            {events}
          </Events>
            <div>
              <EventsHeader>Dine søknader</EventsHeader>
              <EventsListing>
                {pendingEvents}
              </EventsListing>
            </div>
            <div>
              <EventsHeader>Andre arrangement</EventsHeader>
              <EventsListing>
                {otherEvents}
              </EventsListing>
            </div>
          <AddEventForm open={this.state.openAddEventForm} eventCreated={this.eventCreated.bind(this)}/>
        </ContentWrap>
      </div>
    );
  }
}

export default EventsList;