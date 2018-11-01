import React, { Component } from "react";

import SelectedFoods from "./SelectedFoods";
import FoodSearch from "./FoodSearch";
import LoginControl from "./Auth/LoginControl";
import SaveEntryButton from "./InsertEntry/SaveEntryButton";

class App extends Component {

  constructor(props) {
    super(props);
    this.doSetUserProfile = this.doSetUserProfile.bind(this);
    this.setUserProfile = this.setUserProfile.bind(this);
    
    this.props.auth.doSetUserProfile = this.doSetUserProfile;
  }

  state = {
    selectedFoods: [],
    userId: null
  };

  //Used to set the user profile when the tab is refreshed
  componentDidMount() {
    this.props.auth.getUserProfile(this.setUserProfile);
  }
  
  removeFoodItem = itemIndex => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx
    );
    this.setState({ selectedFoods: filteredFoods });
  };

  addFood = food => {
    const newFoods = this.state.selectedFoods.concat(food);
    this.setState({ selectedFoods: newFoods });
  };

  /* This is the callback for the auth0's getUserProfile()
   * If there's an error, meaning the access token is incorrect, then we log out,
   * else we call the helper function to set the profile
   */
  setUserProfile = (err, user) => {
    if (err) {
      //console.log("setUserProfile: "+err);
      this.child.logout();
      return;
    }
    this.doSetUserProfile(user);
  }

  doSetUserProfile = (user) => {
    this.setState({userId: user.sub});
  }

  /* Passed as prop to LoginControl to be used when logging out */
  clearUserId = () => {
    this.setState({userId: null});
  }
  
  render() {
    console.log("render() -\n  userid: " + this.state.userId);

    const { selectedFoods } = this.state; //Q: Why are there brackets here around selectedFoods?

    return (
      <div className="App">
        <div className="ui text container">
          <SelectedFoods
            foods={selectedFoods}
            onFoodClick={this.removeFoodItem}
          />
          <FoodSearch onFoodClick={this.addFood} />

          <LoginControl 
            onRef={ref => (this.child = ref)}
            history={this.props.history}
            auth={this.props.auth}
            setUserProfile={this.setUserProfile}
            clearUserId={this.clearUserId}
          />

          <SaveEntryButton
            
          />
        </div>
      </div>
    );
  }
}

export default App;
