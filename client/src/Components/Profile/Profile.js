import React, { Component } from "react";
import {FormGroup, ControlLabel, FormControl, Glyphicon, Button} from "react-bootstrap";

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

  /* Handles the text input onChange, validates the input, and sets the state */
  handleChange(e) {
	 const val = e.target.value;
	 const formId = e.target.id;

    switch (formId) {
      case "formFirstName":
		  this.setState({ firstName: val });
		  this.setState({ firstNameValidation: this.validateState(formId, val)});
        break;
      case "formLastName":
		  this.setState({ lastName: val });
		  this.setState({ lastNameValidation: this.validateState(formId, val)});
		  break;
		default:
			console.log("unimplemented form: "+formId);
    }
  }

  validateState(formId, val) {
	switch (formId) {
	  case "formFirstName":
		 const firstNameLen = val.length;
		 if (firstNameLen > 50) 
			return "error";
		 else if (firstNameLen > 0)
			return "success";
		 else 
			return null;
			
	  case "formLastName":
		 const lastNameLen = val.length;
		 if (lastNameLen > 50)
			return "error";
		 else if (lastNameLen > 0)
			return "success";
		 else
      return null;
    default:
      return null;
	}
 }

 getValidationState(formId) {
   switch(formId) {
		case "formFirstName":
			return this.state.firstNameValidation;
		case "formLastName":
			return this.state.lastNameValidation;
		default:
			return null;
	}
 }

 getGlyphState(formId) {
	const states = {
		success: "ok",
		error: "remove",
		null: "null"
	}

	switch(formId) {
		case "formFirstName":
			return states[this.state.firstNameValidation];
		case "formLastName":
			return states[this.state.lastNameValidation];
		default:
			return null;
	}
 }

 getFormButtonState = () => {
	if (this.state.firstNameValidation === "error" || this.state.lastNameValidation === "error") {
		return true;
	}
	return false;
 }

  render() {
    const email = (this.props.user.email? this.props.user.email : "");
    //console.log(this.state);
    return (
      <div>
        <h1>Profile</h1>
        <form>
          <FormGroup
            controlId="formFirstName"
            validationState={this.getValidationState("formFirstName")}
          >
            <ControlLabel>First Name</ControlLabel>
            <FormControl type="text" onChange={this.handleChange} />
            <FormControl.Feedback>
              <Glyphicon glyph={this.getGlyphState("formFirstName")}/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup
            controlId="formLastName"
            validationState={this.getValidationState("formLastName")}
          >
            <ControlLabel>Last Name</ControlLabel>
            <FormControl type="text" onChange={this.handleChange} />
            <FormControl.Feedback>
              <Glyphicon glyph={this.getGlyphState("formLastName")}/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup controlId="formEmail">
            <ControlLabel>Email Address</ControlLabel>
            <FormControl type="text" value={email} readOnly />
          </FormGroup>
          <Button type="submit" disabled={this.getFormButtonState()} >Submit</Button>
        </form>
      </div>
    );
  }
}

export default Profile;
