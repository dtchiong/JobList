import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Glyphicon,
  Button,
  Panel,
  Row,
  Col
} from "react-bootstrap";
import "./profile.css";

class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      firstNameValidation: null,
      lastNameValidation: null,
      firstNameChanged: false,
      lastNameChanged: false,
    };
  }

  /* Handles the text input onChange, validates the input, and sets the state */
  handleChange(e) {
    const val = e.target.value;
    const formId = e.target.id;

    switch (formId) {
      case "formFirstName":
        this.setState({ firstName: val, firstNameValidation: this.validateState(formId, val), firstNameChanged: true });
        break;
      case "formLastName":
        this.setState({ lastName: val, lastNameValidation: this.validateState(formId, val), lastNameChanged: true });
        break;
      default:
        console.log("unimplemented form: " + formId);
    }
  }

  /* This validates the value for the given input and returns the appropriate string */
  validateState(formId, val) {
    switch (formId) {
      case "formFirstName":
        const firstNameLen = val.length;
        if (firstNameLen > 25) return "error";
        else if (firstNameLen > 0) return "success";
        else return null;

      case "formLastName":
        const lastNameLen = val.length;
        if (lastNameLen > 25) return "error";
        else if (lastNameLen > 0) return "success";
        else return null;
      default:
        return null;
    }
  }

  /* Returns the appropriate string for for the given formId for the FormControl's validation prop */
  getValidationState(formId) {
    switch (formId) {
      case "formFirstName":
        return this.state.firstNameValidation;
      case "formLastName":
        return this.state.lastNameValidation;
      default:
        return null;
    }
  }

  /* Returns the appropriate string for the given formId for the Glyphicon's glyph prop */
  getGlyphState(formId) {
    const states = {
      success: "ok",
      error: "remove",
      null: "null"
    };

    switch (formId) {
      case "formFirstName":
        return states[this.state.firstNameValidation];
      case "formLastName":
        return states[this.state.lastNameValidation];
      default:
        return null;
    }
  }

  /* Disables or enables the form's submit button depending on the form's validation */
  buttonIsDisabled = () => {
    if (
      this.state.firstNameValidation === "error" ||
      this.state.lastNameValidation === "error"
    ) {
      return true;
    }
    return false;
  };

  /* Updates the name from the form and sets the state in routes.js */
  submitForm = () => {

    if (this.buttonIsDisabled()) {
      return;
    }else if (this.props.user.userId == null) {
      return;
    }else if (!this.state.firstNameChanged && !this.state.lastNameChanged) {
      return
    }else if (this.state.firstName === this.props.user.firstName && 
              this.state.lastName === this.props.user.lastName) {
      return;            
    }

    const firstName = (this.state.firstNameChanged? this.state.firstName : this.props.user.firstName);
    const lastName = (this.state.lastNameChanged? this.state.lastName : this.props.user.lastName);

    
    const user = {
      userId: this.props.user.userId,
      firstName: firstName,
      lastName: lastName
    }

    //Only update the user info if the request is succesful
    this.props.requests.updateUser(user).then((success)=>{
      if (success) {
        this.props.setNames(firstName, lastName);
      }
    });
  }

  /* Returns the saved name if the form has not been changed, else it returns the modified input */ 
  getFirstName = () => {
    if (this.state.firstNameChanged) {
      return this.state.firstName;
    }
    const firstName = this.props.user.firstName;
    return (firstName? firstName : "");
  }

  getLastName = () => {
    if (this.state.lastNameChanged) {
      return this.state.lastName;
    }
    const lastName = this.props.user.lastName;
    return (lastName? lastName : "");
  }

  render() {
    const email = this.props.user.email ? this.props.user.email : "";
    return (
      <div>
        <h1>Profile</h1>
        <Panel>
          <Row>
            <Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>
              <Panel.Body>
                <h3 id="profile-header">Edit Profile </h3>
                <form>
                  <FormGroup
                    controlId="formFirstName"
                    validationState={this.getValidationState("formFirstName")}
                  >
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl type="text" value={this.getFirstName()} onChange={this.handleChange} />
                    <FormControl.Feedback>
                      <Glyphicon glyph={this.getGlyphState("formFirstName")} />
                    </FormControl.Feedback>
                  </FormGroup>

                  <FormGroup
                    controlId="formLastName"
                    validationState={this.getValidationState("formLastName")}
                  >
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl type="text" value={this.getLastName()} onChange={this.handleChange} />
                    <FormControl.Feedback>
                      <Glyphicon glyph={this.getGlyphState("formLastName")} />
                    </FormControl.Feedback>
                  </FormGroup>

                  <FormGroup controlId="formEmail">
                    <ControlLabel>Email Address</ControlLabel>
                    <FormControl type="text" value={email} readOnly />
                  </FormGroup>
                  <Button
                    bsSize="large"
                    
                    disabled={this.buttonIsDisabled()}
                    onClick={this.submitForm}
                  >
                    Submit
                  </Button>
                </form>
              </Panel.Body>
            </Col>
          </Row>
        </Panel>
      </div>
    );
  }
}

export default Profile;
