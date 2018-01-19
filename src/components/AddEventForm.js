import React, {Component} from 'react';
import styled from 'styled-components';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { createEvent } from '../utils/api.js';
import { LoadingBlock } from './Loaders.js';


const AddEventFormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 3000px;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
  }
  transform: translateX(-100%);
  &.visible {
    transform: translateX(0);
  }
`;

const FormContainer = styled.div`
  position: relative;
  width: 600px;
  max-width: 100%;
  min-height: 20px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  transform: translateY(0);
  opacity: 1;
  transition: all 0.2s ease-in-out;
  transform: translateY(-20px);
  &.visible {
    transform: translateY(0);
    transition: all 0.2s ease-in-out;
  }
`;


const FormControllers = styled.div`
  display: flex;
  padding-top: 60px;

`;

const FormControllersButton = styled.button`
  width: 50%;
  display: inline-block;
  padding: 20px 30px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  font-size: 12px;
  cursor: pointer;
  margin: 0;
  outline: none;
  border: 0;
  &:hover {
    color: white;
  }
`;

const StopButton = styled(FormControllersButton)`
  background-color: #333333;
  text-align: left;
`;

const Form = styled.form`
  h3 {
    text-align: center;
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 60px;
  }
`;

const FormInputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px 0 30px;
  >div {
    width: 50%;
  }
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 0 30px 0 30px;
  label {
    color: #AAAAAA;
    font-size: 10px;
    text-transform: uppercase;
    padding-bottom: 10px;
    letter-spacing: 1px;
  }
  input {
    padding: 10px;
    font-size: 16px;
    color: #333333;
    border: 0;
    outline: none;
    background-color: #e2e5fa;
  }
  p {
    text-align: center;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  border: 0;
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  &:before {
    display: inline-block;
    content: "+";
    transform: rotate(136deg);  
  }
`;

const SubmitButton = styled(FormControllersButton)`
  background-color: #4756e3;
  background: linear-gradient(90deg, #4756e3, #f56afa);
  text-align: right;
`;

class AddEventForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        name: "",
        from: undefined,
        to: undefined,
        loading: false
    };
  }

  toggleForm() {
    this.setState({open: !this.state.open});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open === true)
      this.toggleForm();
  }

  updateName(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    this.setState({
        [name]: value
    });
    
  }

  updateDate(type, day) {
    
    this.setState({
        [type]: day
    });

    if(type === 'from') {

      if(!this.state.to || this.state.to < this.state.from) {
        
        this.setState({
          'to': day
        });
      }
    }
  }

  handleSubmit (event) {
    event.preventDefault();

    if(this.state.to < this.state.from) {
      alert("Slutt-dato kan ikke være før start-dato");
    } else if(this.state.name === '') {
      alert("Du må skrive et navn på arrangementet");
    } else {
      this.setState({loading: true});

      var that = this;

      createEvent({name: this.state.name, from: this.state.from, to: this.state.to}).then(function (event) {
        console.log('yo');
        that.setState({loading: false});
        that.toggleForm();
        that.props.eventCreated(event);
      });
    }
    
  }

  render () { 
    let open = this.state.open;
    let loading = this.state.loading;
    let eventDuration = 0;
    if(this.state.to && this.state.from && this.state.from <= this.state.to) {
      eventDuration = parseInt(((this.state.to-this.state.from) / (1000*60*60*24)), 10) + 1;
    };
    
    return (
      <AddEventFormContainer className={open ? 'visible': ''}>

        <FormContainer className={open ? 'visible': ''}>
          <CloseButton onClick={this.toggleForm.bind(this)}></CloseButton>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            
            <h3>Opprett nytt arrangement</h3>
            <FormInput>
              <label>Navn på arrangement</label>
              <input type="text" name="name" value={this.state.name} onChange={this.updateName.bind(this)} />  
            </FormInput>
            <FormInputGroup>
              <FormInput>
                <label>Starter</label>
                <DayPickerInput value={this.state.from} onDayChange={day => this.updateDate('from', day)} />
              </FormInput>
              <FormInput>
                <label>Slutter</label>
                <DayPickerInput value={this.state.to} onDayChange={day => this.updateDate('to', day)} />
              </FormInput>
            </FormInputGroup>
            {eventDuration > 0 && (
              <FormInput>
                <p>Arrangementet varer i {eventDuration} dag(er)</p>
              </FormInput>
            )}
            
            <FormControllers>
              <StopButton>Lukk</StopButton>
              <SubmitButton type="submit" value="Submit">Opprett
              {loading && (
                <LoadingBlock width="10" height="10" color="white" />
              )}
              </SubmitButton>
          </FormControllers>
          </Form>
          
        </FormContainer>
      </AddEventFormContainer>
    )
  }
}

export default AddEventForm;

