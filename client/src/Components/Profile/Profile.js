import React, { Component } from "react";
import {FormGroup, ControlLabel, FormControl, Glyphicon, Button} from "react-bootstrap";
import history from "../../history";

class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      firstNameValidation: null,
      lastNameValidation: null
    };
  }

  handleChange(e) {
    const val = e.target.value;

    switch (e.target.id) {
      case "formFirstName":
        this.setState({ firstName: val });
        break;
      case "formLastName":
        this.setState({ lastName: val });
        break;
    }
    //console.log(this.state);
  }

  getValidationState(id, type) {
    const validation = this.doValidateState(id);

    if (type === "container") {
      return validation;
    } else if (type === "glyph") {
      switch (validation) {
        case "success":
          return "ok";
        case "error":
          return "remove";
        case null:
          return null;
      }
    }
  }

  doValidateState(id) {
    switch (id) {
      case "formFirstName":
		  const firstNameLen = this.state.firstName.length;
		  if (firstNameLen > 50) 
		    return "error";
		  else if (firstNameLen > 0)
			 return "success";
		  else 
			 return null;
			 
      case "formLastName":
		  const lastNameLen = this.state.lastName.length;
		  if (lastNameLen > 50)
		    return "error";
		  else if (lastNameLen > 0)
		    return "success";
		  else
		    return null;
    }
  }

  render() {
    const email = this.props.user.email;

    return (
      <div>
        <h1>Profile</h1>
        <form>
          <FormGroup
            controlId="formFirstName"
            validationState={this.getValidationState("formFirstName","container")}
          >
            <ControlLabel>First Name</ControlLabel>
            <FormControl type="text" onChange={this.handleChange} />
            <FormControl.Feedback>
              <Glyphicon glyph={this.getValidationState("formFirstName", "glyph")}/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup
            controlId="formLastName"
            validationState={this.getValidationState("formLastName", "container")}
          >
            <ControlLabel>Last Name</ControlLabel>
            <FormControl type="text" onChange={this.handleChange} />
            <FormControl.Feedback>
              <Glyphicon glyph={this.getValidationState("formLastName", "glyph")}/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup controlId="formEmail">
            <ControlLabel>Email Address</ControlLabel>
            <FormControl type="text" value={email} readOnly />
          </FormGroup>
          <Button type="submit" disabled="" >Submit</Button>
        </form>
      </div>
    );
  }
}

export default Profile;
