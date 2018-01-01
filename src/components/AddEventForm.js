import React, {Component} from 'react';
import styled from 'styled-components';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


const AddEventFormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

`;

const FormControllersButton = styled.div`
  width: 50%;
  display: inline-block;
  padding: 20px 30px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const StopButton = styled(FormControllersButton)`
  background-color: #333333;
`;

const Form = styled.form`
  padding: 30px;
  h3 {
    text-align: center;
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

const FormInputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  >div {
    width: 50%;
  }
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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
        open: false
    };
  }

  toggleForm() {
    this.setState({open: !this.state.open});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open === true)
      this.toggleForm();
  }

  render () {
    let user = this.props.userData || false; 
    let open = this.state.open;
    
    return (
      <AddEventFormContainer className={open ? 'visible': ''}>

        <FormContainer className={open ? 'visible': ''}>
          <CloseButton onClick={this.toggleForm.bind(this)}></CloseButton>
          <Form>
            
            <h3>Opprett nytt arrangement</h3>
            <FormInput>
              <label>Navn på arrangement</label>
              <input type="text" />  
            </FormInput>
            <FormInputGroup>
              <FormInput>
                <label>Starter</label>
                <DayPickerInput onDayChange={day => console.log(day)} />
              </FormInput>
              <FormInput>
                <label>Slutter</label>
                <DayPickerInput onDayChange={day => console.log(day)} />
              </FormInput>
            </FormInputGroup>
          </Form>
          <FormControllers>
            
            <StopButton>Lukk</StopButton>
            <SubmitButton>Opprett</SubmitButton>
          </FormControllers>
        </FormContainer>
      </AddEventFormContainer>
    )
  }
}

export default AddEventForm;

