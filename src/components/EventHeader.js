import React, { Component } from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ContentWrap } from './CommonWrappers';
import Moment from 'react-moment';
import 'moment/locale/nb';
import {FaCalendarO} from 'react-icons/lib/fa'

const EventMenu = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-end;
  
`;

const EventItem = styled.div`
  
  text-transform: uppercase;
  font-size: 0.8em;
  a {
    color: inherit;
    text-decoration: none;
    letter-spacing: 1px;
    padding: 0 0 10px 0;
    margin-right: 40px;
    display: block;
  }
`;

const EventTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0 30px 0;
`;

const EventHeaderContainer = styled.div`
  background: white;
  h1 {
    font-size: 1.4em;
    margin: 0;
    padding: 0;
  }
  h2 {
    color: #ee47a7;
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: bold;
    letter-spacing: 1px;
    span {
      margin-right: 10px;
    }
    time {
      font-weight: normal;
    }
  }
`;

const CompoundTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const CalendarWrap = styled.div`
  padding: 0 20px 10px 0;
  font-size: 2.4em;
  position: relative;
  &:after {
    content: '${(props) => props.startDay}';
    color: black;
    position: absolute;
    left: 0;
    top: 18px;
    display: flex;
    justify-content: center;
    width: 38px;
    font-size: 0.5em;
  }
`;

export default class EventHeader extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  render () {
    console.log(this.props);
    var currentDate = new Date();
    var startDay = new Date(this.props.from).getDay();

    return (
      <EventHeaderContainer>
        <ContentWrap>
          <EventTop>
            <CompoundTop>
              <CalendarWrap startDay={startDay}>
                <FaCalendarO />
              </CalendarWrap>
              <div>
                <h1>{this.props.name} hest</h1>
                <h2>
                  <span>Fra: <Moment format="DD/MM/YYYY">{this.props.from}</Moment></span>
                  <span>Til: <Moment format="DD/MM/YYYY">{this.props.to}</Moment></span>
                </h2>
              </div>
            </CompoundTop>
            <div className="time-to">
              <Moment locale="nb" from={currentDate}>{this.props.from}</Moment>
            </div>
          </EventTop>
          <EventMenu>
            <EventItem><NavLink to="/hest">Forside</NavLink></EventItem>
            <EventItem><NavLink to="/hest">Crew</NavLink></EventItem>
            <EventItem><NavLink to="/hest">Søknader</NavLink></EventItem>
          </EventMenu>
        </ContentWrap>
      </EventHeaderContainer>
    )
  }
}
