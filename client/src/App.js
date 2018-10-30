import React, { Component } from "react";

import SelectedFoods from "./SelectedFoods";
import FoodSearch from "./FoodSearch";
import LoginControl from "./Auth/LoginControl";

class App extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    console.log("before setting func: "+this.props.auth.setUserProfile);
    this.props.auth.setUserProfile = this.setUserProfile;
    console.log("after setting func: "+this.props.auth.setUserProfile);
  }

  state = {
    selectedFoods: [],
    userId: null
  };

  componentDidMount() {
    console.log("MOUNTED");
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

  setUserProfile = (err, user) => {
    console.log("******** setUserProfile() *********");
    console.log("err: "+err);
    console.log("user: "+JSON.stringify(user));
    console.log("this: "+this);
    this.setState({userId: JSON.stringify(user)});
    console.log("***********************************");
  }

  clearUserId = () => {
    this.setState({userId: null});
  }
  
  render() {
    console.log("render() - userid: " + this.state.userId);

    const { selectedFoods } = this.state;

    return (
      <div className="App">
        <div className="ui text container">
          <SelectedFoods
            foods={selectedFoods}
            onFoodClick={this.removeFoodItem}
          />
          <FoodSearch onFoodClick={this.addFood} />

          <LoginControl 
            history={this.props.history}
            auth={this.props.auth}
            setUserProfile={this.setUserProfile}
            clearUserId={this.clearUserId}
          />
        </div>
      </div>
    );
  }
}

export default App;
