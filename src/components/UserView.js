import React, { Component } from 'react';
//import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';
import { getUserData, getEvent, getUserDataFromID, updateUserProfile } from '../utils/api';
//import Moment from 'react-moment';
import 'moment/locale/nb';
import EventHeader from './EventHeader';
import { isLoggedIn } from '../utils/AuthService';
import { ContentWrapNarrow, ItemsTableWrapper} from './CommonWrappers';
import { Userphoto } from './UserInfo';

import { FaChild, FaHome, FaAmbulance, FaEyedropper, FaCutlery  } from 'react-icons/lib/fa'

const EventName = styled.h1`

`;

const Input = styled.input`
  padding: 10px;
  font-size: 0.9em;
  width: ${props => props.width ? props.width : '100%'};
  border-radius: 4px;
  border: 1px solid #d7d7d7;
  outline: none;
  &.error {
    background-color: #f3d1d1;
  }
`;

const SectionsRow = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  &:before {
    content: "";
    position: absolute;
    top: 24px;
    left: 0;
    width: 100%;
    background-color: #d7d7d7;
    height: 1px;
  }
`;

const SectionsRowItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  background-color: #ECF0F1;
  position: relative;
  cursor: pointer;
  &:hover {
    .section-name {
      transform: translateY(-2px);
    }
    .section-circle {
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      transform: translateY(-2px);
      background-color: #ee47a7;
      color: white;
    }
  }
  .section-circle {
    display: flex;
    width: 28px;
    height: 28px;
    background-color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    z-index: 10;
    margin-right: 10px;
    transition: all 0.25s ease-in-out;

    
  }
  .section-name {
    text-transform: uppercase;
    font-size: 0.8em;
    
    position: relative;
    transition: all 0.25s ease-in-out;
  }
`;

const SectionIdentifier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 0 0 100px;
  overflow: hidden;
  .section-identifier-circle {
    display: flex;
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    z-index: 10;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    background-color: #d7d7d7;
    height: 100%;
  }
  &.down {
    &:before {
      top: 50%;
    }
  }
  &.up {
    &:before {
      top: -50%;
    }
  }
`

const FormRowRange = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 12px;
    width: 100%;
    height: 1px;
    background-color: #d7d7d7;
    z-index: 4;
  }
`;

const FormRowRangeItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  .toggle-icon {
      display: flex;
      margin-bottom: 17px;
      justify-content: center;
      cursor: pointer;
      position: relative;
      &:before {
        position: relative;
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        z-index: 10;
        box-shadow: 0 4px 10px rgba(0,0,0,0.4);
      }
      &:after {
        content: "";
        position: absolute;
        width: 0%;
        background-color:#5a46ea;
        height: 1px;
        left: 0;
        top: 12px;
        z-index: 7;
        transform: translateX(50%);
        transition: all 0.25s ease-in-out;
      }
  }

  &.highlight {
    .toggle-icon {
      &:before {
        background-color: #ee47a7;
        border: 1px solid #ee47a7;
        
        box-shadow: 0 4px 10px rgba(0,0,0,0.4);
      }
      &:after {
        width: 100%;
        transform: translateX(0%);
      }
    }
    label {
      color: #5a46ea;
    }
  }

  label {
    color: #d7d7d7;
    text-align: center;
    cursor: pointer;
  }

  input {
    display: none;
  }
  

`;

const SubmitButton = styled.button`
  background-color: #5a46ea;
  color: white;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 2px;
  border: 0;
  overflow: hidden;
  position: relative;
  outline: none;
  span {
    position: relative;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background-color: #ee47a7;
    transition: all 4s linear;
  }
  &.disabled {
    background-color: #d7d7d7; 
  }
  &.pending {
    &:before {
      width: 100%; 
    }
  }
  &.update {
    background-color: #ee47a7;
  }
`;

const FormRow = styled.div`
  padding: 20px 10px;
  display: flex;
  width: ${(props) => props.width ? props.width: '100%'};
  flex-direction: column;
  position: relative;
  &.pull-right {
    float: right;
  }
  &.border-bottom {
    border-bottom: 1px solid #d7d7d7;
    margin-bottom: 20px;
  }
  &.disabled {
    opacity: 0.4;
  }
  &.no-padding-bottom {
    padding-bottom: 0;
  }
  &.highlight {
    label {
      color: #5a46ea;
    }
    textarea {
      border-color: #5a46ea; 
    }
  }
  label {
    text-transform: uppercase;
    margin-bottom: 10px;
    font-weight: bold;
    color: #A9AFB5;
    font-size: 12px;
    font-size: 0.75rem;
    transition: all 0.25s ease-in-out;
  }
  .select-wrapper {
    padding: 10px;
    border: 1px solid #d7d7d7;
    border-radius: 4px;
    select {
      font-size: 0.9em;
      background-color: transparent;
      border: 0px solid transparent;
      outline: none;
    }
  }
  textarea {
    border: 1px solid #d7d7d7;
    border-radius: 4px;
    width: 100%;
    transition: all 0.25s ease-in-out;
  }
`;

const FormCompoundRowMatrix = styled(FormRow)`

  label {
    margin-top: 10px;
    margin-bottom: 0;
  }
`;

const FormBarTitle = styled.div`
  display: flex;
  margin-bottom: 20px;
  .icon-wrap {
    font-size: 3em;
    margin-right: 10px;
    color: #ee47a7;
    display: flex;
  }
  .titles {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 {
    font-size: 1.2em;
    margin: 0;
    padding: 0;
  }
  h2 {
    color: #5a46ea;
    text-transform: uppercase;
    font-size: 0.7em;
    margin: 0;
    margin-top: 6px;
    font-weight: bold;

    letter-spacing: 1px;
    span {
      margin-right: 10px;
    }
  }
`;

const FormRowMatrix = styled.div`
  display: flex;
  flex-wrap: wrap;
  &.disabled {
    opacity: 0.4;
  }
  >div {
    flex: 0 0 20%;
  }
`;


const FormRowCompound = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  flex-direction: row;
  position: relative;
  &.disabled {
    opacity: 0.4;
  }
  &.highlight {
    label {
      color: #5a46ea;
    }
    textarea {
      border-color: #5a46ea; 
    }
    input, .select-wrapper {
      border-color: #5a46ea; 
    }
  }
  label {
    margin-right: 20px;
    min-width: 100px;
    margin-bottom: 0;
  }
  &.no-bottom {
    margin-bottom: 0;
  }
  &.margin-right {
    margin-right: 20px;
  }
  &.min-label-width {
    label {
      min-width: auto;

    }
  }
`;

const SimpleRow = styled.div`
  display: flex;
  width: 100%;
  width: ${(props) => props.width ? props.width: '100%'};
`;

const ProfilePhoto = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #ee47a7;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${props => props.photo});
    background-size: cover;    
    background-position: top center;
    opacity: 1;
    top: 0;
    left: 0;
  }
  
`;

const ErrorMessageInput = styled.div`
  position: absolute;
  width 100%;
  top: -50px;
  padding: 10px;
  background-color: #ee47a7;
  color: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.4);

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    width: 0; 
    left: 50%;
    margin-left: -5px;
    height: 0; 
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #ee47a7;
  }
`;

const ToggleInput = styled.div`
  background-color: white;
  transition: background 0.1s ease-in-out;
  border-radius: 4px;
  display: flex;
  position: relative;
  height: 40px;
  width: 78px;
  border: 1px solid #d7d7d7;
  border-radius: 26px;
  cursor: pointer; 

  label {
    width: 50%;
    text-align: center;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    font-size: 0.8em;
    min-width: 20px;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;
  }
  input {
    display: none;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: calc(50%);
    height: calc(100%);
    background-color: white;
    border-radius: 50%;
    z-index: 2;
    transition: left 0.1s ease-in-out;
    box-shadow: 0 4px 10px rgba(0,0,0,0.4);
  }
  &.selected {
    background-color: #ee47a7;
    border: 2px solid #ee47a7;
    &:before {
      left: calc(50%);
    }
  }
`;

const SmallToggleInput = styled(ToggleInput)`
  height: 20px;
  width: 38px;
  label {

  }
`;

const FormWrapper = styled.div`
  padding: 20px 0 20px 0;
`;
const SideBarWrapper = styled.div`
  background: linear-gradient(45deg,#b946ee,#ee47a7);
  display: flex;
  flex: 0 0 ${props => props.width ? props.width: '350px'}; 
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-top: 20px;
  h3 {
    color: white;
    font-size: 1.6em;
    padding: 40px;
    margin: 0;
  }
  h4 {
    color: white;
    font-size: 1em;
    padding: 40px;
    margin: 0;
  }
`;
const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-color: white;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const FormBar = styled.div`
  width: 100%;
  display: flex;
  &:hover {
    .identifier {
      .section-identifier-circle {
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        background-color: #ee47a7;
        color: white;
      }
      
    }
  }
`;


class UserView extends Component {
  constructor(props) {
    super(props);
    this.typingTimers = {};
    this.state = { 
      userId: undefined,
      user: undefined,
      currentUser: undefined,
      highLighted: "",
      states: ["Akershus","Aust-Agder", "Buskerud", "Finnmark", "Hedmark", "Hordaland", "Møre og Romsdal", "Nordland", "Oppland", "Oslo", "Rogaland", "Sogn og Fjordane", "Telemark", "Troms", "Trøndelag", "Vest-Agder","Vestfold", "Østfold"],
      food: ["Ku", "Svin", "kylling", "Vegetar", "Vegan", "Fisk", "Skalldyr", "Lam"],
      religionFood: [ "Halal", "Kosher", "Vegetar", "vegan"],
      noFood: ["Gluten", "Meieriprodukter", "nøtter / belgfrukter", "egg", "fisk / skalldyr", "hvete / annen korn"],
      shirtSizes: ["S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"],
      validation: {
        "name": {},
        "phone": {},
        "email": {},
        "address1": {},
        "postNumber": {},
        "state": {},
        "country": {},
        "nextToKin": {
          fields: []
        }
      },
      formStatus: {
        profile: "",
        address: "",
        nextToKin: "",
        disease: "",
        food: "",
        tshirt: ""
      }
    }
  }

  getUser () {
    if(isLoggedIn()) {
      getUserData().then((data) => {
        this.setState({currentUser: data});
      });
    }
  }

  getUserFromID (id) {
    getUserDataFromID(id).then((data) => {
      data.name = data.name || '';
      data.phone = data.phone || '';
      data.email = data.email || '';

      data.address = data.address || {
        address1: "",
        address2: '',
        postNumber: "",
        state: "",
        country: "Norge"
      };
      data.nextToKin = data.nextToKin.length ? data.nextToKin : [{
        name: "",
        phone: "",
        relation: ""
      }];

      data.hasDisease = data.hasDisease || false;
      data.diseaseNote = data.diseaseNote || "";

      data.food = data.food;
      data.foodNote = data.foodNote || "";
      data.foodToggle = data.foodToggle || true;

      data.religionFood = data.religionFood;
      data.religionFoodNote = data.religionFoodNote || "";
      data.religionFoodToggle = data.religionFoodToggle || false;

      data.noFood = data.noFood;
      data.noFoodNote = data.noFoodNote || "";
      data.noFoodToggle = data.noFoodToggle || false;

      data.tShirtSize = data.tShirtSize || "M";
    
      data.saved = data.saved || false;

      data.verifiedSections = data.verifiedSections || [];
      data.verified = data.verified || false;

      this.setState({user: data});
    });
  }

  typingTimeout (identifier, callback) {
    if(this.typingTimers[identifier]) {
      clearTimeout(this.typingTimers[identifier]);
    }

    this.typingTimers[identifier] = setTimeout(callback, 500);
  }

  updateFormStatus (section, value) {
    let formStatus = this.state.formStatus;
    formStatus[section] = value;
    this.setState({formStatus: formStatus});
  }

  setValidation (identifier, status, value) {
    let validation = this.state.validation;
    if(status) {
      validation[identifier].validated = true;
      validation[identifier].errorMessage = "";
    } else {
      validation[identifier].validated = false;
      validation[identifier].errorMessage = value;
    }
    this.setState({
      validation: validation
    });
  }

  validateEmail (email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateValue (identifier, value) {
    switch (identifier) {
      case 'name': 
        if(value.split(" ").length > 1) {
          this.setValidation(identifier, true);
        }
        else {
          this.setValidation(identifier, false, "Må ha minst ett etternavn og fornavn");
        } break;
        case 'phone': 
        if(value.length == 8) {
          this.setValidation(identifier, true);
        }
        else {
          this.setValidation(identifier, false, "Mobilnummer må være 8 tegn");
        } break;
        case 'email': 
        if(this.validateEmail(value)) {
          this.setValidation(identifier, true);
        }
        else {
          this.setValidation(identifier, false, "Ikke en gyldig e-postadresse");
        } break;  

      default: break;
    }
  }

  handleFormChange (identifier, value, index) {
    let user = this.state.user;
    switch(identifier) {
      case 'name': user.name = value; this.typingTimeout(identifier, () => {
        this.validateValue(identifier, value);
      }); break;
      case 'phone': user.phone = value; this.typingTimeout(identifier, () => {
        this.validateValue(identifier, value);
      }); break;
      case 'email': user.email = value; this.typingTimeout(identifier, () => {
        this.validateValue(identifier, value);
      }); break; 
      case 'address1': user.address.address1 = value; break; 
      case 'address2': user.address.address2 = value; break; 
      case 'postNumber': user.address.postNumber = value; break; 
      case 'state': user.address.state = value; break; 
      case 'country': user.address.country = value; break; 
      case 'nextToKinName': user.nextToKin[index].name = value; break
      case 'nextToKinPhone': user.nextToKin[index].phone = value; break; 
      case 'nextToKinRelation': user.nextToKin[index].relation = value; break; 
      case 'hasDisease': user.hasDisease = value; break;
      case 'foodToggle': user.foodToggle = value; if(user.foodToggle) user.food = []; break;
      case 'food': 
        if(value) {
          if(user.food.indexOf(this.state.food[index]) < 0) {
            user.food.push(this.state.food[index]);
          }
        } else {
          let foodIndex = user.food.indexOf(this.state.food[index]);
          if(foodIndex >= 0) {
            user.food.splice(foodIndex, 1);
          }
        } break; 
      case 'religionFoodToggle': user.religionFoodToggle = value; if(!user.religionFoodToggle) user.religionFood = []; break;
      case 'religionFood': 
        if(value) {
          if(user.religionFood.indexOf(this.state.religionFood[index]) < 0) {
            user.religionFood.push(this.state.religionFood[index]);
          }
        } else {
          let foodIndex = user.religionFood.indexOf(this.state.religionFood[index]);
          if(foodIndex >= 0) {
            user.religionFood.splice(foodIndex, 1);
          }
          console.log(foodIndex, user.religionFood);
        } break;  
        case 'noFoodToggle': user.noFoodToggle = value; if(!user.noFoodToggle) user.noFood = []; break;
      case 'noFood': 
        if(value) {
          if(user.noFood.indexOf(this.state.noFood[index]) < 0) {
            user.noFood.push(this.state.noFood[index]);
          }
        } else {
          let foodIndex = user.noFood.indexOf(this.state.noFood[index]);
          if(foodIndex >= 0) {
            user.noFood.splice(foodIndex, 1);
          }
        } break;
        case 'tShirtSize': console.log('new size', value); user.tShirtSize = value; break;  
      default: break;
    }

    this.setState({user: user});
  }

  componentDidMount() {
    this.getUser();
    this.getUserFromID(this.props.match.params.id);
  }

  setHighLight (highlight) {
    
    this.setState({highLighted: highlight});
  }
  
  render () {
    let { user, formStatus, validation, currentUser, highLighted, food, religionFood, noFood, shirtSizes } = this.state;
    console.log(user, validation);
    if(!user) {
      return(
        <div>
          <Nav userData={currentUser}/>
      </div>  
      )
      
    }
    if(user) {
      return (
      
        <div>
          <Nav userData={currentUser}/>
          <SectionsRow>
            <SectionsRowItem>
              <div className="section-circle">1</div>
              <div className="section-name">Kontaktinformasjon</div>
            </SectionsRowItem>
            <SectionsRowItem>
              <div className="section-circle">2</div>
              <div className="section-name">Din adresse</div>
            </SectionsRowItem>
            <SectionsRowItem>
              <div className="section-circle">3</div>
              <div className="section-name">Nærmeste pårørende</div>
            </SectionsRowItem>
            <SectionsRowItem>
              <div className="section-circle">4</div>
              <div className="section-name">Sykdom</div>
            </SectionsRowItem>
            <SectionsRowItem>
              <div className="section-circle">5</div>
              <div className="section-name">Matpreferanser</div>
            </SectionsRowItem>
            <SectionsRowItem>
              <div className="section-circle">6</div>
              <div className="section-name">t-skjortestørrelse</div>
            </SectionsRowItem>
          </SectionsRow>
          <ContentWrapNarrow>          
              <FormWrapper>
                
                <FormBar>
                  <SectionIdentifier className={`identifier down ${user.verifiedSections.indexOf("profile") >= 0 ? "verified": ""}`}>
                    <span className="section-identifier-circle">1</span>
                  </SectionIdentifier>
                  <SideBarWrapper width="350px">
                    {user && user.picture && (
                      <ProfilePhoto photo={user.picture} />
                    )}
                  </SideBarWrapper>
                  <MainWrapper>
                  <FormBarTitle><div className="icon-wrap"><FaChild /></div> <div className="titles"><h1>Kontaktinformasjon</h1><h2>Vises for alle i dine crew</h2></div></FormBarTitle>
                  <FormRow>
                    <FormRowCompound className={highLighted === "name" ? "highlight": ""}>
                      <label>Fullt navn</label>
                      <Input 
                        type="text" 
                        value={this.state.user.name}
                        className={`${validation.name.errorMessage && validation.name.errorMessage.length ? "error": ""}`} 
                        onFocus={() => this.setHighLight("name")} 
                        onBlur={() => this.setHighLight("")} 
                        onChange={(event) => this.handleFormChange("name", event.target.value)}
                      />
                      {validation.name.errorMessage && validation.name.errorMessage.length && highLighted === "name" && (
                        <ErrorMessageInput>{validation.name.errorMessage}</ErrorMessageInput>
                      )}
                    </FormRowCompound>
                    <FormRowCompound className={highLighted === "phone" ? "highlight": ""}>
                      <label>Telefonnummer</label>
                      <Input 
                        type="tel" 
                        value={this.state.user.phone}
                        className={`${validation.phone.errorMessage && validation.phone.errorMessage.length ? "error": ""}`} 
                        onFocus={() => this.setHighLight("phone")} 
                        onBlur={() => this.setHighLight("")} 
                        onChange={(event) => this.handleFormChange("phone", event.target.value)}
                      />
                      {validation.phone.errorMessage && validation.phone.errorMessage.length && highLighted === "phone" && (
                        <ErrorMessageInput>{validation.phone.errorMessage}</ErrorMessageInput>
                      )}
                    </FormRowCompound>                   
                    <FormRowCompound className={highLighted === "email" ? "highlight": ""}>
                      <label>E-postadresse</label>
                      <Input 
                        type="email" 
                        value={this.state.user.email}
                        className={`${validation.email.errorMessage && validation.email.errorMessage.length ? "error": ""}`} 
                        onFocus={() => this.setHighLight("email")} 
                        onBlur={() => this.setHighLight("")} 
                        onChange={(event) => this.handleFormChange("email", event.target.value)}
                      />
                      {validation.email.errorMessage && validation.email.errorMessage.length && highLighted === "email" && (
                        <ErrorMessageInput>{validation.email.errorMessage}</ErrorMessageInput>
                      )}
                    </FormRowCompound>                   
                  </FormRow>
                  <FormRow className="pull-right no-padding-bottom">
                      <SubmitButton
                        className={
                            `
                              ${formStatus["profile"] === "pending" ? "pending": ""}
                              ${formStatus["profile"] === "update" ? "update": ""}
                              ${formStatus["profile"] === "updateagain" ? "update": ""}
                            `
                          }
                        onClick={() => { this.updateFormStatus("profile", "pending") }}
                      >
                        {formStatus["profile"] === "" && (
                          <span>Lagre</span>
                        )}
                        {formStatus["profile"] === "pending" && (
                          <span>Lagrer...</span>
                        )}
                        {formStatus["profile"] === "updateagain" && (
                          <span>Oppdater igjen</span>
                        )}
                        {formStatus["profile"] === "update" && (
                          <span>Oppdater</span>
                        )}
                        
                      </SubmitButton>
                  </FormRow>
                  </MainWrapper>
                </FormBar>

                <FormBar>
                  <SectionIdentifier className={`identifier ${user.verifiedSections.indexOf("address") >= 0 ? "verified": ""}`}>
                    <span className="section-identifier-circle">2</span>
                  </SectionIdentifier>
                  <MainWrapper>
                  <FormBarTitle><div className="icon-wrap"><FaHome /></div> <div className="titles"><h1>Din adresse</h1><h2>Vises kun for administratorer og crewsjefer</h2></div></FormBarTitle>
                  <FormRow>                 
                    <FormRowCompound className={highLighted === "address1" ? "highlight": ""}>
                      <label>Adresse </label> 
                      <Input 
                        type="text" 
                        value={this.state.user.address.address1}
                        onFocus={() => this.setHighLight("address1")} 
                        onBlur={() => this.setHighLight("")} 
                        onChange={(event) => this.handleFormChange("address1", event.target.value)}
                      />
                    </FormRowCompound>
                    <FormRowCompound>
                      <FormRowCompound className={`no-bottom margin-right ${highLighted === "postNumber" ? "highlight": ""}`}>
                        <label>Postnummer</label> 
                        <Input 
                          type="number" 
                          width="80px"
                          onFocus={() => this.setHighLight("postNumber")} 
                          onBlur={() => this.setHighLight("")} 
                          value={this.state.user.address.postNumber} 
                          onChange={(event) => this.handleFormChange("postNumber", event.target.value)}
                        />
                      </FormRowCompound>
                      <FormRowCompound className={`no-bottom min-label-width ${highLighted === "state" ? "highlight": ""}`}>
                        <label>Fylke</label>
                        <div className="select-wrapper">
                          <select 
                            name="state" 
                            value={user.address.state}
                            onFocus={() => this.setHighLight("state")} 
                            onBlur={() => this.setHighLight("")} 
                            onChange={(event) => this.handleFormChange("state", event.target.value)}
                          >
                            {this.state.states.map((state, k) => (
                                <option key={k} value={state}>{state}</option>
                              )
                            )}
                            
                          </select>
                        </div>
                      </FormRowCompound>
                    </FormRowCompound>
                    <FormRowCompound className="no-bottom"><label>Land</label> Norge</FormRowCompound>
                    
                  </FormRow>
                  </MainWrapper>
                  <SideBarWrapper width="260px">
                    <h3>Brukes hvis noen trenger å sende deg noe via posten</h3>
                  </SideBarWrapper>
                </FormBar> 

                <FormBar>
                <SectionIdentifier className={`identifier ${user.verifiedSections.indexOf("nextokin") >= 0 ? "verified": ""}`}>
                    <span className="section-identifier-circle">3</span>
                  </SectionIdentifier>            
                  <SideBarWrapper width="260px">
                    <h3>Hvem skal vi kontakte hvis det oppstår en krise?</h3>
                  </SideBarWrapper>
                  <MainWrapper>
                  <FormBarTitle><div className="icon-wrap"><FaAmbulance /></div> <div className="titles"><h1>Nærmeste pårørende</h1><h2>Vises kun for administratorer og crewsjefer</h2></div></FormBarTitle>
                  {this.state.user.nextToKin.map((nextToKin, index) => (
                    <FormRow key={index}>                 
                      <FormRowCompound><label>Navn </label> <Input type="text" value={nextToKin.name} onChange={(event) => this.handleFormChange("nextToKinName", event.target.value, index)}/></FormRowCompound>
                      <FormRowCompound className="margin-right"><label>Telefonnummer</label> <Input type="tel" value={nextToKin.phone} onChange={(event) => this.handleFormChange("nextToKinPhone", event.target.value, index)}/></FormRowCompound>
                      <FormRowCompound className="no-bottom margin-right">
                          <label>Relasjon</label>
                          <div className="select-wrapper">
                            <select name="state" value={nextToKin.relation} onChange={(event) => this.handleFormChange("nextToKinRelation", event.target.value, index)}>
                              {["Forelder", "Søsken", "Nær venn", "Besteforelder", "Verge"].map((relation, k) => (
                                  <option key={k} value={relation}>{relation}</option>
                                )
                              )}  
                            </select>
                          </div>
                        </FormRowCompound>
                      
                    </FormRow>
                  ))}
                  </MainWrapper>
                </FormBar>

                <FormBar>
                <SectionIdentifier className={`identifier ${user.verifiedSections.indexOf("disease") >= 0 ? "verified": ""}`}>
                    <span className="section-identifier-circle">4</span>
                  </SectionIdentifier>
                  <MainWrapper>
                    <FormBarTitle><div className="icon-wrap"><FaEyedropper /></div> <div className="titles"><h1>Sykdom</h1><h2>Vises kun for administratorer og crewsjefer</h2></div></FormBarTitle>
                    <FormRow className={user.hasDisease ? "highlight": ""}>
                      <FormRowCompound><label>Jeg vi si i fra om noe </label> 
                        <ToggleInput className={user.hasDisease ? "selected": ""}>
                          
                          <label htmlFor="disease-no"></label>
                          <Input id="disease-no" name="disease" type="radio" value={false} checked={user.hasDisease === false} onChange={() => {}} onClick={(event) => this.handleFormChange("hasDisease", !user.hasDisease)} />
                          <label htmlFor="disease-yes"></label>
                          <Input id="disease-yes" name="disease" type="radio" value={true} checked={user.hasDisease === true} onChange={() => {}} onClick={(event) => this.handleFormChange("hasDisease", !user.hasDisease)} />
                        </ToggleInput>
                      </FormRowCompound>
                    </FormRow>
                    <FormRow className={user.hasDisease ? "highlight": ""}>
                        <label>Utdyp gjerne her</label> 
                        <textarea rows="6" disabled={user.hasDisease === false} value={user.diseaseNote} onChange={(event) => this.handleFormChange("diseaseNote", event.target.value)} />
                    </FormRow>
                  </MainWrapper>
                  <SideBarWrapper width="350px">
                    <h3>Trenger crewsjef eller ledere å vite om noe medisinsk slik som f.eks. allergi, angst eller en diagnose?</h3>
                  </SideBarWrapper>
                </FormBar>

                <FormBar>
                  <SectionIdentifier className={`identifier ${user.verifiedSections.indexOf("food") >= 0 ? "verified": ""}`}>
                    <span className="section-identifier-circle">5</span>
                  </SectionIdentifier>
                  <SideBarWrapper width="280px">
                    <h3>I tilfelle det serveres mat til crewet på dine arrangement</h3>
                    <h4>Obs! Dette er en hjelper for crewet, slik at man kan vise hensyn. Det er ingen garanti for hva man får servert.</h4>
                  </SideBarWrapper>
                  <MainWrapper>
                    <FormBarTitle><div className="icon-wrap"><FaCutlery /></div> <div className="titles"><h1>Matpreferanser</h1><h2>Vises kun for administratorer og crewsjefer</h2></div></FormBarTitle>
                    
                    <FormRow className={` border-bottom`}>
                      <FormRowCompound className={`no-bottom ${user.foodToggle ? "highlight": ""}`}><label>Jeg spiser det meste</label> 
                        <ToggleInput className={user.foodToggle ? "selected": ""}> 
                          <label htmlFor="food-toggle-no"></label>
                          <Input id="food-toggle-no" name="food-toggle" type="radio" value={false} checked={user.foodToggle === false} onChange={() => {}} onClick={(event) => this.handleFormChange("foodToggle", !user.foodToggle)} />
                          <label htmlFor="food-toggle-yes"></label>
                          <Input id="food-toggle-yes" name="food-toggle" type="radio" value={true} checked={user.foodToggle === true} onChange={() => {}} onClick={(event) => this.handleFormChange("foodToggle", !user.foodToggle)} />
                        </ToggleInput>
                      </FormRowCompound>
                    
                      <FormRowMatrix className={`${user.foodToggle ? "disabled" : ""} `}>
                        {food.map((foodType, f) => {
                          let isSelected = user.food.indexOf(foodType) >= 0;
                          return (
                            <FormCompoundRowMatrix className={`${isSelected ? "highlight": ""}`}  key={f}>
                              <SmallToggleInput className={isSelected ? "selected": ""}>
                                <label htmlFor={`${foodType}-religion-no`}></label>
                                <Input id={`${foodType}-religion-no`} name={`${foodType}`} type="radio" value={!isSelected} checked={isSelected === false} onChange={() => {}} onClick={(event) => this.handleFormChange("food", !isSelected, f)} />
                                <label htmlFor={`${foodType}-religion-yes`}></label>
                                <Input id={`${foodType}-religion-yes`} name={`${foodType}`} type="radio" value={isSelected} checked={isSelected === true} onChange={() => {}} onClick={(event) => this.handleFormChange("food", !isSelected, f)} />
                              </SmallToggleInput>
                              <label>{foodType}</label> 
                            </FormCompoundRowMatrix>
                          )
                        })}
                      </FormRowMatrix>
                    </FormRow>



                    <FormRow className={` border-bottom`}>
                      <FormRowCompound className={`no-bottom ${user.religionFoodToggle ? "highlight": ""}`}><label>Jeg har tilberedingsbehov for mat</label> 
                        <ToggleInput className={user.religionFoodToggle ? "selected": ""}>
                          <label htmlFor="religion-food-toggle-no"></label>
                          <Input id="religion-food-toggle-no" name="religion-food-toggle" type="radio" value={false} checked={user.religionFoodToggle === false} onChange={() => {}} onClick={(event) => this.handleFormChange("religionFoodToggle", !user.religionFoodToggle)} />
                          <label htmlFor="religion-food-toggle-yes"></label>
                          <Input id="religion-food-toggle-yes" name="religion-food-toggle" type="radio" value={true} checked={user.religionFoodToggle === true} onChange={() => {}} onClick={(event) => this.handleFormChange("religionFoodToggle", !user.religionFoodToggle)} />
                        </ToggleInput>
                      </FormRowCompound>
                    
                      <FormRowMatrix className={`${!user.religionFoodToggle ? "disabled" : ""} `}>
                        {religionFood.map((foodType, f) => {
                          let isSelected = user.religionFood.indexOf(foodType) >= 0;
                          return (
                            <FormCompoundRowMatrix className={`${isSelected ? "highlight": ""}`}  key={f}>
                              <SmallToggleInput className={isSelected ? "selected": ""}>
                                <label htmlFor={`${foodType}-no`}></label>
                                <Input id={`${foodType}-no`} name={`${foodType}`} type="radio" value={!isSelected} checked={isSelected === false} onChange={() => {}} onClick={(event) => this.handleFormChange("religionFood", !isSelected, f)} />
                                <label htmlFor={`${foodType}-yes`}></label>
                                <Input id={`${foodType}-yes`} name={`${foodType}`} type="radio" value={isSelected} checked={isSelected === true} onChange={() => {}} onClick={(event) => this.handleFormChange("religionFood", !isSelected, f)} />
                              </SmallToggleInput>
                              <label>{foodType}</label> 
                            </FormCompoundRowMatrix>
                          )
                        })}
                      </FormRowMatrix>
                    </FormRow>

                    <FormRow className={` border-bottom`}>
                      <FormRowCompound className={`no-bottom ${user.noFoodToggle ? "highlight": ""}`}><label>Jeg har matallergi</label> 
                        <ToggleInput className={user.noFoodToggle ? "selected": ""}>
                          <label htmlFor="no-food-toggle-no"></label>
                          <Input id="no-food-toggle-no" name="no-food-toggle" type="radio" value={false} checked={user.noFoodToggle === false} onChange={() => {}} onClick={(event) => this.handleFormChange("noFoodToggle", !user.noFoodToggle)} />
                          <label htmlFor="no-food-toggle-yes"></label>
                          <Input id="no-food-toggle-yes" name="no-food-toggle" type="radio" value={true} checked={user.noFoodToggle === true} onChange={() => {}} onClick={(event) => this.handleFormChange("noFoodToggle", !user.noFoodToggle)} />
                        </ToggleInput>
                      </FormRowCompound>
                    
                      <FormRowMatrix className={`${!user.noFoodToggle ? "disabled" : ""} `}>
                        {noFood.map((foodType, f) => {
                          let isSelected = user.noFood.indexOf(foodType) >= 0;
                          return (
                            <FormCompoundRowMatrix className={`${isSelected ? "highlight": ""}`}  key={f}>
                              <SmallToggleInput className={isSelected ? "selected": ""}>
                                <label htmlFor={`${foodType}-no`}></label>
                                <Input id={`${foodType}-no`} name={`${foodType}`} type="radio" value={!isSelected} checked={isSelected === false} onChange={() => {}} onClick={(event) => this.handleFormChange("religionFood", !isSelected, f)} />
                                <label htmlFor={`${foodType}-yes`}></label>
                                <Input id={`${foodType}-yes`} name={`${foodType}`} type="radio" value={isSelected} checked={isSelected === true} onChange={() => {}} onClick={(event) => this.handleFormChange("religionFood", !isSelected, f)} />
                              </SmallToggleInput>
                              <label>{foodType}</label> 
                            </FormCompoundRowMatrix>
                          )
                        })}
                      </FormRowMatrix>
                    </FormRow>
                    

                  </MainWrapper>
                  
                </FormBar>


                <FormBar>
                  <SectionIdentifier className={`identifier up ${user.verifiedSections.indexOf("tshirt") >= 0 ? "verified": ""}`}>
                    <span className="section-identifier-circle">6</span>
                  </SectionIdentifier>
                  <MainWrapper>
                    <FormBarTitle><div className="icon-wrap"><FaChild /></div> <div className="titles"><h1>Størrelse</h1><h2>Vises kun for administrator og crewleder</h2></div></FormBarTitle>
                    <FormRow>
                      <label className="highlight">Velg t-skjortestørrelse</label>
                      <FormRowRange>
                            {shirtSizes.map((size, k) => (
                              <FormRowRangeItem className={`${user.tShirtSize === size ? "highlight": ""}`} key={k}>
                                <label htmlFor={`shirt-toggle-${size}`}>
                                  <span className="toggle-icon"></span>
                                  <span className="label">{size}</span>
                                </label>
                                <Input id={`shirt-toggle-${size}`} name="shirt-toggle" type="radio" value={size} checked={user.tshirtSize === size} onChange={() => {}} onClick={(event) => {console.log('yo'); this.handleFormChange("tShirtSize", event.target.value);}} />
                              </FormRowRangeItem>
                            ))}
                      </FormRowRange>
                    </FormRow>
                  </MainWrapper>

                </FormBar>

              </FormWrapper>
          </ContentWrapNarrow>
        </div>
      );
    } else {
      return (<div />);
    }
    
  }
}

export default UserView;

// 