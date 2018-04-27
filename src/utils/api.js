import axios from 'axios';
import { getAccessToken } from './AuthService';

const BASE_URL = 'http://localhost:3333';
let userData = false;

/**
function getFoodData() {
  const url =  `${BASE_URL}/api/jokes/food`;
  return axios.get(url).then(response => response.data);
}

function getCelebrityData() {
  const url = `${BASE_URL}/api/jokes/celebrity`;
  return axios.get(url, {
     headers: {
       Authorization: `Bearer ${getAccessToken()}`
     } 
  }).then(response => response.data);
}
**/

function createEvent(eventData) {
  const url = `${BASE_URL}/api/event/create`;

  return axios.post(url, eventData, {
     headers: {
       Authorization: `Bearer ${getAccessToken()}`
     } 
  }).then(response => {
    return response.data;
  });
}

function addUserToPending(eventId) {
  const url = `${BASE_URL}/api/event/apply/${eventId}`;

  return axios.put(url, eventId, {
     headers: {
       Authorization: `Bearer ${getAccessToken()}`
     } 
  }).then(response => {
    return response.data;
  });
}

function updateUserProfile(update) {
  const url = `${BASE_URL}/api/user/update/profile`;

  return axios.put(url, update, {
     headers: {
       Authorization: `Bearer ${getAccessToken()}`
     } 
  }).then(response => {
    return response.data;
  });
}

function getEvent(id) {
  const url = `${BASE_URL}/api/event/${id}`;


  return axios.get(url, {
     headers: {
       Authorization: `Bearer ${getAccessToken()}`
     } 
  }).then(response => {
    return response.data;
  });
}

function getEvents() {
  const url = `${BASE_URL}/api/events`;


  return axios.get(url, {
     headers: {
       Authorization: `Bearer ${getAccessToken()}`
     } 
  }).then(response => {
    userData = response.data;
    return response.data;
  });
}

function getOtherEvents() {
  const url = `${BASE_URL}/api/events/other`;

  return axios.get(url, {
     headers: {
       Authorization: `Bearer ${getAccessToken()}`
     } 
  }).then(response => {
    userData = response.data;
    return response.data;
  });
}

function getPendingEvents() {
  const url = `${BASE_URL}/api/events/pending`;

  return axios.get(url, {
     headers: {
       Authorization: `Bearer ${getAccessToken()}`
     } 
  }).then(response => {
    userData = response.data;
    return response.data;
  });
}

function getUserData() {
  const url = `${BASE_URL}/api/user`;

  return axios.get(url, {
     headers: {
       Authorization: `Bearer ${getAccessToken()}`
     } 
  }).then(response => {
    userData = response.data;
    return response.data;
  });
}

function getUserDataFromID(id) {
  const url = `${BASE_URL}/api/user/${id}`;

  return axios.get(url, {
     headers: {
       Authorization: `Bearer ${getAccessToken()}`
     } 
  }).then(response => {
    userData = response.data;
    return response.data;
  });
}

export {
  getUserData, 
  getUserDataFromID,
  userData, 
  createEvent, 
  getEvents, 
  getOtherEvents, 
  getPendingEvents, 
  addUserToPending,
  getEvent,
  updateUserProfile
};